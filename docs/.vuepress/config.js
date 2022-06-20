const navConfig =  require("./configs/navConfig");
const sidebarConfig =  require("./configs/sidebarConfig");

module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '大数据知识点集锦',
    description:'闻道有先后，术业有专攻',
    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        //导航栏
        navbar: navConfig,
        //侧边栏
        // sidebar: sidebarConfig,
    },

}