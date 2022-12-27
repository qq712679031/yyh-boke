const nav = [
    {
        text: '大数据架构知识点',
        children: [
            {
                text: '数据湖',
                children: [
                    '/dataLake'
                ],
            },
            {
                text: '大数据架构',
                children: [
                    '/architecture/lambda.md',
                    '/architecture/kappa.md',
                ],
            },
        ],
    },
    {
        text: 'hadoop',
        children: [
            {
                text: 'hdfs',
                children: [
                    '/hadoop/hdfs/hdfsShell.md',
                    '/hadoop/hdfs/distcp.md',
                ],
            },
        ],
    },
    {
        text: '语言',
        children: [
            {
                text: 'java',
                children: [
                    '/language/java/JVM.md',
                ],
            },
        ],
    },
    {
        text: '数据存储',
        children: [
            {
                text: 'mysql',
                children: [
                    '/sqlDatabase/mysql/mysqlDump.md',
                ],
            },
            {
                text: 'redis',
                children: [
                    '/noSqlDatabase/redis/redisAOF.md',
                    '/noSqlDatabase/redis/redisShake.md',
                ],
            },
            {
                text: 'ssdb',
                children: [
                    '/noSqlDatabase/ssdb/ssdbToredis.md',
                ],
            },
            {
                text: 'impala',
                children: [
                    '/noSqlDatabase/impala/README.md',
                ],
            },
            {
                text: 'kudu',
                children: [
                    '/noSqlDatabase/kudu/README.md',
                    '/noSqlDatabase/kudu/kuduUpgrade.md'
                ],
            },
            {
                text: 'hive',
                children: [
                    '/noSqlDatabase/hive/README.md',
                ],
            },
            {
                text: 'kafka',
                children: [
                    '/MQ/kafka/kafka.md',
                    '/MQ/kafka/kafkaCommand.md',
                    '/MQ/kafka/sasl/kafkaSaslPlain.md',
                ],
            },
        ],
    },
];
module.exports = nav;