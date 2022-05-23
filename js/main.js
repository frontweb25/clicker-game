
const $start = document.querySelector('#start');
const $gameBg = document.querySelector('#game');
const $time = document.querySelector('#time');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $scoreResult = document.querySelector('#result');
const $gameTime = document.querySelector('#game-time');

let score = 0; //счетчик результата
let isGameStarter = false; //игра не запцущена

$start.addEventListener('click', startGame); 
$gameBg.addEventListener('click', handelBoxClick);
$gameTime.addEventListener('input', setGameTime);


function hide($el) { // фуекция скрытия элемента
    $el.classList.add('hide');
}

function show($el) { // функция показа элемента
    $el.classList.remove('hide');
}

function startGame(){  // начало игры
    score = 0;
    $gameTime.setAttribute('disabled', true); // блокируем инпут
    setGameTime(); // запуск функции дефолтного значения 
    isGameStarter = true; // игра запущена
    hide($start); //скрытие кнопки старт
    $gameBg.style.background = '#fff'; // изминение  цвета фона  

    const interval = setInterval(function() {
        let time = parseFloat($time.innerHTML);
        if(time <= 0) {
            // конец игры
           clearInterval(interval);
           endGame();
        } else {
            $time.innerHTML = (time - 0.1).toFixed(1);
            
        }
    }, 100);

    renderBox(); // запуск функции создания квадрата 
}



function setGameScore() {  // функция вывода результата
    $scoreResult.innerHTML = score; 
}

function setGameTime() { //функция дефолтного значения при запуске
    let time = +$gameTime.value; //получаем значение из инпута
    $time.innerHTML = time.toFixed(1); //выводим значение из инпута
    show($timeHeader); // показываем начало время игры 
    hide($resultHeader); // скрываем рузельтат игры
}

function endGame() {
    $gameTime.removeAttribute('disabled'); // включаем инпут
    isGameStarter = false; //игра не запущена клик по квадрату не работает
    hide($timeHeader); // скрываем начало игры
    show($resultHeader); // выводим текст о результате 
    setGameScore(); // выводим результат
    $start.classList.remove('hide');
    $gameBg.style.background = '#ccc';
    $gameBg.innerHTML = '';
}

function handelBoxClick(event) { // проверка по event на квадрат

    if(isGameStarter) { // если игра запущена тогда клик работает
        if(event.target.classList.contains('box-game')){
            score++; // счетчик
            renderBox(); // повторный запуск созданиея квадрата
        }
    }
    
}


function renderBox() { // генерируем квадрат
    $gameBg.innerHTML = ''; // очищение фона 
    const box = document.createElement('div'); // создаем див  
    const boxSize = getRandom(30, 70);  // получаем рандомное число
    const gameSize = $gameBg.getBoundingClientRect(); // получаем ширину и высоту поля $gameBg;
    const maxTop = gameSize.height - boxSize; // от высоты минусуем рандомное число
    const maxLeft = gameSize.width - boxSize; // от ширины минусуем рандомное число

    box.style.height = box.style.width = boxSize + 'px'; // создаем рандомный квадрат 
    box.style.position = 'absolute';
    box.style.background = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`;
    box.style.cursor = 'pointer';
    box.style.top = getRandom(0, maxTop) + 'px'; // размещаем в рандомном месте
    box.style.left = getRandom(0, maxLeft) + 'px';// размещаем в рандомном месте
    // box.setAttribute('data-box', true);
    box.classList.add('box-game'); //бавляем класс квадрату

    $gameBg.append(box);
    
}

//функция получения случайного числа
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}