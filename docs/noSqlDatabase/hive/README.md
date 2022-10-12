---
lang: zh-CN
title: hive 
description: hive 
---
##1 hive 乱码解决
```sql
#修改字段注释字符集
alter table COLUMNS_V2 modify column COMMENT varchar(256) character set utf8;
 
#修改表注释字符集
alter table TABLE_PARAMS modify column PARAM_VALUE varchar(20000) character set utf8;
 
#修改分区参数，支持分区建用中文表示
alter table PARTITION_PARAMS modify column PARAM_VALUE varchar(20000) character set utf8;
alter table PARTITION_KEYS modify column PKEY_COMMENT varchar(20000) character set utf8;
 
#修改索引名注释，支持中文表示
alter table INDEX_PARAMS modify column PARAM_VALUE varchar(4000) character set utf8;
 
 
 
****************以下两句可以不执行*********************************
 
#修改视图，支持视图中文
ALTER TABLE TBLS modify COLUMN VIEW_EXPANDED_TEXT mediumtext CHARACTER SET utf8;
ALTER TABLE TBLS modify COLUMN VIEW_ORIGINAL_TEXT mediumtext CHARACTER SET utf8;
 
```