---
lang: zh-CN
title: 数据迁移
description: 数据迁移
---

## 数据迁移流程梳理

### 一、迁移前准备工作

第一天：

①：新环境私有化etl程序、load、paopi程序及定时任务全部关闭,确保环境干净.调整新环境kafka保存时间为30天，只调整sdklua_online即可 

②：①确认无误后通知客户将网关地址指向私有化新环境。 

③：客户切换网关地址后，将老环境数据上传掐掉。等待数据消费完成。同样关闭相应的定时任务 

第二天：

④确认老环境当天load及跑批是否已经全部完成

### 二、具体操作梳理

#### 2.1. mysql前端库备份（旧环境）
> ps:根据实际情况备份所需要的库

* 1. 导出前端库sdkv
```
mysqldump --opt sdkv -hweb -uweb -p'zanalytics' > ./sdkv.db
```

* 2. 导出元数据库hive
```
mysqldump --opt hive -hweb -uweb -p'zhugeio' > ./hive.db
```

> 将导出的库文件拷贝至新环境，根据时间情况选择拷贝方式

#### 2.2. REDIS数据导出 （旧环境）
* web相关
> 参考文档  https://note.youdao.com/s/Yzty4Vk6
```shell
涉及：26380,26480
将redis的aof拷贝至新环境
```

#### 2.3. SSDB数据导出（旧环境）
*etl: 
```shell
涉及：8892,8893,8894,8895,8897(可清理，无需备份),8898
将数据目录直接拷贝至新环境，启动即可
```
> ps: 如果需要将ssdb迁移至新环境redis中请参考：https://note.youdao.com/s/KRruQFL4

* web:
```shell
8884,8888  (无需迁移，初始化信息部署时已有)
```


#### 2.4. kudu备份 (老环境)

> ps: https://note.youdao.com/s/5cpakweW
```
将kudu数据备份到hdfs,此操作需要注意以下两点
1.备份的表数量需与原表数量一致
2.备份的表中数据量需与原表数量一致
```

#### 2.5. hdfs迁移 (老环境)

> 将老环境hdfs数据导到新环境hdfs,此处方式比较多，目前比较常用的方式如下：

```
1. old—hdfs ====> new-hdfs  （推荐）
新旧集群如果是内网或者网络带宽能得到保证的情况下，新旧环境直连拷贝，省掉中间环节。

2. old-hdfs =====>oss====>new-hdfs（常规）
针对客户上云的情况，客户会可能需要通过oss作为中转
```

* 新旧集群直连拷贝
企查查客户的新旧环境都在内网中，因此使用此方式进行hdfs的迁移
```
nohup hadoop distcp -m 48 -bandwidth 200 /user/hive/warehouse/zhugeio.db/ hdfs://172.18.181.12:8020/user/hive/warehouse/zhugeio.db/  &

内网拷贝数据100M/s, 2.8T数据执行了大约3.5h  

a.执行迁移命令后注意观察日志，注意报错及评估拷贝进度
b.如果执行成功，无异常，请对新旧环境的hdfs数据进行对比 ‘du’
```


#### 2.6. 清理新环境测试应用app，避免appId重复导致的冲突
* mysql中信息
```
1.将新环境的mysql中各个库备份
2.备份完成后删除即可，后面需要将旧库导入

mysqldump --opt sdkv -hweb -uweb -p'zanalytics' > ./sdkv—tmp.db
mysqldump --opt hive -hweb -uweb -p'zanalytics' > ./hive—tmp.db

mysql> drop database sdkv;
mysql> drop database hive;
```
* redis及ssdb
```
将原数据目录清空后重启即可，里面都是测试数据
```

#### 2.7. 新环境导入mysql相关库
* 1 导入sdkv库

```
##查看建库语句
>show create database sdkv;

##创建空库sdkv
>CREATE DATABASE `sdkv` /*!40100 DEFAULT CHARACTER SET utf8 */;
##创建web用户
>CREATE USER 'web'@'%';
##授权给web用户
>GRANT ALL ON *.* TO 'web'@'%';
##将老环境sdkv库导入
>use sdkv;
>source /${WORK_DIR}/sdkv.db
```

* 2 使用打包平台tools工具，修改新环境导入的sdkv表结构。

```
java -jar tools-1.0.jar mysql_sdkv_update.json
```

* node sql导入
如果客户的老环境比较旧，更新完sdkv表结构后，node相关表中可能是空的，需导入初始化sql
```
sql文件：（tbj:/data/download/secure-patch/realtime-cluster/node）
        DATA_ACCESS.sql
        scene.sql
```


* 3. 导入其他库（如hive库）
```
##创建空库hive
>CREATE DATABASE `hive` /*!40100 DEFAULT CHARACTER SET utf8 */;
##创建web用户
>CREATE USER 'hive'@'%';
##授权给web用户
>GRANT ALL ON *.* TO 'hive'@'%';
##将老环境sdkv库导入
>use hive;
>source /${WORK_DIR}/hive.db
```


#### 2.8 hdfs恢复
> 前提：hive库已恢复
```
1.确认hdfs中数据可通过impala查询
2.通过impala对比新旧仓库中的hdfs表数量及表中数据
```
#### 2.9 kudu恢复
> 1.前提：hdfs确认无误  2.参考文档：https://note.youdao.com/s/5cpakweW
```
kudu恢复后，需要注意表数量及表中数据是否能对上
```


#### 2.10 新环境导入ssdb
```
基于拷贝目录启动相关ssdb即可
> ps: 如果需要将ssdb迁移至新环境redis中请参考：https://note.youdao.com/s/KRruQFL4
```

#### 2.11. 新环境导入redis

> 参考文档  https://note.youdao.com/s/Yzty4Vk6
```shell
涉及：26380,26480
将拷贝的 .aof文件导入即可
```

### 三、新集群验证
```
1.运维针对恢复后新环境各个模块及功能进行简单测试
2.交付测试
3.配合切换数据上传 （访问地址有变动，都需要打包更新配置）
4.game over
```