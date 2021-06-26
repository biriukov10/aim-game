const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time_list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', e => {
  e.preventDefault();
  screens[0].classList.add('up');
})

const setTime = val => {
  timer.innerHTML = `00:${val}`
}

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const createRandomCircle = _ => {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`; 
  board.append(circle);
}

const finishGame = _ => {
  timer.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

const decreaseTime = _ => {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time;

    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

const startGame = _ => {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});
