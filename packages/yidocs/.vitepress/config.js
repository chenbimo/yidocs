import { defineConfig } from 'vitepress';
import { docsAuto } from '@yidocs/auto';

const { sideBar, navBar } = docsAuto();

export default defineConfig({
    layout: 'home',
    base: '/',
    title: '陈随易',
    description: '何以解忧，唯有代码。',
    lastUpdated: true,
    cleanUrls: false,
    outDir: './dist',
    srcDir: './markdown',
    ignoreDeadLinks: true,
    titleTemplate: false,
    sitemap: {},
    head: [
        [
            'meta',
            {
                name: 'keywords',
                content: ''
            }
        ],
        ['meta', { name: 'author', content: '陈随易' }],
        [
            'link',
            {
                rel: 'shortcut icon',
                href: '/favicon.ico'
            }
        ]
    ],
    themeConfig: {
        logo: '/logo.jpg',
        lastUpdatedText: '更新时间',
        siteTitle: '陈随易',
        outline: 'deep',
        outlineTitle: '大纲',
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/chenbimo'
            }
        ],
        footer: {
            message: '何以解忧，唯有代码。',
            copyright: 'Copyright © present 陈随易'
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        nav: [{ text: '首页', link: '/' }, ...navBar],
        sidebar: sideBar
    },
    vite: {
        optimizeDeps: {},
        plugins: []
    },
    markdown: {
        theme: 'one-dark-pro',
        lineNumbers: true,
        config: (md) => {}
    }
});
