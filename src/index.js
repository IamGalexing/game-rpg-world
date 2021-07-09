import './index.scss';
// import Hero from './assets/main-character.png';

import terrainAtlas from './assets/terrain.png';
import worldCfg from './configs/world.json';
import sprites from './configs/sprites';

// const gameField = document.querySelector('.canvas-wrap');
// const loadingTag = document.querySelector('.canvas-wrap h3');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const heroW = 48;
const heroH = 48;

const terrain = document.createElement('img');
terrain.src = terrainAtlas;

terrain.addEventListener('load', () => {
  const { map } = worldCfg;
  map.forEach((cfgRow, y) => {
    cfgRow.forEach((cfgCell, x) => {
      const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
      ctx.drawImage(
        terrain,
        sX,
        sY,
        sW,
        sH,
        x * heroW,
        y * heroH,
        heroW,
        heroH,
      );
    });
  });
});
// const imgHero = document.createElement('img');
// imgHero.src = Hero;
// let profileHero = 0;

// const shots = 3;
// let cycle = 0;
// let bottomPressed = false;
// let upPressed = false;
// let leftPressed = false;
// let rightPressed = false;
// let pX = 275;
// let pY = 270;
// let prevX = pX;
// let prevY = pY;

// ctx.strokeStyle = 'black';
// ctx.lineWidth = 1;
// ctx.fillStyle = 'green';

// ctx.fill();
// ctx.stroke();

// let interval;
// let isIntervalRun = false;

// function startInterval() {
//   isIntervalRun = true;
//   interval = setInterval(() => {
//     if (bottomPressed && pY <= 540) {
//       [prevX, prevY] = [pX, pY];
//       pY += 10;
//       cycle = (cycle + 1) % shots;
//     } else if (upPressed && pY >= 10) {
//       [prevX, prevY] = [pX, pY];
//       pY -= 10;
//       cycle = (cycle + 1) % shots;
//     } else if (leftPressed && pX >= 0) {
//       [prevX, prevY] = [pX, pY];
//       pX -= 10;
//       cycle = (cycle + 1) % shots;
//     } else if (rightPressed && pX <= 560) {
//       [prevX, prevY] = [pX, pY];
//       pX += 10;
//       cycle = (cycle + 1) % shots;
//     }
//     ctx.clearRect(prevX, prevY, 48, 48);
//     ctx.drawImage(
//       imgHero,
//       cycle * heroW,
//       profileHero,
//       heroW,
//       heroH,
//       pX,
//       pY,
//       48,
//       48,
//     );
//   }, 100);
// }

// function stopInterval() {
//   isIntervalRun = false;
//   clearInterval(interval);
// }

// function keyDownHandler(evt) {
//   evt.preventDefault();
//   const { keyCode } = evt;
//   if (!isIntervalRun) startInterval();
//   switch (keyCode) {
//     case 40:
//       bottomPressed = true;
//       profileHero = 0;
//       break;
//     case 38:
//       upPressed = true;
//       profileHero = 144;
//       break;
//     case 37:
//       leftPressed = true;
//       profileHero = 48;
//       break;
//     case 39:
//       rightPressed = true;
//       profileHero = 96;
//       break;
//     default:
//       break;
//   }
// }

// function keyUpHandler(evt) {
//   evt.preventDefault();
//   const { keyCode } = evt;
//   if (isIntervalRun) stopInterval();
//   switch (keyCode) {
//     case 40:
//       bottomPressed = false;
//       break;
//     case 38:
//       upPressed = false;
//       break;
//     case 37:
//       leftPressed = false;
//       break;
//     case 39:
//       rightPressed = false;
//       break;
//     default:
//       break;
//   }
// }

// imgHero.addEventListener('load', () => {
//   gameField.style.backgroundColor = '#3A8355';
//   loadingTag.style.display = 'none';
//   ctx.drawImage(
//     imgHero,
//     cycle * heroW,
//     profileHero,
//     heroW,
//     heroH,
//     pX,
//     pY,
//     48,
//     48,
//   );
//   document.addEventListener('keydown', keyDownHandler);
//   document.addEventListener('keyup', keyUpHandler);
// });

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
