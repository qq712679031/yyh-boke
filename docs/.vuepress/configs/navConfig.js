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
        text: '消息队列',
        children: [
            {
                text: 'kafka',
                children: [
                    '/MQ/kafka/kafkaCommand.md',
                    '/MQ/kafka/sasl/kafkaSaslPlain.md',
                ],
            },
        ],
    },
    {
        text: 'sql数据库',
        children: [
            {
                text: 'mysql',
                children: [
                    '/sqlDatabase/mysql/mysqlDump.md',
                ],
            },
        ],
    },
    {
        text: 'nosql数据库',
        children: [
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
        ],
    },
    // {
    //     text: '数据迁移',
    //     children: [
    //         '/dataMigration',
    //     ],
    // }
];
module.exports = nav;