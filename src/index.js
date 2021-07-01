import './index.scss';

const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'red';
ctx.lineWidht = 5;
ctx.strokeRect(20, 20, 200, 100);
