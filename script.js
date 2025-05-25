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


// Fireworks particles
let particles = [];

function createFirework(x, y) {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      radius: Math.random() * 2 + 1,
      color: color,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1
    });
  }
}

function drawFireworks() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
    ctx.fill();
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.02;
  }
  particles = particles.filter(p => p.alpha > 0);
}

canvas.addEventListener("click", function(event) {
  createFirework(event.clientX, event.clientY);
});

function animate() {
  draw();
  drawFireworks();
  requestAnimationFrame(animate);
}

animate();


const fireAudio = document.getElementById("fireAudio");

canvas.addEventListener("click", function(event) {
  createFirework(event.clientX, event.clientY);
  if (fireAudio) {
    fireAudio.currentTime = 0;
    fireAudio.play();
  }
});

// авто-феєрверки кожні 2 секунди
setInterval(() => {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height / 2;
  createFirework(x, y);
  if (fireAudio) {
    fireAudio.currentTime = 0;
    fireAudio.play();
  }
}, 2000);
