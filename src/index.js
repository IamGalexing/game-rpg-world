import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

window.addEventListener('load', async () => {
  const world = await fetch(
    'https://jsmarathonpro.herokuapp.com/api/v1/world',
  ).then((res) => res.json());
  const sprites = await fetch(
    'https://jsmarathonpro.herokuapp.com/api/v1/sprites',
  ).then((res) => res.json());
  const gameObjects = await fetch(
    'https://jsmarathonpro.herokuapp.com/api/v1/gameObjects',
  ).then((res) => res.json());

  const socket = io('https://jsprochat.herokuapp.com');

  const startGameBlock = document.querySelector('.start-game');
  const nameForm = document.querySelector('#nameForm');
  const nameInput = document.querySelector('#name');

  const chatWrap = document.querySelector('.chat-wrap');
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const message = document.querySelector('.message');

  startGameBlock.style.display = 'flex';

  function startGame(e) {
    e.preventDefault();

    if (nameInput.value) {
      ClientGame.init({
        tagId: 'game',
        playerName: nameInput.value || 'troll',
        world,
        sprites,
        gameObjects,
        apiCfg: {
          url: 'https://jsmarathonpro.herokuapp.com/',
          path: '/game',
        },
      });

      socket.emit('start', nameInput.value);

      nameForm.removeEventListener('submit', startGame);
      startGameBlock.remove();
      chatWrap.style.display = 'block';
    }
  }

  nameForm.addEventListener('submit', startGame);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat connection', (data) => {
    message.insertAdjacentHTML(
      'beforeend',
      `<p><span class="time">${getTime(
        data.time,
      )} </span><span class="toOnline"> ${data.msg}</span></p>`,
    );
  });

  socket.on('chat disconnect', (data) => {
    if (data.msg.includes('undefined')) return;
    message.insertAdjacentHTML(
      'beforeend',
      `<p><span class="time">${getTime(
        data.time,
      )}  </span><span class="toOffline"> ${data.msg}</span></p>`,
    );
  });

  socket.on('chat message', (data) => {
    message.insertAdjacentHTML(
      'beforeend',
      `<p><span class="time">${getTime(
        data.time,
      )}  </span><strong class="sender"> ${data.name}:</strong> ${
        data.msg
      }</p>`,
    );
  });
});

//! How to drow map on canvas
// import terrainAtlas from './assets/terrain.png';
// import worldCfg from './configs/world.json';
// import sprites from './configs/sprites';

// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');

// const heroW = 48;
// const heroH = 48;

// const terrain = document.createElement('img');
// terrain.src = terrainAtlas;

// terrain.addEventListener('load', () => {
//   const { map } = worldCfg;
//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgCell, x) => {
//       const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
//       ctx.drawImage(
//         terrain,
//         sX,
//         sY,
//         sW,
//         sH,
//         x * heroW,
//         y * heroH,
//         heroW,
//         heroH,
//       );
//     });
//   });
// });

//! Make hero walk with setInterval
// import Hero from './assets/main-character.png';

// const gameField = document.querySelector('.canvas-wrap');
// const loadingTag = document.querySelector('.canvas-wrap h3');

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

//! Methods how to draw in canvas
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
