const gameState = {
    money: 0,
    fruitTypes: ['apple', 'orange', 'pear'],
    fruitValues: {
        apple: 5,
        orange: 8,
        pear: 10
    },
    maxFruits: 15
};

const moneyCount = document.getElementById('money-count');
const fruitsContainer = document.getElementById('fruits-container');

function initGame() {
  updateMoneyDisplay();generateFruits();
}

function updateMoneyDisplay() {
    moneyCount.textContent = gameState.money;
}

function getRandomPosition() {
    const minX = 200;
    const maxX = 600;
    const minY = 100;
    const maxY = 450;
    return {
        x: Math.floor(Math.random() * (maxX - minX) + minX),
        y: Math.floor(Math.random() * (maxY - minY) + minY)
    };
}

function generateFruits() {
    fruitsContainer.innerHTML = '';
    console.log("正在生成" + gameState.maxFruits + "个果子");

    for (let i = 0; i < gameState.maxFruits; i++) {
        const position = getRandomPosition();
        const fruitType = gameState.fruitTypes[Math.floor(Math.random() * gameState.fruitTypes.length)];

        const fruit = document.createElement('div');
        fruit.className = `fruit ${fruitType}`;
        fruit.style.left = `${position.x}px`;
        fruit.style.top = `${position.y}px`;

        fruit.addEventListener('click', () => {
            pickFruit(fruit, fruitType);
        });

        fruitsContainer.appendChild(fruit);
        console.log(`已添加${fruitType}果子在位置(${position.x}, ${position.y})`);
    }
}

function pickFruit(fruitElement, fruitType) {
    const value = gameState.fruitValues[fruitType];
    gameState.money += value;
    updateMoneyDisplay();

    fruitElement.remove();
    if (fruitsContainer.children.length === 0) {
        setTimeout(generateFruits, 1000);
}
}

document.addEventListener('DOMContentLoaded', function() {
    const moneyCount = document.getElementById('money-count');
    const fruitsContainer = document.getElementById('fruits-container');

    if (!moneyCount || !fruitsContainer) {
        console.error('找不到必要的DOM元素!');
        return;
    }

    console.log('DOM元素已找到，初始化游戏');
    initGame();
});
