// Obtención del canvas y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamaño del canvas
canvas.width = 800;
canvas.height = 600;

// Variables del juego
let spaceshipX = canvas.width / 2 - 25;
let spaceshipY = canvas.height - 60;
const spaceshipWidth = 50;
const spaceshipHeight = 50;
const spaceshipSpeed = 5;
let leftArrowPressed = false;
let rightArrowPressed = false;
let spaceBarPressed = false;
let bullets = [];
let invaders = [];
let invaderSpeed = 0.2;

// Función para dibujar la nave espacial
function drawSpaceship() {
    ctx.fillStyle = 'white';
    ctx.fillRect(spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}

// Función para dibujar las balas
function drawBullets() {
    ctx.fillStyle = 'yellow';
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillRect(bullets[i].x, bullets[i].y, 5, 15);
        bullets[i].y -= 5; // Velocidad de las balas
    }
    bullets = bullets.filter(bullet => bullet.y > 0); // Eliminar balas fuera de la pantalla
}

// Función para dibujar los invasores
function drawInvaders() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < invaders.length; i++) {
        ctx.fillRect(invaders[i].x, invaders[i].y, 40, 40);
        invaders[i].y += invaderSpeed; // Velocidad de caída de los invasores
    }

    // Eliminar invasores que han salido de la pantalla
    invaders = invaders.filter(invader => invader.y < canvas.height);
}

// Función para mover la nave
function moveSpaceship() {
    if (leftArrowPressed && spaceshipX > 0) {
        spaceshipX -= spaceshipSpeed;
    }
    if (rightArrowPressed && spaceshipX + spaceshipWidth < canvas.width) {
        spaceshipX += spaceshipSpeed;
    }
}

// Función para disparar
function shootBullet() {
    if (spaceBarPressed) {
        bullets.push({ x: spaceshipX + spaceshipWidth / 2 - 2.5, y: spaceshipY });
        spaceBarPressed = false;
    }
}

// Función para detectar colisiones entre las balas y los invasores
function detectCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < invaders.length; j++) {
            if (
                bullets[i].x < invaders[j].x + 40 &&
                bullets[i].x + 5 > invaders[j].x &&
                bullets[i].y < invaders[j].y + 40 &&
                bullets[i].y + 15 > invaders[j].y
            ) {
                // Eliminar bala e invasor
                bullets.splice(i, 1);
                invaders.splice(j, 1);
                i--;
                break;
            }
        }
    }
}

// Función para actualizar el juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSpaceship();
    shootBullet();
    drawSpaceship();
    drawBullets();
    drawInvaders();
    detectCollisions();

    requestAnimationFrame(updateGame);
}

// Función para manejar las teclas presionadas
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        leftArrowPressed = true;
    }
    if (e.key === 'ArrowRight') {
        rightArrowPressed = true;
    }
    if (e.key === ' ') {
        spaceBarPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        leftArrowPressed = false;
    }
    if (e.key === 'ArrowRight') {
        rightArrowPressed = false;
    }
});

// Función para crear los invasores
function createInvaders() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
            invaders.push({
                x: col * 60 + 50,
                y: row * 50 + 50
            });
        }
    }
}

// Iniciar el juego
createInvaders();
updateGame();
