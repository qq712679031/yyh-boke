---
lang: zh-CN
title: kafka基本命令
description: kafka基本命令
---

## 启动命令
使用脚本操作kafka
1) 创建一个topic
```
   bin/kafka-topics.sh --create --zookeeper 127.0.0.1:2181 --replication-factor 1 --partitions 3 --topic test001
```

2) 使用Kafka自带一个命令行客户端启动一个生产者，生产数据
```
     bin/kafka-console-producer.sh --broker-list realtime-1:9092 --topic pay_statisv2
     nohup bin/kafka-console-consumer.sh --bootstrap-server realtime-1:9092  --topic sdklua_online
    sh bin/kafka-console-producer.sh --broker-list 127.0.0.1:9092 --topic topic sdklua_online --producer.config config/producer.properties
```

3) 使用Kafka自带一个命令行客户端启动一个消费者，消费数据
```
   bin/kafka-console-consumer.sh --bootstrap-server 10.32.12.142:6667 --topic debezium.oracle

   bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic zhuge_io_prod

   bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic pay_statisv2  --consumer.config config/consumer.properties

   --consumer.config config/consumer.properties

   该消费语句，只能获取最新的数据，要想历史数据，需要添加选项--from-beginning
   如：bin/kafka-console-consumer.sh --bootstrap-server realtime-1:9092 --from-beginning --topic JDSku
```

4) 查看有哪些topic
```
   bin/kafka-topics.sh --list --zookeeper 127.0.0.1:2181
```
5) 查看某一个具体的Topic的详细信息
```
    bin/kafka-topics.sh --describe --topic pay_statisv2 --zookeeper localhost:2182
```
   
6) 删除topic
```
    bin/kafka-topics.sh --delete --topic pay_statisv2 --zookeeper 127.0.0.1:2181
   注意：彻底删除一个topic，需要在server.properties中配置delete.topic.enable=true，否则只是标记删除
   配置完成之后，需要重启kafka服务。
```
   