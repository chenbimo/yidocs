import { defineConfig } from 'vitepress';
import { docsAuto } from '@yidocs/auto';

const { sideBar, navBar } = docsAuto();

export default defineConfig({
    layout: 'home',
    base: '/',
    title: '易文档',
    description: '创造美好生活，需要美好商业。',
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
        ['meta', { name: 'author', content: '易文档' }],
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
        siteTitle: '易文档',
        outline: 'deep',
        outlineTitle: '大纲',
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/vuejs/vitepress'
            },
            { icon: 'twitter', link: '...' }
        ],
        footer: {
            message: '创造美好生活，需要美好商业。',
            copyright: 'Copyright © present 易文档'
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
