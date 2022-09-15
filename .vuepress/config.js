import { defineUserConfig } from "vuepress";
import themeConfig from "./themeConfig";
import yidocsConfig from "../yidocs.config.js";

export default defineUserConfig({
    base: "/",
    title: yidocsConfig.title,
    description: yidocsConfig.description,
    dest: "./dist",
    locales: {
        "/": {
            lang: "zh-CN",
            title: yidocsConfig.title,
            description: yidocsConfig.slogan,
        },
    },
    theme: themeConfig,
});
