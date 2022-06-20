### kafka常用命令梳理
> 参考链接（http://orchome.com/454）
* 启动kafka server
```shell
nohup /usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties > kafka.log &    
```
* 创建topic
```shell
bin/kafka-topics.sh --create --topic testhq2 --zookeeper localhost:2181 --partitions 3 --replication-factor 1    
```
* 启动producer
```shell
bin/kafka-console-producer.sh --broker-list realtime:9092  --topic pay_statisv2                      
```
* 在线增加分区数量
```shell
bin/kafka-topics.sh --zookeeper localhost:2181 --alter --topic mytopic --partitions 16  
```

* 启动consumer(查看历史数据)
```shelk
     bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic mytopic --from-beginning    
```     
* 启动consumer(查看实时数据)
```shell
bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic mytopic
```
* 启动consumer 新的命令
```shell
      bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic mytopic
```
* 列出包含不同步副本的分区
```shell
bin/kafka-topics.sh --zookeeper localhost:2181 --describe --under-replicated-partitions 
```
* 列出没有首领的分区
```shell
bin/kafka-topics.sh --zookeeper localhost:2181 --describe --unavailable-partitions
```
* 列出来所有的topic
```shell
      bin/kafka-topics.sh --list --zookeeper localhost:2181        
```
* 列出消费者组
```shell
bin/kafka-consumer-groups.sh --zookeeper 52.80.152.202:2182 --list  
```
* 通过offset查看消费情况
```shell
bin/kafka-run-class.sh kafka.tools.ConsumerOffsetChecker --zookeeper localhost:2181 --topic mytopic --group etl-id     
以下为结果：logSize为总的kafka数据，offset为已经消费的，Lag是未消费的 Lag=logSize-offset
Group    Topic    Pid    offset    logSize    Lag    Owner
etl-id    statisv2    0    139380158    139380158    0    none
```
* 列出此topic基本信息
```shell
bin/kafka-topics.sh --describe -zookeeper localhost:2181 --topic mytopic
```
* 删除topic
```shell
bin/kafka-topics.sh --zookeeper localhost:2182 --delete --topic mytopic;
```

* 修改分区个数为23
```shell
bin/kafka-topics.sh --alter --zookeeper 172.16.120.170:2182,172.16.120.171:2182,172.16.120.172:2182 --topic pay_zg_total_random --partitions 23 
bin/kafka-run-class.sh kafka.tools.UpdateOffsetsInZK latest gate-consumer.properties mytopic;
```
* kafka 数据导入导出：
```shell
bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic mytopic | grep \"js > yuge.jsk
bin/kafka-console-producer.sh --broker-list realtime-1:9092  --topic mytopic < /home/centos/yuge.jsk 
```
* kafka 2.x.x 版本导入导出
```shell
[root@realtime-1 kafka]# /data/localization/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic mytopic  < /tmp/aaa
```
* kafka topic数据保存时间，在线调整
```shell
bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=3600000 （一小时）
bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=86400000  （24小时，1天）

bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=172800000  （48小时，2天）

bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=432000000 （120小时，5天）

bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=604800000（168小时，7天）

bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=1296000000 （15天）

bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic mytopic --config retention.ms=2592000000 (一个月)

bin/kafka-topics.sh --zookeeper localhost:2182 --alter --topic sdklua_online --config retention.ms=259200000 (3天)
```

* 查询topic信息：
```shell
./bin/kafka-topics.sh --zookeeper localhost:2182 --describe
```

* 调整kafka offset值
```shell
get /consumers/etl-gate/offsets/sdklua_online/0  

set /consumers/etl-gate/offsets/sdklua_online/0  3756359731
set /consumers/etl-gate/offsets/sdklua_online/1  3753582283

```

![哈雷.jpg](https://note.youdao.com/yws/res/15567/WEBRESOURCEff86b930ec461a4eaaf1cb5ad2f823c9)