---
lang: zh-CN
title: SSDB数据迁移至Redis
description: SSDB数据迁移至Redis
---

## SSDB数据迁移至Redis
### 简介
```
使用ssdb-port将SSDB数据库同步到redis数据库
ssdb-port是一款适用于SSDB数据库的数据同步工具
可实现实时单向数据同步。
```
#### 同步操作的限制
* 注意
```
在SSDB中执行ssdb-port暂不支持的命令修改的数据将无法同步到Redis中。
使用hset或hget命令时，如果对象key为中文则该操作无法同步。使用其它支持的命令无此限制
```
* ssdb命令
> 目前支持同步的SSDB命令如下
```
set
setx
setnx
expire
del
get
incr
qpop_front
qpush_front
qclear
qtrim_front
qtrim_back
zset
zdel
zincr
multi_zdel
multi_zset
hset
hdel
hclear
multi_hset
multi_hdel
hincr
```


### 安装准备
* 前提
```
ssdb-port需要能够连接源ssdb与目的redis，作为实时同步的工具
```
* 同步原理
```
ssdb-port 作为ssdb从节点进行启动，然后将获取到的数据解析转换为redis支持的格式后后发送至redis
```

* 注意
```
需要注意的是ssdb-port是实时同步的工具
因此全量同步完成后，在连接关闭前，SSDB中新增的数据也会增量同步到Redis实例中
如只需历史数据，请记得先把源ssdb的其他写进口停掉，不然会一直有数据进来，一直在同步
```
### 安装ssdb-port
```
# wget http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/attach/94155/cn_zh/1547627852086/ssdb-port.tar.gz
# tar -xvf ssdb-port.tar.gz
# cd ssdb-port

```



### 修改配置文件
```
# cd ssdb-port
# vi ssdb_port.conf
```
* ssdb_port.conf
```shell

# ssdb_port的数据目录，一般默认当前目录下（注意磁盘）
work_dir = ./var_ssdb_port  
pidfile = ./var_ssdb_port/ssdb.pid

# ssdb-port的连接信息，无需修改（这里是ssdb-port的端口）
server:
    ip: 127.0.0.1
    port: 8899
    #readonly: yes

replication:
    binlog: yes
        capacity: 100000000
    # Limit sync speed to *MB/s, -1: no limit
    sync_speed: -1
    slaveof:
        # to identify a master even if it moved(ip, port changed)
        # if set to empty or not defined, ip:port will be used.
        id: svc_1
        # sync|mirror, default is sync
        type: sync
        host: localhost # SSDB Master（源SSDB数据库）的连接地址
        port: 8888 # SSDB Master（源SSDB数据库）的端口
        #auth: password
        redis_host: localhost # 目的Redis实例的连接地址
        redis_port: 6379  # 目的Redis实例的端口
        redis_auth: password  # 目的Redis实例的认证密码（没有密码可注释此项）

logger:
    level: debug
    output: log_ssdb_port.txt  (生成的日志，根据数据量大小决定，还是挺大的，记录了所有操作)
    rotate:
        size: 1000000000

leveldb:
    # in MB
    cache_size: 500
    # in MB
    write_buffer_size: 64
    # in MB/s
    compaction_speed: 1000
    # yes|no
    compression: yes


```

### 执行操作

```shell
cd ssdb-port
./ssdb-port-2.17 ssdb_port.conf
```

> 如果数据量大，执行时间过长，可以使用 `nohup` 方式执行。

```shell
cd ssdb-port
nohup ./ssdb-port-2.17 ssdb_port.conf &
```
### 数据验证
```
1.ssdb_prot是进行数据同步的，因此如果old服务一直有数据进来，就会一直同步。
2.可登录redis实例检查数据同步是否完成
3.如果只是同步历史数据，同步完成后再日志log_ssdb_port.txt 中可以看到同步完成的字样
```
<......copy end......>

![image](https://note.youdao.com/yws/res/10707/A06215990E564BF0A14385EFBB4472DF)

