export default function contentReplacePlugin(md, text) {
    // 定义正则表达式来匹配目标内容
    const vipStart = /\<\!\-\-vipStart\-\-(?<vipText>.+)\-\-\>/;
    const vipEnd = '<!--vipEnd-->';

    // 在 markdown-it 的核心规则之前添加我们的规则
    md.core.ruler.before('normalize', 'replace_content', function (state) {
        let lines = state.src.split('\n');
        let result = [];
        let isInBlock = false;
        let hideText = '';
        let vipText = '';
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const match = line.trim().match(vipStart);

            // 检查是否是开始标记
            if (match && match?.groups?.vipText && !isInBlock) {
                vipText = match?.groups?.vipText;
                isInBlock = true;
                continue;
            }

            // 检查是否是结束标记
            if (line.trim() === vipEnd && isInBlock) {
                isInBlock = false;

                result.push(`::: warning 会员内容
会员隐藏内容，共 [${hideText.length}] 字。${vipText}
:::
                    `);

                hideText = '';
                vipText = '';
                continue;
            }

            // 如果不在块内，保留原始行
            if (!isInBlock) {
                result.push(line);
            } else {
                hideText += line;
            }
        }

        // 更新源文本
        state.src = result.join('\n');

        return true;
    });
}
