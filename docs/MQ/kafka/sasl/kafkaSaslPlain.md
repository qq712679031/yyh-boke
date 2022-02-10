---
lang: zh-CN
title: kafka sasl plain认证
description: plain认证
---

## 1 添加 sasl 配置文件

将kafka_client_jaas.conf/kafka_server_jaas.conf/kafka_zoo_jaas.conf三个文件放入kafka的config文件夹中，文件中配置用户，admin用户必须配置。

```
kafka_client_jaas.conf内容如下
KafkaClient {  
org.apache.kafka.common.security.plain.PlainLoginModule required  
username="admin"  
password="admin";  
};
```

kafka_server_jaas.conf内容如下

```
KafkaServer {
org.apache.kafka.common.security.plain.PlainLoginModule required
username="admin"
password="admin"
user_admin="admin"
user_test="test#2018";
};
KafkaClient {
org.apache.kafka.common.security.plain.PlainLoginModule required
username="admin"
password="admin";
};

Client {
org.apache.kafka.common.security.plain.PlainLoginModule required
username="admin"
password="admin";
};
```

kafka_zoo_jaas.conf内容如下

```
ZKServer{
org.apache.kafka.common.security.plain.PlainLoginModule required
username="admin"
password="admin"
user_admin="admin";
};
```

## 2 添加认证方式到 启动文件

1.添加到kafka的bin文件夹中的zookeeper-server-start.sh,

```
export KAFKA_OPTS=" -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_zoo_jaas.conf -Dzookeeper.sasl.serverconfig=ZKServer"
```

2.添加到kafka的bin文件夹中的kafka-server-start.sh，

```
export KAFKA_OPTS=" -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_server_jaas.conf"
```

3.添加到kafka的bin文件夹中的kafka-console-producer.sh

```
export KAFKA_OPTS=" -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf"
```

4.添加到kafka的bin文件夹中的kafka-console-consumer.sh

```
export KAFKA_OPTS=" -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf"
```

5.修改kafka的bin文件夹中的kafka-acls.sh

```
export KAFKA_OPTS=" -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf"
```

## 3.添加认证到配置文件

1.添加到kafka的config文件夹中的consumer.properties

```
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
```

2.添加到kafka的config文件夹中的producer.properties

```
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
```

3.添加到kafka的config文件夹中的zookeeper.properties

```
authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProvider
requireClientAuthScheme=sasl
jaasLoginRenew=3600000
```

## 4.修改kafka的config文件夹中的server.properties

```
修改：
listeners=SASL_PLAINTEXT://:9092
advertised.listeners=SASL_PLAINTEXT://realtime-1:9092

添加：
#使用的认证协议
security.inter.broker.protocol=SASL_PLAINTEXT
#SASL机制
sasl.enabled.mechanisms=PLAIN
sasl.mechanism.inter.broker.protocol=PLAIN
#完成身份验证的类
authorizer.class.name=kafka.security.auth.SimpleAclAuthorizer
#如果没有找到ACL（访问控制列表）配置，则允许任何操作。
#allow.everyone.if.no.acl.found=true
super.users=User:admin
```

4.同步配置文件到别的服务器

```shell
scp /data/localization/kafka/config/kafka_client_jaas.conf realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/config/kafka_server_jaas.conf realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/config/kafka_zoo_jaas.conf realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/config/consumer.properties realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/config/producer.properties realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/config/zookeeper.properties realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/config/server.properties realtime-2:/data/localization/kafka/config/
scp /data/localization/kafka/bin/zookeeper-server-start.sh realtime-2:/data/localization/kafka/bin/
scp /data/localization/kafka/bin/kafka-server-start.sh realtime-2:/data/localization/kafka/bin/
scp /data/localization/kafka/bin/kafka-console-producer.sh realtime-2:/data/localization/kafka/bin/
scp /data/localization/kafka/bin/kafka-console-consumer.sh realtime-2:/data/localization/kafka/bin/

scp /data/localization/kafka/config/kafka_client_jaas.conf realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/config/kafka_server_jaas.conf realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/config/kafka_zoo_jaas.conf realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/config/consumer.properties realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/config/producer.properties realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/config/zookeeper.properties realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/config/server.properties realtime-3:/data/localization/kafka/config/
scp /data/localization/kafka/bin/zookeeper-server-start.sh realtime-3:/data/localization/kafka/bin/
scp /data/localization/kafka/bin/kafka-server-start.sh realtime-3:/data/localization/kafka/bin/
scp /data/localization/kafka/bin/kafka-console-producer.sh realtime-3:/data/localization/kafka/bin/
scp /data/localization/kafka/bin/kafka-console-consumer.sh realtime-3:/data/localization/kafka/bin/
```

修改  

```
server.properties
broker.id(各节点唯一)
advertised.listeners (各个服务器)
```

## 5.重启各个服务

1.启动zookeeper服务

```
sh bin/zookeeper-server-start.sh config/zookeeper.properties
```

2.启动kafka服务

```
sh bin/kafka-server-start.sh config/server.properties
```

## 6.给admin用户授权

```
sh bin/kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2182 --add --allow-principal User:admin --group=* --topic=*
```

## 7.修改lua脚本

1.需要更新 最新的 lua脚本 代码
修改文件名

```shell
cd  /data/localization/nginx/lua/resty

mv kafka/ kafka-nosasl
mv kafka-sasl/  kafka
```

2.修改链接方式
/data/localization/nginx/lua/utils/zgConfig.lua

```lua
local broker_list = {
    {
        host = "realtime-1",
        port = 9092,
        sasl_config = {
            mechanism = "PLAIN",
            user = "admin",
            password = "admin"
        },
    },
    {
        host = "realtime-2",
        port = 9092,
        sasl_config = {
            mechanism = "PLAIN",
            user = "admin",
            password = "admin"
        }
    },
    {
        host = "realtime-3",
        port = 9092,
        sasl_config = {
            mechanism = "PLAIN",
            user = "admin",
            password = "admin"
        }
    }
};

-- config
local zgConfig = {
    broker_list = broker_list
}
return zgConfig;
```

3.reload nginx 即可

## 8.更新后常用kafka 命令(待补充)

1.给用户test授予某个topic的读写的权限

```shell
sh bin/kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2182 --add --allow-principal User:test --operationRead --operationWrite --topic test --group=*
```

> 说明：
> 控制读写：–operationRead–operationWrite
> 控制消费组：不控制组 --group=*，指定消费组 --grouptest-comsumer-group

2.移除权限
执行

```shell
sh bin/kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2182 --remove --allow-principal User:test --allow-host 192.168.1.101 --operationRead --operationWrite --topic test
```

3.列出topic为test的所有权限账户
执行

```shell
sh bin/kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2182 --list --topic test
```

4.测试启动消费者
执行

```shell
sh bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic test --from-beginning --consumer.config config/consumer.properties
```

5.测试启动生产者
执行

```shell
sh bin/kafka-console-producer.sh --broker-list 127.0.0.1:9092 --topic test --producer.config config/producer.properties
```

6.查看topic列表

```shell
sh bin/kafka-topics.sh --list --zookeeper localhost:2182 
```

