import { navbar } from "vuepress-theme-hope";
import fastGlob from "fast-glob";
import _ from "lodash";
import path from "path";
import fs from "fs";
import yidocsConfig from "../yidocs.config.js";
// 生成侧边栏
function generateNavBar() {
    let navBar = [];

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
            let item1 = item[1].replace(/^\d*-/gi, "");
            let item2 = item[2].replace(/^\d*-/gi, "");
            if (_.some(navBar, { text: item1 }) === false) {
                navBar.push({
                    text: item1,
                    icon: "template",
                    prefix: `/markdown/${item[1]}/`,
                    children: [],
                });
            }
            let index = _.findIndex(navBar, { text: item1 });
            if (_.some(navBar[index].children, { text: item2 }) === false) {
                navBar[index].children.push({
                    text: item2,
                    icon: "folder",
                    link: len === 4 ? `${item[2]}/${item[3]}` : `${item[2]}/${item[3]}/${item[4]}`,
                });
            }
        });

    navBar = navBar.concat(yidocsConfig.outLinks);

    return navBar;
}
export default navbar(generateNavBar());
