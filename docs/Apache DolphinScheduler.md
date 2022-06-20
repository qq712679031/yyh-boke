# Apache DolphinScheduler

## 一 、 下载

### 前置准备工作

* JDK：下载[JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html) (1.8+)，并将 `JAVA_HOME` 配置到以及 `PATH` 变量中。如果你的环境中已存在，可以跳过这步。
* 二进制包：在[下载页面](https://dolphinscheduler.apache.org/zh-cn/download/download.html)下载 DolphinScheduler 二进制包
* 注册中心：[ZooKeeper](https://zookeeper.apache.org/releases.html) (3.4.6+)，[下载地址](https://zookeeper.apache.org/releases.html)
* 数据库： [MySQL](https://dev.mysql.com/downloads/mysql/) (5.7+)  MySQL 需要 JDBC Driver 8.0.16

### 准备 DolphinScheduler 启动环境

配置用户免密及权限

创建部署用户，并且一定要配置 `sudo` 免密。以创建 dolphinscheduler 用户为例

```bash
# 创建用户需使用 root 登录
useradd dolphinscheduler

# 添加密码
echo "dolphinscheduler" | passwd --stdin dolphinscheduler

# 配置 sudo 免密
sed -i '$adolphinscheduler  ALL=(ALL)  NOPASSWD: NOPASSWD: ALL' /etc/sudoers
sed -i 's/Defaults    requirett/#Defaults    requirett/g' /etc/sudoers

# 修改目录权限，使得部署用户对二进制包解压后的 apache-dolphinscheduler-*-bin 目录有操作权限
chown -R dolphinscheduler:dolphinscheduler apache-dolphinscheduler-*-bin

```

> 注意:
>
> - 因为任务执行服务是以 `sudo -u {linux-user}` 切换不同 linux 用户的方式来实现多租户运行作业，所以部署用户需要有 sudo 权限，而且是免密的。初学习者不理解的话，完全可以暂时忽略这一点
> - 如果发现 `/etc/sudoers` 文件中有 "Defaults requirett" 这行，也请注释掉



### 配置机器SSH免密登陆

由于安装的时候需要向不同机器发送资源，所以要求各台机器间能实现SSH免密登陆。配置免密登陆的步骤如下

```shell
su dolphinscheduler

ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

> ***注意:\*** 配置完成后，可以通过运行命令 `ssh localhost` 判断是否成功，如果不需要输入密码就能ssh登陆则证明成功



### 修改相关配置

完成了基础环境的准备后，在运行部署命令前，还需要根据环境修改配置文件。配置文件在路径在`conf/config/install_config.conf`下，一般部署只需要修改**INSTALL MACHINE、DolphinScheduler ENV、Database、Registry Server**部分即可完成部署，下面对必须修改参数进行说明

```shell
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# ---------------------------------------------------------
# INSTALL MACHINE
# ---------------------------------------------------------
# A comma separated list of machine hostname or IP would be installed DolphinScheduler,
# including master, worker, api, alert. If you want to deploy in pseudo-distributed
# mode, just write a pseudo-distributed hostname
# Example for hostnames: ips="ds1,ds2,ds3,ds4,ds5", Example for IPs: ips="192.168.8.1,192.168.8.2,192.168.8.3,192.168.8.4,192.168.8.5"
ips="realtime-1,realtime-2,realtime-3"

# Port of SSH protocol, default value is 22. For now we only support same port in all `ips` machine
# modify it if you use different ssh port
sshPort="22"

# A comma separated list of machine hostname or IP would be installed Master server, it
# must be a subset of configuration `ips`.
# Example for hostnames: masters="ds1,ds2", Example for IPs: masters="192.168.8.1,192.168.8.2"
masters="realtime-1,realtime-2"

# A comma separated list of machine <hostname>:<workerGroup> or <IP>:<workerGroup>.All hostname or IP must be a
# subset of configuration `ips`, And workerGroup have default value as `default`, but we recommend you declare behind the hosts
# Example for hostnames: workers="ds1:default,ds2:default,ds3:default", Example for IPs: workers="192.168.8.1:default,192.168.8.2:default,192.168.8.3:default"
workers="realtime-1:default,realtime-2:default,realtime-3:default"

# A comma separated list of machine hostname or IP would be installed Alert server, it
# must be a subset of configuration `ips`.
# Example for hostname: alertServer="ds3", Example for IP: alertServer="192.168.8.3"
alertServer="realtime-3"

# A comma separated list of machine hostname or IP would be installed API server, it
# must be a subset of configuration `ips`.
# Example for hostname: apiServers="ds1", Example for IP: apiServers="192.168.8.1"
apiServers="realtime-1"

# A comma separated list of machine hostname or IP would be installed Python gateway server, it
# must be a subset of configuration `ips`.
# Example for hostname: pythonGatewayServers="ds1", Example for IP: pythonGatewayServers="192.168.8.1"
pythonGatewayServers="realtime-1"

# The directory to install DolphinScheduler for all machine we config above. It will automatically be created by `install.sh` script if not exists.
# Do not set this configuration same as the current path (pwd)
installPath="/data/dolphinscheduler"

# The user to deploy DolphinScheduler for all machine we config above. For now user must create by yourself before running `install.sh`
# script. The user needs to have sudo privileges and permissions to operate hdfs. If hdfs is enabled than the root directory needs
# to be created by this user
deployUser="dolphinscheduler"

# The directory to store local data for all machine we config above. Make sure user `deployUser` have permissions to read and write this directory.
dataBasedirPath="/data/dolphinscheduler"

# ---------------------------------------------------------
# DolphinScheduler ENV
# ---------------------------------------------------------
# JAVA_HOME, we recommend use same JAVA_HOME in all machine you going to install DolphinScheduler
# and this configuration only support one parameter so far.
javaHome="/usr/local/jdk"

# DolphinScheduler API service port, also this is your DolphinScheduler UI component's URL port, default value is 12345
apiServerPort="7066"

# ---------------------------------------------------------
# Database
# NOTICE: If database value has special characters, such as `.*[]^${}\+?|()@#&`, Please add prefix `\` for escaping.
# ---------------------------------------------------------
# The type for the metadata database
# Supported values: ``postgresql``, ``mysql`, `h2``.
DATABASE_TYPE=${DATABASE_TYPE:-"mysql"}

# Spring datasource url, following <HOST>:<PORT>/<database>?<parameter> format, If you using mysql, you could use jdbc
# string jdbc:mysql://127.0.0.1:3306/dolphinscheduler?useUnicode=true&characterEncoding=UTF-8 as example
SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL:-"jdbc:mysql://realtime-1:3306/dolphinscheduler?useUnicode=true&characterEncoding=UTF-8"}

# Spring datasource username
SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME:-"web"}

# Spring datasource password
SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD:-"zanalytics"}

# ---------------------------------------------------------
# Registry Server
# ---------------------------------------------------------
# Registry Server plugin name, should be a substring of `registryPluginDir`, DolphinScheduler use this for verifying configuration consistency
registryPluginName="zookeeper"

# Registry Server address.
registryServers="realtime-1:2181,realtime-2:2181,realtime-3:2181"

# Registry Namespace
registryNamespace="dolphinscheduler"

# ---------------------------------------------------------
# Worker Task Server
# ---------------------------------------------------------
# Worker Task Server plugin dir. DolphinScheduler will find and load the worker task plugin jar package from this dir.
taskPluginDir="lib/plugin/task"

# resource storage type: HDFS, S3, NONE
resourceStorageType="NONE"

# resource store on HDFS/S3 path, resource file will store to this hdfs path, self configuration, please make sure the directory exists on hdfs and has read write permissions. "/dolphinscheduler" is recommended
resourceUploadPath="/dolphinscheduler"

# if resourceStorageType is HDFS，defaultFS write namenode address，HA, you need to put core-site.xml and hdfs-site.xml in the conf directory.
# if S3，write S3 address，HA，for example ：s3a://dolphinscheduler，
# Note，S3 be sure to create the root directory /dolphinscheduler
defaultFS="hdfs://zhugeio"

# if resourceStorageType is S3, the following three configuration is required, otherwise please ignore
s3Endpoint="http://192.168.xx.xx:9010"
s3AccessKey="xxxxxxxxxx"
s3SecretKey="xxxxxxxxxx"

# resourcemanager port, the default value is 8088 if not specified
resourceManagerHttpAddressPort="8088"

# if resourcemanager HA is enabled, please set the HA IPs; if resourcemanager is single node, keep this value empty
yarnHaIps="192.168.xx.xx,192.168.xx.xx"

# if resourcemanager HA is enabled or not use resourcemanager, please keep the default value; If resourcemanager is single node, you only need to replace 'yarnIp1' to actual resourcemanager hostname
singleYarnIp="yarnIp1"

# who has permission to create directory under HDFS/S3 root path
# Note: if kerberos is enabled, please config hdfsRootUser=
hdfsRootUser="hdfs"

# kerberos config
# whether kerberos starts, if kerberos starts, following four items need to config, otherwise please ignore
kerberosStartUp="false"
# kdc krb5 config file path
krb5ConfPath="$installPath/conf/krb5.conf"
# keytab username,watch out the @ sign should followd by \\
keytabUserName="hdfs-mycluster\\@ESZ.COM"
# username keytab path
keytabPath="$installPath/conf/hdfs.headless.keytab"
# kerberos expire time, the unit is hour
kerberosExpireTime="2"

# use sudo or not
sudoEnable="true"

# worker tenant auto create
workerTenantAutoCreate="false"

```

### 初始化数据库

DolphinScheduler 元数据存储在关系型数据库中，目前支持 PostgreSQL 和 MySQL，如果使用 MySQL 则需要手动下载 [mysql-connector-java 驱动](https://downloads.mysql.com/archives/c-j/) (8.0.16) 并移动到 DolphinScheduler 的 lib目录下。下面以 MySQL 为例，说明如何初始化数据库

```bash
mysql -uroot -p
mysql> CREATE DATABASE dolphinscheduler DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

```

完成上述步骤后，您已经为 DolphinScheduler 创建一个新数据库，现在你可以通过快速的 Shell 脚本来初始化数据库

```
sh script/create-dolphinscheduler.sh
```

## 启动 DolphinScheduler

使用上面创建的**部署用户**运行以下命令完成部署，部署后的运行日志将存放在 logs 文件夹内

```shell
sh install.sh
```

> ***注意:\*** 第一次部署的话，可能出现 5 次`sh: bin/dolphinscheduler-daemon.sh: No such file or directory`相关信息，次为非重要信息直接忽略即可

## 登录 DolphinScheduler

浏览器访问地址 http://localhost:12345/dolphinscheduler 即可登录系统UI。默认的用户名和密码是 **admin/dolphinscheduler123**

## 启停服务

```shell
# 一键停止集群所有服务
sh ./bin/stop-all.sh

# 一键开启集群所有服务
sh ./bin/start-all.sh

# 启停 Master
sh ./bin/dolphinscheduler-daemon.sh stop master-server
sh ./bin/dolphinscheduler-daemon.sh start master-server

# 启停 Worker
sh ./bin/dolphinscheduler-daemon.sh start worker-server
sh ./bin/dolphinscheduler-daemon.sh stop worker-server

# 启停 Api
sh ./bin/dolphinscheduler-daemon.sh start api-server
sh ./bin/dolphinscheduler-daemon.sh stop api-server

# 启停 Alert
sh ./bin/dolphinscheduler-daemon.sh start alert-server
sh ./bin/dolphinscheduler-daemon.sh stop alert-server
```

> ***注意:\***：服务用途请具体参见《系统架构设计》小节