import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";
import yidocsConfig from "../yidocs.config.js";

export default hopeTheme({
    hostname: yidocsConfig.hostname,
    author: yidocsConfig.author,
    iconPrefix: "iconfont icon-",
    logo: "/logo.png",
    iconAssets: "/iconfont/iconfont.css",
    repo: yidocsConfig.repo,
    hideSiteNameonMobile: false,
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime", "Word", "PageView"],
    docsDir: "",
    navbar: navbar,
    sidebar: sidebar,
    footer: yidocsConfig.footer,
    displayFooter: true,
    editLink: false,
    lastUpdated: true,
    pure: false,
    encrypt: {},
    plugins: {
        blog: false,
        mdEnhance: {
            gfm: true,
            container: true,
            vpre: true,
            tabs: true,
            codetabs: true,
            align: true,
            sup: true,
            sub: true,
            footnote: true,
            mark: true,
            imageMark: true,
            tasklist: true,
            flowchart: true,
            presentation: false,
        },
    },
});
