// 1)создать переменную $start и подкючить кнопку 
// 2)создать переменную $bgGame и подключить тело квадрата
// 3)создать переменную $time и подключить время

//4) создать функцию startGame 
//5) при клике на $start она должна скрываться и меняться background $bgGame 
//6) создать функцию renderBox 
//7) внутрь renderBox создать квадрат 50px. позиционировать его.изменить цвет
// задать top 50 left 70  квадрату. добавить квадрат на страницу 
//8) создать функию handelBoxClick повесить слушателя addEventListener 
//9) сделать деоегирование событий для $bgGame внуцтри функции handelBoxClick
// dataset.box подсказка 
//10) создать переменную score = 0 и поместить в handelBoxClick 
//должна запускаться renderBox
//11) $bgGame.innerHTML = '' добавить в renderBox
//12)создать функцию getRandom(min, max) возвращает 
//Math.floor(Math.random() * (max - min) + min)
//13) в renderBox создать переменную boxSize и присвоить getRandom()
//14) присвоить boxSize квадрату box
//15) в функции renderBox создать переменную gameSize 
// и присвоить ей $bgGame.getBoundingClientRect();
//создать переменную maxTop = gameSize.height - boxSize
// top и left = присвозить getRandom(0, maxTop) + px
//16) в startGame создать переменную interval с SetInterval
//создать переменную time и присвоитm parseFloat($time.textContent)
//если time <=0 тогда конец игры если нет то $time.textContent = time - 0.1
//создать функцию endGame
//создать переменную isGameStarted cо значение false
//в переменную startGame поместить переменную isGameStarted = true
//в handelBoxClick сделать проверку если игра не !isGameStarted тогда return


const $start = document.querySelector('#start');
const $bgGame = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');

const colors = ['#FF0000', '#FF1493', '#9370DB', '#0000FF', '#FFDEAD', '#00FF00', '#00FFFF', '#40E0D0', '#00FFFF'];
let score = 0;
let isGameStarted = false;


$start.addEventListener('click', startGame);
$bgGame.addEventListener('click', handelBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide');
}

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', true);
    

    isGameStarted = true;
    hide($start);
    $bgGame.style.backgroundColor = '#fff';
    const interval = setInterval(function() {
        const time = parseFloat($time.textContent);
        if(time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');

    show($start);
    $bgGame.style.backgroundColor = '#ccc';
    $bgGame.innerHTML = '';
    hide($timeHeader);
    show($resultHeader);
    
}

function renderBox() {
    $bgGame.innerHTML = '';
    const box = document.createElement('div');
    const boxSize = getRandom(30, 70);
    const gameSize = $bgGame.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;
    const randomColorIndex = getRandom(0, colors.length);

    box.style.height = box.style.width = boxSize + 'px';
    box.style.background = colors[randomColorIndex];
    box.style.cursor = 'pointer';
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.setAttribute('data-box', true);
    $bgGame.append(box);
    
}

function handelBoxClick(event) {
    if(!isGameStarted) {
        return;
    }
    if(event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

