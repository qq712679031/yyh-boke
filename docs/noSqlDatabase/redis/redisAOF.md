---
lang: zh-CN
title: redis AOF
description: redis AOF
---


### Redis使用AOF方式迁移数据

* 开启aof文件
> 首先，使用redis-cli登录redis，然后开启aapendonly
```
>> config set appendonly yes
```
>或者在登录的时候也可以开启，也就是上面命令也等价于：
```
$ redis-cli -h 127.0.0.1 -p 26480  config set appendonly yes
OK
```
开启appendonly之后，就会在配置文件的地方生成一个aof文件
如果不知道配置文件在哪里，可以使用下面命令查看：
```
redis-cli -h realtime-1 -p 26480              
realtime-1:26480> config get dir
1) "dir"
2) "/data/redis_26480"
```

查看生成aof文件的数据目录：
```
# cd /data/redis_26480/
# ls
  appendonly.aof
  dump.rdb
# 可以看到生成了一个 appendonly.aof 文件
```
* 迁移aof文件
```
将生成的aof文件拷贝至目标redis所在机器或网络
```

* 数据导入
> 在另外一个服务器，导入appendonly.aof文件就行了：
```
[root@realtime-3 anli]# redis-cli -h realtime-3 -p 6379  --pipe < appendonly.aof
All data transferred. Waiting for the last reply...
Last reply received from server.
errors: 0, replies: 27917
```
* 注意：
```
aof文件其实就是将redis中所有的执行命令汇聚到一个文件中，当导入时，相当于全部重新执行了一遍命令，从而起到了备份的作用。
```
* 关闭aof功能
```
redis-cli -h realtime-1 -p 26480  
>> config set appendonly no
```

