# impala case

1. 连接超时
2. 由于最近业务模块添加过多(cep cdp .....)
   impala 的线程池明显不够用 经常会连接超时 连接失败 等问题
   所以需要在impala 配置文件 和hive 配置文件 添加以下参数来保证服务正常使用
   impala (/etc/default/impala) (主要添加了impala 线程数  默认为64 )
   IMPALA_SERVER_ARGS 中添加一项
   -fe_service_threads=128
   hive (hive-site.xml)(主要 增加了连接超时时间和缩短了空闲连接保留时长)
   <property>
   <name>hive.server2.session.check.interval</name>
   <value>60000</value>
   </property>
   <property>
   <name>hive.server2.idle.session.timeout</name>
   <value>3600000</value>
   </property>
   <property>
   <name>hive.metastore.client.socket.timeout</name>
   <value>300</value>
   </property>