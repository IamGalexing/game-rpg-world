import './index.scss';
import Hero from './assets/main-character.png';

const gameField = document.querySelector('.canvas-wrap');
const loadingTag = document.querySelector('.canvas-wrap h3');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const imgHero = document.createElement('img');
imgHero.src = Hero;
const heroW = 48;
const heroH = 48;
let profileHero = 0;

const shots = 3;
let cycle = 0;
let keyPressed = null;
let pX = (canvas.clientWidth - heroW) / 2;
let pY = (canvas.clientHeight - heroH) / 2;
let prevX = pX;
let prevY = pY;

ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
ctx.fillStyle = 'green';
ctx.fill();
ctx.stroke();

let interval;
let isIntervalRun = false;

function startInterval() {
  isIntervalRun = true;
  interval = setInterval(() => {
    switch (keyPressed) {
      case 40:
        if (pY <= 540) {
          [prevX, prevY] = [pX, pY];
          pY += 10;
          cycle = (cycle + 1) % shots;
        }
        break;
      case 38:
        if (pY >= 10) {
          [prevX, prevY] = [pX, pY];
          pY -= 10;
          cycle = (cycle + 1) % shots;
        }
        break;
      case 37:
        if (pX >= 0) {
          [prevX, prevY] = [pX, pY];
          pX -= 10;
          cycle = (cycle + 1) % shots;
        }
        break;
      case 39:
        if (pX <= 560) {
          [prevX, prevY] = [pX, pY];
          pX += 10;
          cycle = (cycle + 1) % shots;
        }
        break;
      default:
        break;
    }
    ctx.clearRect(prevX, prevY, heroW, heroH);
    ctx.drawImage(
      imgHero,
      cycle * heroW,
      profileHero,
      heroW,
      heroH,
      pX,
      pY,
      heroW,
      heroH,
    );
  }, 100);
}

function stopInterval() {
  isIntervalRun = false;
  clearInterval(interval);
}

function keyDownHandler(evt) {
  evt.preventDefault();
  const { keyCode } = evt;
  if (!isIntervalRun) startInterval();
  switch (keyCode) {
    case 40:
      keyPressed = 40;
      profileHero = 0;
      break;
    case 38:
      keyPressed = 38;
      profileHero = 144;
      break;
    case 37:
      keyPressed = 37;
      profileHero = 48;
      break;
    case 39:
      keyPressed = 39;
      profileHero = 96;
      break;
    default:
      keyPressed = keyCode;
  }
}

function keyUpHandler(evt) {
  evt.preventDefault();
  if (isIntervalRun) stopInterval();
  keyPressed = null;
}

imgHero.addEventListener('load', () => {
  gameField.style.backgroundColor = '#3A8355';
  loadingTag.style.display = 'none';
  ctx.drawImage(
    imgHero,
    cycle * heroW,
    profileHero,
    heroW,
    heroH,
    pX,
    pY,
    heroW,
    heroH,
  );
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
});
// ctx.strokeStyle = 'red';
// ctx.lineWidht = 5;
// ctx.strokeRect(20, 20, 200, 100);

// ctx.fillStyle = 'white';
// ctx.fillRect(500, 500, 150, 300);

// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(500, 100);

// ctx.strokeStyle = 'black';
// ctx.lineWidth = 2;
// ctx.stroke();

// ctx.moveTo(100, 500);
// ctx.lineTo(500, 500);
// ctx.strokeStyle = 'black';
// ctx.lineWidth = 2;
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(100, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 200);
// ctx.lineTo(50, 50);
