---
lang: zh-CN
title: redis shake
description: redis shake
---


参考完档 [RedisShake](https://github.com/alibaba/RedisShake/wiki/%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BD%BF%E7%94%A8%EF%BC%8C%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E9%85%8D%E7%BD%AE%EF%BC%9F)

1. 下载解压

```shell
wget -c https://github.com/alibaba/RedisShake/releases/download/release-v1.6.24-20191220/redis-shake-1.6.24.tar.gz
tar -zxvf  redis-shake-1.6.24.tar.gz
cd  redis-shake-1.6.24.tar.gz
```

2. 配置文件

主要修改以下参数

```shell
# 支持按前缀过滤key，只让指定前缀的key通过，分号分隔。比如指定abc，将会通过abc, abc1, abcxxx
filter.key.whitelist =
# 支持按前缀过滤key，不让指定前缀的key通过，分号分隔。比如指定abc，将会阻塞abc, abc1, abcxxx
filter.key.blacklist =
```

举例:
1.单个节点到单个节点配置举例。

```shell
source.type: standalone
source.address: 10.1.1.1:20441
source.password_raw: 12345
target.type: standalone
target.address: 10.1.1.1:20551
target.password_raw: 12345
```

2.2 集群版cluster到集群版cluster配置举例

```shell
source.type: cluster
source.address: 10.1.1.1:20441;10.1.1.1:20443;10.1.1.1:20445
source.password_raw: 12345
target.type: cluster
target.address: 10.1.1.1:20551;10.1.1.1:20553;10.1.1.1:20555
target.password_raw: 12345
```

对于source.address或者target.address，需要配置源端的所有集群中db节点列表以及目的端集群所有db节点列表，用户也可以启用自动发现机制，地址以'@'开头，redis-shake将会根据cluster nodes命令自动去探测有几个节点。对于source.address，用户可以在'@'前面配置master（默认）或者slave表示分表从master或者slave进行拉取；对于target.address，只能是master或者不配置：

```shell
source.type: cluster
source.address: master@10.1.1.1:20441 # 将会自动探测到10.1.1.1:20441集群下的所有节点，并从所有master进行拉取。同理如果是slave@10.1.1.1:20441将会扫描集群下的所有slave节点。
source.password_raw: 12345
target.type: cluster
target.address: @10.1.1.1:20551 # 将会自动探测到10.1.1.1:20551集群下的所有节点，并写入所有master。
target.password_raw: 12345
```

以上的说明是开源cluster，当然，源端也可以是别的集群架构模式，比如带proxy的集群（比如codis，或者别的云集群架构，但这种情况下有些不支持自动发现，需要手动配置所有master或者slave的地址），那么需要选择db节点进行拉取，source.type同样选择cluster，source.address后面跟所有db的地址（只要主或者从的其中一个即可）。
2.3 集群版cluster到proxy配置举例

```shell
source.type: cluster
source.address: 10.1.1.1:20441;10.1.1.1:20443;10.1.1.1:20445;10.1.1.1:20447
source.password_raw: 12345
target.type: proxy
target.address: 10.1.1.1:30331;10.1.1.1:30441;10.1.1.1:30551
target.password_raw: 12345
```

source.address同样支持自动发现机制，参考[3.2](https://github.com/alibaba/RedisShake/wiki/%E7%AC%AC%E4%B8%80%E6%AC%A1%E4%BD%BF%E7%94%A8%EF%BC%8C%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E9%85%8D%E7%BD%AE%EF%BC%9F#32-%E9%9B%86%E7%BE%A4%E7%89%88cluster%E5%88%B0%E9%9B%86%E7%BE%A4%E7%89%88cluster%E9%85%8D%E7%BD%AE%E4%B8%BE%E4%BE%8B)。此外，target.address为proxy的地址，proxy支持roundrobin写入，也就是说，对于这个配置来说，10.1.1.1:20441和10.1.1.1:20447将会写入10.1.1.1:30331；10.1.1.1:20443写入10.1.1.1:30441；10.1.1.1:20445写入10.1.1.1:30551。
如3.2中所述，源端也可以是别的集群架构模式。
2.4 主从版/单节点到cluster配置举例

```shell
source.type: standalone
source.address: 10.1.1.1:20441
source.password_raw: 12345
target.type: cluster
target.address: 10.1.1.1:30331;10.1.1.1:30441;10.1.1.1:30551
target.password_raw: 12345
```

3. 启动

启动二进制：./redis-shake.linux -conf=redis-shake.conf -type=xxx # xxx为sync, restore, dump, decode, rump其中之一，全量+增量同步请选择sync。 mac下请使用redis-shake.darwin，windows请用redis-shake.windows.
**decode**:
把Redis RDB文件解析成人类可读的文件格式.
**restore**:
把Rdis RDB文件作为数据源，恢复到目标Redis实例中.
**dump**:
对源Redis实例中的数据dump到RDB文件中.
**sync**:
基于Redis sync/psync命令从源redis实例同步到目标Redis实例，该模式包含全量同步和增量同步两个阶段。（通过默认Redis Slave来实现）
**rump**:
基于Redis scan命令的方式从源Redis同步到目标Redis实例。只支持全量同步，这种方式通常适用于源redis不支持sync/psync命令的场景