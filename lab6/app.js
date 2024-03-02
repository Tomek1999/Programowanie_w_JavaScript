let canvas;
let ctx;

// pobranie uchwytu do elem. canvas
canvas = document.getElementById("lab6");

// pobranie 'kontekstu' 2d za pomocą którego będziemy rysować
if (!canvas.getContext) {
  throw new Error("Brak f. canvas.getContext");
}
ctx = canvas.getContext("2d");

const balls = [];
const ballsCount = 250;

let animationId;
let distanceBetweenBalls = 80;

function getRandomSpeed() {
  return Math.random() * 4;
}

function createNewBalls() {
  for (let i = 0; i < ballsCount; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 6,
      speedX: getRandomSpeed(),
      speedY: getRandomSpeed(),
    });
  }
}

function startAnimation() {
  if (!animationId) {
    animationId = requestAnimationFrame(animation);
  }
}

function resetAnimation() {
  cancelAnimationFrame(animationId);
  animationId = null;
  balls.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createNewBalls();
}

function animation() {
  createNewBalls();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballsCount; i++) {
    const ball = balls[i];
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.speedX *= -1;
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.speedY *= -1;
    }

    for (let j = i + 1; j < ballsCount; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt(
        (ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2
      );

      if (distance < distanceBetweenBalls) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(otherBall.x, otherBall.y);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  animationId = requestAnimationFrame(animation);
}
