---
lang: zh-CN
title: kudu平滑升级方案
description: kudu平滑升级方案
---
在升级之前，阅读即将安装的 Kudu 版本的[发行说明。](https://kudu.apache.org/docs/release_notes.html)密切注意那里记录的不兼容性、升级和降级说明。
注意:
需要对tserver 一台一台重启  保证kudu 服务一直在运行中 不要全部停掉重启

## 1.准备软件

-  将kudu 升级包 发送到对应的机器上

```bash
升级包地址:
	跳板机: /data/download/secure-patch/kudu1.15/kudu1.15.zip
	
下载地址:
	wget 54.222.198.31:88/kudu1.15/kudu1.15.zip
```

## 2.开始升级

1. 解压文件夹

```bash
cd /data/

wget 54.222.198.31:88/kudu1.15/kudu1.15.zip

unzip kudu1.15.zip 

cd kudu1.15
```


2. 替换对应的kudu 文件

> 注意 需要一台一台重启  不要一下全部替换 全部重启

```bash
vim update_kudu.sh
---------------------------------------
#!/bin/bash
cd /lib/kudu/sbin

mv kudu-master kudu-master-old
mv kudu-tserver kudu-tserver-old

cp /data/kudu1.15/kudu-master .
cp /data/kudu1.15/kudu-tserver .

chmod 777 kudu-master
chmod 777 kudu-tserver

cd /lib/kudu/bin
mv kudu kudu-old
cp /data/kudu1.15/kudu .

chmod 777 kudu

----------------------------------------


sh update_kudu.sh
```

3. 重启 一台 kudu-tserver

> 如果报启动失败 很正常  top 查看 kudu 任务是否已经启动

```shell
service kudu-tserver stop

service kudu-tserver start 
```

4. 观察kudu tserver 的恢复情况

```bash
sudo -u kudu kudu cluster ksck realtime-1,realtime-2,realtime-3
```
- 直到 kudu ksck 文件正常
   - 未完成
   - ![kudu01.png](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/kudu01.png)
   - 已完成
   - ![kudu02.png](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/kudu03.png)

5. 对剩余的 kudu tserver 重复前面的步骤 直到全部启动完成

## 3.升级主服务器

-  一台一台重启主服务器

```bash
service kudu-master stop
service kudu-master start
```

- 完成图
- ![kudu03.png](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/kudu02.png)