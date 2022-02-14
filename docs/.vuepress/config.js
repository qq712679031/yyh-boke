module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '大数据知识点集锦',
    description: '这是我的第一个 VuePress 站点',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        //导航栏
        navbar: [
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
                            '/database/mysql/mysqlDump.md',
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
                            '/dataMigration/redis/redisAOF.md',
                        ],
                    },
                    {
                        text: 'ssdb',
                        children: [
                            '/dataMigration/ssdb/ssdbToredis.md',
                        ],
                    },
                ],
            },
            {
                text: '数据迁移',
                children: [
                    '/dataMigration',
                ],
            }
        ],
        //侧边栏
        // sidebar: {
        //     '/zh/guide/': [
        //         {
        //             text: '指南',
        //             children: [
        //                 '/zh/guide/README.md',
        //                 '/zh/guide/getting-started.md',
        //                 '/zh/guide/configuration.md',
        //                 '/zh/guide/page.md',
        //                 '/zh/guide/markdown.md',
        //                 '/zh/guide/assets.md',
        //                 '/zh/guide/i18n.md',
        //                 '/zh/guide/deployment.md',
        //                 '/zh/guide/theme.md',
        //                 '/zh/guide/plugin.md',
        //                 '/zh/guide/bundler.md',
        //                 '/zh/guide/migration.md',
        //             ],
        //         },
        //     ],
        // }
    },
}