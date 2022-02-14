const navConfig =  require("./configs/navConfig");
const sidebarConfig =  require("./configs/sidebarConfig");

module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '大数据知识点集锦',
    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        //导航栏
        navbar: navConfig,
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