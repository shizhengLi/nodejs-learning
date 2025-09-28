const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 治愈系文字和图片数据
const healingData = [
  {
    id: 1,
    text: "阳光明媚",
    image: "/images/sunshine.jpg",
    category: "nature",
    author: "自然之美",
    source: "描述风景的美好"
  },
  {
    id: 2,
    text: "温暖如春",
    image: "/images/spring.jpg",
    category: "nature",
    author: "季节诗语",
    source: "形容春天的温暖"
  },
  {
    id: 3,
    text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。",
    image: "/images/forest.jpg",
    category: "wisdom",
    author: "阿甘正传",
    source: "电影《阿甘正传》台词"
  },
  {
    id: 4,
    text: "花开富贵",
    image: "/images/flowers.jpg",
    category: "nature",
    author: "中国传统祝福",
    source: "寓意吉祥如意"
  },
  {
    id: 5,
    text: "海阔天空",
    image: "/images/ocean.jpg",
    category: "nature",
    author: "Beyond乐队",
    source: "歌曲《海阔天空》"
  },
  {
    id: 6,
    text: "星空璀璨",
    image: "/images/stars.jpg",
    category: "night",
    author: "星空诗人",
    source: "形容星空的美丽"
  },
  {
    id: 7,
    text: "山重水复疑无路，柳暗花明又一村。",
    image: "/images/mountain.jpg",
    category: "wisdom",
    author: "陆游",
    source: "《游山西村》"
  },
  {
    id: 8,
    text: "人生如逆旅，我亦是行人。",
    image: "/images/butterfly.jpg",
    category: "wisdom",
    author: "苏轼",
    source: "《临江仙·送钱穆父》"
  },
  {
    id: 9,
    text: "落红不是无情物，化作春泥更护花。",
    image: "/images/lotus.jpg",
    category: "wisdom",
    author: "龚自珍",
    source: "《己亥杂诗》"
  },
  {
    id: 10,
    text: "不经历风雨，怎能见彩虹。",
    image: "/images/rainbow.jpg",
    category: "inspiration",
    author: "真心英雄",
    source: "歌曲《真心英雄》"
  },
  {
    id: 11,
    text: "今天永远是明天到来前最美好的一天。",
    image: "/images/sunset.jpg",
    category: "inspiration",
    author: "匿名",
    source: "治愈系语录"
  },
  {
    id: 12,
    text: "愿你走出半生，归来仍是少年。",
    image: "/images/peace.jpg",
    category: "wisdom",
    author: "网络热语",
    source: "对青春的美好祝愿"
  }
];

// API路由
app.get('/api/healing-texts', (req, res) => {
  res.json(healingData);
});

app.get('/api/healing-texts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = healingData.find(item => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: '未找到相关内容' });
  }
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(healingData.map(item => item.category))];
  res.json(categories);
});

// 创建必要的目录
const createDirectories = () => {
  const dirs = ['public', 'public/images', 'public/css', 'public/js'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createDirectories();

app.listen(PORT, () => {
  console.log(`治愈系图片系统运行在 http://localhost:${PORT}`);
});