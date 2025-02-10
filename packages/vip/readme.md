# @yidocs/vip

给 `yidocs(易文档)` 提供会员隐藏内容的插件。

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
import markdownItVip from '@yidocs/vip';

export default defineConfig({
    markdown: {
        theme: 'one-dark-pro',
        lineNumbers: true,
        config: (md) => {
            md.use(markdownItVip);
        }
    }
});
```
