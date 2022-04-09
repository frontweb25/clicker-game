
const $start = document.querySelector('#start');
const $bgGame = document.querySelector('#game');

$start.addEventListener('click', startGame);

function startGame() {
    $start.classList.add('hide');
    $bgGame.style.backgroundColor = '#fff';

    renderBox();
}

function renderBox() {
    
}