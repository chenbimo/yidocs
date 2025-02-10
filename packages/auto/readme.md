# @yidocs/auto

自动生成`yidocs`文档顶部导航栏和侧边栏的插件。

### 仓库地址

[github - https://github.com/chenbimo/yidocs](https://github.com/chenbimo/yidocs)

### 效果演示

笔者的个人文章就是基于`yidocs`搭建的，点击查看即可。

[前端之虎陈随易 https://chensuiyi.me](https://chensuiyi.me)

## 安装使用

本插件可以在 `vitepress` 文档中使用，配置方法如下。

更为方便的用法就是，下载`yidocs`文档模板，开箱即用。

**yidocs教程地址**：`https://npmmirror.com/package/yidocs`

## 代码示例

```js
import { docsAuto } from '@yidocs/auto';

const { sideBar, navBar } = docsAuto();

export default defineConfig({
    themeConfig: {
        nav: [{ text: '首页', link: '/' }, ...navBar],
        sidebar: sideBar
    }
});
```
