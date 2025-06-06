const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function randomColor() {
  const r = Math.floor(Math.random() * 155 + 100);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 155 + 100);
  return `rgb(${r}, ${g}, ${b})`;
}

function createHeart() {
  const x = Math.random() * canvas.width;
  const y = canvas.height + 20;
  const size = Math.random() * 10 + 10;
  const speed = Math.random() * 2 + 1;
  const color = randomColor();
  hearts.push({x, y, size, speed, color});
}

function drawHeart(h) {
  ctx.save();
  ctx.translate(h.x, h.y);
  ctx.scale(h.size / 30, h.size / 30);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
  ctx.bezierCurveTo(-35, -15, -35, 10, -35, 10);
  ctx.bezierCurveTo(-35, 25, -15, 40, 0, 50);
  ctx.bezierCurveTo(15, 40, 35, 25, 35, 10);
  ctx.bezierCurveTo(35, 10, 35, -15, 15, -15);
  ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = h.color;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let h of hearts) {
    h.y -= h.speed;
    drawHeart(h);
  }

  hearts = hearts.filter(h => h.y + h.size > 0);

  requestAnimationFrame(animate);
}

setInterval(createHeart, 100);
animate();
