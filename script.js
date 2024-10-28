// Selección de elementos
const ball = document.querySelector('.ball');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');

// Dimensiones del campo de juego y velocidad de la pelota
const fieldWidth = 800; // Ancho del campo de juego actualizado
const fieldHeight = 600; // Alto del campo de juego actualizado
let ballSpeedX = 4;
let ballSpeedY = 4;

// Posiciones iniciales
let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;
let paddle1Y = fieldHeight / 2 - 40;
let paddle2Y = fieldHeight / 2 - 40;
let score1 = 0;
let score2 = 0;

// Movimiento de las paletas
document.addEventListener('keydown', (e) => {
  const paddleSpeed = 20;
  if (e.key === 'ArrowUp') {
    paddle2Y = Math.max(0, paddle2Y - paddleSpeed); // Limita dentro del campo
  } else if (e.key === 'ArrowDown') {
    paddle2Y = Math.min(fieldHeight - paddle2.offsetHeight, paddle2Y + paddleSpeed);
  } else if (e.key === 'a') {
    paddle1Y = Math.max(0, paddle1Y - paddleSpeed);
  } else if (e.key === 'z') {
    paddle1Y = Math.min(fieldHeight - paddle1.offsetHeight, paddle1Y + paddleSpeed);
  }
  paddle1.style.top = `${paddle1Y}px`;
  paddle2.style.top = `${paddle2Y}px`;
});

// Actualización del juego
function updateGame() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote en el borde superior e inferior
  if (ballY <= 0 || ballY >= fieldHeight - ball.offsetHeight) {
    ballSpeedY *= -1;
  }

  // Colisión con la paleta 1
  if (
    ballX <= paddle1.offsetWidth + 10 &&
    ballY + ball.offsetHeight >= paddle1Y &&
    ballY <= paddle1Y + paddle1.offsetHeight
  ) {
    ballSpeedX *= -1;
  }

  // Colisión con la paleta 2
  if (
    ballX >= fieldWidth - paddle2.offsetWidth - ball.offsetWidth - 10 &&
    ballY + ball.offsetHeight >= paddle2Y &&
    ballY <= paddle2Y + paddle2.offsetHeight
  ) {
    ballSpeedX *= -1;
  }

  // Si un jugador anota
  if (ballX <= 0) {
    score2++;
    resetBall();
  } else if (ballX >= fieldWidth - ball.offsetWidth) {
    score1++;
    resetBall();
  }

  // Actualización de la posición de la pelota y de los marcadores
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  score1Display.textContent = score1;
  score2Display.textContent = score2;

  requestAnimationFrame(updateGame);
}

// Función para reiniciar la pelota en el centro
function resetBall() {
  ballX = fieldWidth / 2;
  ballY = fieldHeight / 2;
  ballSpeedX *= -1;
  ballSpeedY = (Math.random() < 0.5 ? -4 : 4);
}

// Iniciar el juego
resetBall();
updateGame();
