const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fontSize = 16;
const characters =
  "アァカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let columns;
let drops;

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(0);
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillStyle = "#0F0";
    ctx.fillText(text, x, y);

    drops[i] = drops[i] + 1;

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", setup);

setup();
requestAnimationFrame(draw);
