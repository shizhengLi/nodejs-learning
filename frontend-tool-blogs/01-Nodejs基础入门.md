# Node.js基础入门 - 从前端到全端的桥梁

## 前言

作为一名熟悉HTML、CSS、JavaScript的前端开发者，你可能会问：为什么需要Node.js？Node.js如何改变我的开发方式？本文将带你深入了解Node.js的核心概念，让你从"前端开发者"平滑过渡到"全端开发者"。

## 什么是Node.js？

### 核心概念
Node.js是一个基于Chrome V8引擎的JavaScript运行时环境。它让JavaScript能够在服务器端运行，打破了JavaScript只能在浏览器中运行的局限。

### 为什么前端开发者需要Node.js？
1. **统一语言**：使用JavaScript开发前后端
2. **丰富的生态系统**：npm包管理器提供海量工具
3. **现代化工具链**：Webpack、Babel、ESLint等都依赖Node.js
4. **全栈开发能力**：一个语言搞定整个项目

## 环境搭建

### 安装Node.js
```bash
# 查看是否已安装
node --version
npm --version

# 如果没有安装，建议使用nvm管理版本
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 使用nvm安装Node.js
nvm install 18
nvm use 18
```

### 验证安装
创建你的第一个Node.js文件：

```javascript
// hello.js
console.log('Hello, Node.js!');
console.log('当前Node.js版本:', process.version);
console.log('当前工作目录:', process.cwd());
```

运行：
```bash
node hello.js
```

## 核心模块详解

### 1. 文件系统模块 (fs)
```javascript
const fs = require('fs');

// 同步读取文件
try {
    const data = fs.readFileSync('package.json', 'utf8');
    console.log('文件内容:', data);
} catch (err) {
    console.error('读取文件失败:', err);
}

// 异步读取文件
fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件失败:', err);
        return;
    }
    console.log('异步读取文件内容:', data);
});
```

### 2. 路径模块 (path)
```javascript
const path = require('path');

console.log('当前文件路径:', __filename);
console.log('当前目录路径:', __dirname);

console.log('路径拼接:', path.join(__dirname, 'public', 'index.html'));
console.log('路径解析:', path.resolve('src', 'components'));
console.log('文件扩展名:', path.extname('index.html'));
```

### 3. HTTP模块 (http)
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>你好，Node.js！</h1>');
});

server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 4. 事件模块 (events)
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 监听事件
myEmitter.on('event', () => {
    console.log('事件触发了！');
});

// 触发事件
myEmitter.emit('event');
```

## 异步编程模式

### 回调函数 (Callback)
```javascript
const fs = require('fs');

fs.readFile('file1.txt', 'utf8', (err, data1) => {
    if (err) return console.error(err);

    fs.readFile('file2.txt', 'utf8', (err, data2) => {
        if (err) return console.error(err);

        fs.readFile('file3.txt', 'utf8', (err, data3) => {
            if (err) return console.error(err);

            console.log('所有文件读取完成:', data1, data2, data3);
        });
    });
});
```

### Promise方式
```javascript
const fs = require('fs').promises;

async function readFiles() {
    try {
        const data1 = await fs.readFile('file1.txt', 'utf8');
        const data2 = await fs.readFile('file2.txt', 'utf8');
        const data3 = await fs.readFile('file3.txt', 'utf8');

        console.log('所有文件读取完成:', data1, data2, data3);
    } catch (err) {
        console.error('读取文件失败:', err);
    }
}

readFiles();
```

## 模块系统

### CommonJS规范
```javascript
// 导出模块
// math.js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

module.exports = { add, multiply };

// 导入模块
// main.js
const math = require('./math.js');
console.log(math.add(2, 3));      // 5
console.log(math.multiply(4, 5)); // 20
```

### ES Modules
```javascript
// 导出模块
// math.mjs
export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// 导入模块
// main.mjs
import { add, multiply } from './math.mjs';
console.log(add(2, 3));      // 5
console.log(multiply(4, 5)); // 20
```

## 调试技巧

### 使用console调试
```javascript
console.log('普通日志');
console.warn('警告信息');
console.error('错误信息');
console.time('计时器');
// ... 代码执行
console.timeEnd('计时器');
```

### 使用Node.js内置调试器
```bash
node inspect app.js
```

### 使用VSCode调试
在VSCode中创建`.vscode/launch.json`：
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "启动程序",
            "program": "${workspaceFolder}/app.js"
        }
    ]
}
```

## 实战练习

### 练习1：创建静态文件服务器
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - 页面不存在</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log('静态文件服务器运行在 http://localhost:3000');
});
```

### 练习2：文件操作工具
```javascript
const fs = require('fs');
const path = require('path');

class FileUtil {
    static copyFile(src, dest) {
        return new Promise((resolve, reject) => {
            fs.copyFile(src, dest, (err) => {
                if (err) reject(err);
                else resolve('文件复制成功');
            });
        });
    }

    static getFileInfo(filePath) {
        const stats = fs.statSync(filePath);
        return {
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory()
        };
    }
}

// 使用示例
FileUtil.copyFile('source.txt', 'destination.txt')
    .then(result => console.log(result))
    .catch(err => console.error(err));

console.log(FileUtil.getFileInfo('package.json'));
```

## 常见问题解答

### Q: Node.js和浏览器JavaScript有什么区别？
A: Node.js没有DOM和BOM，但提供了文件系统、网络等服务器端API。Node.js使用CommonJS模块系统，浏览器使用ES Modules。

### Q: 如何选择Node.js版本？
A: LTS版本最稳定，推荐生产环境使用。Current版本有最新功能，适合开发尝鲜。

### Q: 如何处理异步操作的错误？
A: 使用try-catch处理async/await，或者用.catch()处理Promise。回调函数则需要在回调中检查错误参数。

## 总结

Node.js为前端开发者打开了通往后端开发的大门。通过本文的学习，你应该能够：

1. 理解Node.js的基本概念和作用
2. 掌握核心模块的使用方法
3. 理解异步编程的几种模式
4. 能够创建简单的Node.js应用
5. 具备基本的调试能力

下一步，我们将深入学习NPM包管理器，它是Node.js生态系统的核心。

---

**扩展阅读：**
- [Node.js官方文档](https://nodejs.org/docs/)
- [Node.js最佳实践](https://github.com/goldbergyoni/nodebestpractices)
- [Node.js设计模式](https://www.nodejsdesignpatterns.com/)

**练习项目：**
1. 创建一个命令行待办事项应用
2. 开发一个简单的日志系统
3. 实现一个文件批量重命名工具