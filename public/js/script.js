let healingData = [];
let currentCategory = 'all';

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    fetchHealingData();
    setupEventListeners();
});

// 获取治愈系数据
async function fetchHealingData() {
    try {
        const response = await fetch('/api/healing-texts');
        healingData = await response.json();
        displayHealingCards();
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 分类筛选按钮
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            displayHealingCards();
        });
    });

    // 模态框关闭
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 显示治愈系卡片
function displayHealingCards() {
    const grid = document.getElementById('healingGrid');
    grid.innerHTML = '';

    const filteredData = currentCategory === 'all'
        ? healingData
        : healingData.filter(item => item.category === currentCategory);

    filteredData.forEach(item => {
        const card = createHealingCard(item);
        grid.appendChild(card);
    });
}

// 创建治愈系卡片
function createHealingCard(item) {
    const card = document.createElement('div');
    card.className = 'healing-card';
    card.innerHTML = `
        <div class="healing-text">${item.text}</div>
        ${item.author ? `<div class="healing-author">— ${item.author}</div>` : ''}
        <div class="healing-category">${getCategoryName(item.category)}</div>
    `;

    card.addEventListener('click', () => showImageModal(item));
    return card;
}

// 获取分类中文名称
function getCategoryName(category) {
    const categoryNames = {
        'nature': '自然',
        'wisdom': '智慧',
        'inspiration': '励志',
        'peace': '宁静',
        'night': '夜晚'
    };
    return categoryNames[category] || category;
}

// 显示图片模态框
function showImageModal(item) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalText = document.getElementById('modalText');

    // 使用本地图片
    const imageUrl = getImageUrl(item);

    modalImage.src = imageUrl;
    modalText.innerHTML = `
        ${item.text}
        ${item.author ? `<br><small style="opacity: 0.8;">— ${item.author}</small>` : ''}
        ${item.source ? `<br><small style="opacity: 0.6; font-size: 0.8em;">${item.source}</small>` : ''}
    `;
    modal.style.display = 'block';

    // 图片加载失败处理
    modalImage.onerror = function() {
        this.src = 'https://picsum.photos/seed/' + item.id + '/800/600.jpg';
    };
}

// 获取图片URL
function getImageUrl(item) {
    // 使用本地图片
    return item.image;
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// 添加一些动画效果
function addAnimationEffects() {
    const cards = document.querySelectorAll('.healing-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// CSS动画类
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);