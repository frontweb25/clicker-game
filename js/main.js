
const $start = document.querySelector('#start');
const $bgGame = document.querySelector('#game');

let score = 0;

$start.addEventListener('click', startGame);
$bgGame.addEventListener('click', handelBoxClick);

function startGame() {
    $start.classList.add('hide');
    $bgGame.style.backgroundColor = '#fff';

    renderBox();
}


function handelBoxClick(event) {
    if(event.target.dataset.box) {
      score++;
      renderBox();
    }
}

function renderBox() {
    $bgGame.innerHTML = '';
    const box = document.createElement('div');
    const boxSize = getRandom(20, 80);
    const gameSize = $bgGame.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#000';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', true);

    $bgGame.insertAdjacentElement("afterbegin", box);
    // $bgGame.append(box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}