const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

let text = document.getElementById("textInput").value;
let color = document.getElementById("colorInput").value;

document.getElementById("textInput").addEventListener("input", () => {
  text = document.getElementById("textInput").value;
});
document.getElementById("colorInput").addEventListener("input", () => {
  color = document.getElementById("colorInput").value;
});

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = color;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let char = text[Math.floor(Math.random() * text.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 50);
