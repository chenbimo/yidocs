import fg from 'fast-glob';
import { dirname, basename } from 'node:path';
import { renameSync } from 'node:fs';
const files = fg.sync(['markdown/**/[[:digit:]]#*'], { dot: true, onlyDirectories: true });
files.reverse().forEach((file) => {
    const basename2 = basename(file).replace('#', '-');
    const dirname2 = dirname(file);
    const file2 = `${dirname2}/${basename2}`;
    renameSync(file, file2);
    // console.log('🚀 ~ files.forEach ~ file2:', file2);
});

const img1 = 'logo.jpg';

const regionStart = /#region (?<name>.+)/;
const lineCount2 = globalData.activeEditor.document.lineCount;
const matchRegions2 = [];
const regionEnd = /#endregion/;
const lineCount = globalData.activeEditor.document.lineCount;
const matchRegions = [];
//#region 区域1
const a = 1;
const b = a + 1;
//#region 区域2
const c = 2;
const d = c + 1;
// #region 区域3
const e = 5;
// #endregion
//#endregion
//#endregion

// fnMap(待办)要尽快完成登录鉴权的问题
// fnMap(TODO)要尽快完成登录鉴权的问题
// fnMap(功能)增加一个一维数组转树结构的工具函数
// fnMap(备注)这代码踏马谁写的！
// fnMap(修复)把这个bug修复了，把写bug的人也修了。
// TODO: 这个函数需要重构
// FIXME: 记得稍后修复
// BUG: 这里可能会有bug
// FEATURE: 这是一个新特性
// NOTE: 注意这个地方
// HACK: 这是用hack的方式实现的
