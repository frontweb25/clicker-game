
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
    box.style.height = box.style.width = '50px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#000';
    box.style.top = '50px';
    box.style.left = '70px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', true);

    $bgGame.insertAdjacentElement("afterbegin", box);
    // $bgGame.append(box);
}
