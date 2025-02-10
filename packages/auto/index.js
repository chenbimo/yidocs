import { basename, join } from 'node:path';
import { globSync, readdirSync } from 'node:fs';

function orderBy(collection, iteratee, order = 'asc') {
    return [...collection].sort((a, b) => {
        const aValue = iteratee(a);
        const bValue = iteratee(b);

        if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

// 自动生成侧边栏
const autoSideBar = (dirPath) => {
    const files = readdirSync(join(process.cwd(), 'markdown', dirPath), {
        withFileTypes: true,
        recursive: true
    });

    const _dirPathName = dirPath.split('/').filter((n) => n.trim())?.[1];
    const dirPathName = _dirPathName.slice(_dirPathName.indexOf('-') + 1);
    const sideBarObjs = {};

    for (let i = 0; i < files.length; i++) {
        const item = files[i];
        // 必须是以 .md 结尾的文件
        if (item.isFile() === false || item.name.endsWith('.md') === false) continue;
        const fileName = (item.parentPath.replace(/[\\\/]+/gi, '/') + '/' + item.name).replace('//', '/');
        const fileEnd = fileName.replace(/^.+\/markdown\//gi, '/').replace(dirPath, '');
        const fileSplit = fileEnd.split('/').filter((name) => name);
        let isNameAllPass = true;
        // 文件或目录必须以 数字-名称组成
        for (let i = 0; i < fileSplit.length; i++) {
            const name = fileSplit[i];
            if (/^[1-9][0-9]*-/.test(name) === false) {
                isNameAllPass = false;
                continue;
            }
        }
        if (isNameAllPass === false) continue;
        const fileArrs = fileSplit.map((text) => {
            const order = Number(text.slice(0, text.indexOf('-')));
            const name = text.slice(text.indexOf('-') + 1);
            return {
                order: order,
                name: text,
                title: name.trim().replace('.md', '')
            };
        });

        if (fileArrs.length === 1) {
            if (!sideBarObjs[dirPath]) {
                sideBarObjs[dirPath] = {
                    id: dirPath,
                    pid: '',
                    text: `📁 ${dirPathName}`,
                    collapsed: false,
                    items: [
                        {
                            order: fileArrs[0].order,
                            text: `📄 ${fileArrs[0].title}`,
                            link: `${dirPath}${fileArrs[0].name}`
                        }
                    ]
                };
            } else {
                sideBarObjs[dirPath].items.push({
                    order: fileArrs[0].order,
                    text: `📄 ${fileArrs[0].title}`,
                    link: `${dirPath}${fileArrs[0].name}`
                });
            }
        }

        if (fileArrs.length === 2) {
            if (!sideBarObjs[fileArrs[0].name]) {
                sideBarObjs[fileArrs[0].name] = {
                    order: fileArrs[0].order,
                    id: fileArrs[0].name,
                    pid: dirPath,
                    text: `📁 ${fileArrs[0].title}`,
                    collapsed: false,
                    items: [
                        {
                            order: fileArrs[1].order,
                            text: `📄 ${fileArrs[1].title}`,
                            link: `${dirPath}${fileArrs[0].name}/${fileArrs[1].name}`
                        }
                    ]
                };
            } else {
                sideBarObjs[fileArrs[0].name].items.push({
                    order: fileArrs[1].order,
                    text: `📄 ${fileArrs[1].title}`,
                    link: `${dirPath}${fileArrs[0].name}/${fileArrs[1].name}`
                });
            }
        }
    }

    const treeSideBar = orderBy(
        Object.values(sideBarObjs).map((sideBar) => {
            sideBar.items = orderBy(
                sideBar.items,
                (item) => {
                    return item.order;
                },
                'asc'
            );
            return sideBar;
        }),
        (item) => {
            return item.order;
        },
        'asc'
    );

    return treeSideBar;
};

// 设置侧边栏
const setNavAndSide = () => {
    const files = readdirSync(join(process.cwd(), 'markdown'), {
        withFileTypes: true,
        recursive: true
    });

    const sideObjs = {};
    const navObjs = {};
    for (let i = 0; i < files.length; i++) {
        const item = files[i];
        // 必须是以 .md 结尾的文件
        if (item.isFile() === false || item.name.endsWith('.md') === false) continue;
        const fileName = item.parentPath.replace(/[\\\/]+/gi, '/') + '/' + item.name;
        const fileEnd = fileName.replace(/^.+\/markdown\//gi, '');
        const fileSplit = fileEnd.split('/').filter((name) => name);
        // 不能是 public 目录中的文件
        if (fileSplit[0] === 'public' || fileSplit[0] === 'index.md') continue;
        // 目录层级必须在 2-3-4 级
        if (fileSplit.length > 4) {
            console.log(`文件${fileEnd} 请按照 【分类-文章】 或者 【分类-[项目]-目录-文章】 的层级方式组织文件`);
            continue;
        }
        let isNameAllPass = true;
        // 文件或目录必须以 数字-名称组成
        for (let i = 0; i < fileSplit.length; i++) {
            const name = fileSplit[i];
            if (/^[1-9][0-9]*-/.test(name) === false) {
                isNameAllPass = false;
                continue;
            }
        }
        if (isNameAllPass === false) continue;

        if (fileSplit.length === 1) {
            const [firstSplit] = fileSplit;
            const firstNumber = Number(firstSplit.slice(0, firstSplit.indexOf('-')));
            const navName = firstSplit.replace(/^\d+-/gi, '').replace('.md', '');
            navObjs[`/${firstSplit}/`] = {
                order: firstNumber,
                text: navName,
                link: fileEnd.replace('.md', '')
            };
            continue;
        }

        const [firstSplit, secondSplit] = fileSplit;
        const lastSplit = fileSplit[fileSplit.length - 1];

        const lastNumber = Number(lastSplit.slice(0, lastSplit.indexOf('-')));
        const firstNumber = Number(firstSplit.slice(0, firstSplit.indexOf('-')));
        const secondNumber = Number(secondSplit.slice(0, secondSplit.indexOf('-')));
        const navName = firstSplit.replace(/^\d+-/gi, '');
        const linkName = secondSplit.replace(/^\d+-/gi, '').replace('.md', '');
        const dirPath = `/${firstSplit}/${secondSplit}/`;

        if (fileSplit.length === 2) {
            if (navObjs[`/${firstSplit}/`] === undefined) {
                navObjs[`/${firstSplit}/`] = {
                    order: firstNumber,
                    text: navName,
                    link: fileEnd.replace('.md', '')
                };
            }
            if (sideObjs[`/${firstSplit}/`] === undefined) {
                sideObjs[`/${firstSplit}/`] = {
                    id: dirPath,
                    pid: '',
                    text: `📁 ${firstSplit}`,
                    collapsed: false,
                    items: [
                        {
                            order: secondNumber,
                            text: `📄 ${linkName}`,
                            link: '/' + fileEnd
                        }
                    ]
                };
            } else {
                sideObjs[`/${firstSplit}/`].items.push({
                    order: secondNumber,
                    text: `📄 ${linkName}`,
                    link: '/' + fileEnd
                });
            }
        } else {
            // 设置导航下的擦边蓝
            if (sideObjs[dirPath] === undefined) {
                sideObjs[dirPath] = autoSideBar(dirPath);
            }

            // 如果是第一个，就作为顶部导航
            if (lastNumber === 1) {
                if (navObjs[firstSplit] === undefined) {
                    navObjs[firstSplit] = {
                        order: firstNumber,
                        text: navName,
                        items: [
                            {
                                order: secondNumber,
                                text: linkName,
                                link: fileEnd.replace('.md', '')
                            }
                        ]
                    };
                } else {
                    const isPass = navObjs[firstSplit].items.some((item) => item.text === linkName);
                    if (isPass === false) {
                        navObjs[firstSplit].items.push({
                            order: secondNumber,
                            text: linkName,
                            link: fileEnd.replace('.md', '')
                        });
                    }
                }
            }
        }
    }

    const navObjs2 = orderBy(
        Object.values(navObjs).map((nav) => {
            nav.items = orderBy(
                nav.items || [],
                (item) => {
                    return item.order;
                },
                'asc'
            );
            return nav;
        }),
        (item) => {
            return item.order;
        },
        'asc'
    );

    return {
        navBar: navObjs2,
        sideBar: sideObjs
    };
};

// 自动生成
const docsAuto = () => {
    const { sideBar, navBar } = setNavAndSide();
    return {
        sideBar: sideBar,
        navBar: navBar
    };
};

export { docsAuto };
