# Express框架实战 - 构建现代化的Web应用

## 前言

你已经掌握了Node.js基础和NPM包管理，现在让我们进入最流行的Node.js Web框架——Express。Express是一个简洁、灵活的Node.js Web应用框架，提供了强大的功能来开发Web和移动应用。本文将带你从零开始，深入理解Express的各个方面。

## Express框架概述

### 为什么选择Express？
- **简洁高效**：最小化和灵活的Web应用框架
- **中间件系统**：强大的中间件生态
- **路由系统**：灵活的路由配置
- **模板引擎**：支持多种模板引擎
- **错误处理**：完善的错误处理机制

### 安装Express
```bash
# 创建项目目录
mkdir express-app
cd express-app

# 初始化项目
npm init -y

# 安装Express
npm install express

# 安装开发依赖
npm install -D nodemon
```

## 快速开始：Hello World

### 基础服务器
```javascript
// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 路由定义
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express!</h1>');
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
```

### 运行服务器
```json
// package.json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

```bash
npm run dev
```

## 路由系统详解

### 基础路由
```javascript
// GET请求
app.get('/', (req, res) => {
    res.send('首页');
});

// POST请求
app.post('/users', (req, res) => {
    res.send('创建用户');
});

// PUT请求
app.put('/users/:id', (req, res) => {
    res.send(`更新用户 ${req.params.id}`);
});

// DELETE请求
app.delete('/users/:id', (req, res) => {
    res.send(`删除用户 ${req.params.id}`);
});
```

### 路由参数
```javascript
// 路径参数
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`用户ID: ${userId}`);
});

// 查询参数
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`搜索关键词: ${query}`);
});

// 正则表达式路由
app.get(/.*fly$/, (req, res) => {
    res.send('匹配以fly结尾的路径');
});
```

### 路由分组
```javascript
// 用户相关路由
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
    res.send('用户列表');
});

userRoutes.get('/:id', (req, res) => {
    res.send(`用户详情: ${req.params.id}`);
});

userRoutes.post('/', (req, res) => {
    res.send('创建用户');
});

// 使用路由分组
app.use('/users', userRoutes);
```

## 中间件机制

### 什么是中间件？
中间件是Express的核心概念，它是一个函数，可以访问请求对象（req）、响应对象（res）和下一个中间件函数（next）。

### 内置中间件
```javascript
// 解析JSON请求体
app.use(express.json());

// 解析URL编码请求体
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 日志中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
```

### 自定义中间件
```javascript
// 请求日志中间件
const logger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    });

    next();
};

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
};

// 使用中间件
app.use(logger);
app.use(errorHandler);
```

### 第三方中间件
```javascript
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// 跨域支持
app.use(cors());

// HTTP请求日志
app.use(morgan('combined'));

// 安全头部设置
app.use(helmet());

// 请求体解析
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

## 请求和响应处理

### 请求对象（req）
```javascript
app.get('/demo', (req, res) => {
    // 路径参数
    console.log(req.params);

    // 查询参数
    console.log(req.query);

    // 请求头
    console.log(req.headers);

    // 请求体
    console.log(req.body);

    // 请求方法
    console.log(req.method);

    // 请求路径
    console.log(req.path);

    // 请求主机
    console.log(req.hostname);

    res.send('请求信息已打印');
});
```

### 响应对象（res）
```javascript
app.get('/response', (req, res) => {
    // 发送文本
    res.send('Hello World');

    // 发送JSON
    res.json({ name: '张三', age: 25 });

    // 发送状态码
    res.status(200).send('OK');
    res.status(404).send('Not Found');

    // 重定向
    res.redirect('/login');

    // 发送文件
    res.sendFile(__dirname + '/index.html');

    // 发送HTML
    res.send('<h1>Hello HTML</h1>');
});
```

## 模板引擎

### 使用EJS模板引擎
```javascript
// 安装EJS
npm install ejs

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');

// 渲染模板
app.get('/', (req, res) => {
    res.render('index', {
        title: '首页',
        user: { name: '张三', age: 25 }
    });
});
```

### EJS模板示例
```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1>欢迎，<%= user.name %>!</h1>
    <p>年龄：<%= user.age %></p>

    <% if (user.age >= 18) { %>
        <p>成年人</p>
    <% } else { %>
        <p>未成年人</p>
    <% } %>

    <ul>
        <% for (let i = 0; i < 5; i++) { %>
            <li>项目 <%= i %></li>
        <% } %>
    </ul>
</body>
</html>
```

## 数据库集成

### 使用MongoDB和Mongoose
```javascript
// 安装Mongoose
npm install mongoose

// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 定义数据模型
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

// 在路由中使用
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
```

### 使用MySQL和Sequelize
```javascript
// 安装Sequelize
npm install sequelize mysql2

// 初始化Sequelize
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('myapp', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// 定义模型
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

// 同步数据库
sequelize.sync();

// 在路由中使用
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

## 身份验证

### JWT身份验证
```javascript
// 安装JWT相关包
npm install jsonwebtoken bcryptjs

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 用户注册
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 保存用户到数据库
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: '注册成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 用户登录
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 查找用户
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: '用户不存在' });
        }

        // 验证密码
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: '密码错误' });
        }

        // 生成JWT令牌
        const token = jwt.sign(
            { userId: user._id },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 身份验证中间件
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: '需要访问令牌' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: '令牌无效' });
        }
        req.user = user;
        next();
    });
};

// 受保护的路由
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: '这是受保护的路由', user: req.user });
});
```

## 文件上传

### 使用Multer处理文件上传
```javascript
// 安装Multer
npm install multer

const multer = require('multer');

// 配置存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 单文件上传
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: '没有上传文件' });
    }
    res.json({ message: '文件上传成功', file: req.file });
});

// 多文件上传
app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: '没有上传文件' });
    }
    res.json({ message: '文件上传成功', files: req.files });
});
```

## 错误处理

### 404错误处理
```javascript
// 404处理中间件
app.use((req, res, next) => {
    res.status(404).json({
        message: '页面不存在',
        path: req.path,
        method: req.method
    });
});
```

### 全局错误处理
```javascript
// 全局错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);

    // 开发环境返回详细错误
    if (process.env.NODE_ENV === 'development') {
        res.status(500).json({
            message: '服务器内部错误',
            error: err.message,
            stack: err.stack
        });
    } else {
        // 生产环境返回简单错误
        res.status(500).json({
            message: '服务器内部错误',
            error: {}
        });
    }
});
```

## 实战项目：构建RESTful API

### 项目结构
```
express-api/
├── app.js
├── package.json
├── models/
│   └── User.js
├── routes/
│   ├── users.js
│   └── auth.js
├── middleware/
│   └── auth.js
└── controllers/
    └── userController.js
```

### 完整的用户管理API
```javascript
// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '服务器内部错误' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;

// controllers/userController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ... 其他控制器方法
```

## 性能优化

### 使用压缩
```javascript
const compression = require('compression');
app.use(compression());
```

### 启用缓存
```javascript
const apicache = require('apicache');
const cache = apicache.middleware;

app.get('/api/users', cache('10 minutes'), userController.getAllUsers);
```

### 连接池
```javascript
// 数据库连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
});
```

## 测试Express应用

### 使用Jest测试
```javascript
// 安装测试依赖
npm install -D jest supertest

// tests/user.test.js
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    test('GET /api/users', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/users', async () => {
        const newUser = {
            name: '测试用户',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);

        expect(response.body.name).toBe(newUser.name);
    });
});
```

## 部署Express应用

### 使用PM2部署
```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start app.js --name "my-express-app"

# 查看状态
pm2 status

# 重启应用
pm2 restart my-express-app

# 停止应用
pm2 stop my-express-app
```

### 使用Docker部署
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## 常见问题解答

### Q: 如何处理CORS跨域问题？
A: 使用`cors`中间件：
```javascript
const cors = require('cors');
app.use(cors());
```

### Q: 如何处理大量并发请求？
A: 使用集群模式、负载均衡、数据库连接池等方式提升性能。

### Q: 如何保护API安全？
A: 使用HTTPS、JWT身份验证、输入验证、速率限制等安全措施。

## 总结

通过本文的学习，你已经掌握了：

1. Express框架的核心概念和架构
2. 路由系统的使用和配置
3. 中间件机制和自定义中间件
4. 模板引擎的使用
5. 数据库集成
6. 身份验证和授权
7. 文件上传处理
8. 错误处理和性能优化
9. 测试和部署

Express是一个功能强大且灵活的框架，掌握它将让你能够构建各种类型的Web应用。下一步，我们将学习前端工程化工具，构建完整的开发流程。

---

**扩展阅读：**
- [Express官方文档](https://expressjs.com/)
- [Express最佳实践](https://github.com/goldbergyoni/nodebestpractices#-2-express-best-practices)
- [RESTful API设计指南](https://restfulapi.net/)

**练习项目：**
1. 构建一个完整的博客系统
2. 开发一个电商网站后端API
3. 创建一个实时聊天应用