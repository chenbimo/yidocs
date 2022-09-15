import { sidebar } from "vuepress-theme-hope";
import fastGlob from "fast-glob";
import _ from "lodash";
import path from "path";
import fs from "fs";
import yidocsConfig from "../yidocs.config.js";

// 生成侧边栏
function generateSideBar() {
    let sidebar = {};
    let fileScan = fastGlob.sync(`markdown/**/*.md`, { onlyFiles: true });

    let fileArray = fileScan
        .map((file) => {
            let paths = file.split("/").filter((v) => v);
            return paths;
        })
        .filter((fileSplit) => {
            return fileSplit.length === 4 || fileSplit.length === 5;
        })
        .forEach((item) => {
            let len = item.length;
            let last1 = len - 1;
            let last2 = len - 2;
            let urlPath = `/${item[0]}/${item[1]}/${item[2]}`;
            if (sidebar[urlPath] === undefined) {
                sidebar[urlPath] = [];
            }
            let prefixText = item[last2].replace(/^\d+-/, "");
            // 如果父级还没有相同的选项
            if (_.some(sidebar[urlPath], { text: prefixText }) === false) {
                sidebar[urlPath].push({
                    text: prefixText,
                    icon: "wenjian2",
                    prefix: len === 4 ? `/${item[0]}/${item[1]}/${item[2]}` : `/${item[0]}/${item[1]}/${item[2]}/${item[3]}`,
                    collapsable: true,
                    children: [],
                });
            }
            let index = _.findIndex(sidebar[urlPath], { text: prefixText });
            let fileName = path.basename(item[last1], ".md").replace(/^\d*-/, "");
            sidebar[urlPath][index].children.push({
                text: fileName,
                icon: "wenjian8",
                link: item[last1],
            });
        });

    return sidebar;
}

export default sidebar(generateSideBar());
