const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const operationDisplay = document.getElementById("operation");

let snake = [{ x: 200, y: 200 }];
let dx = 20, dy = 0;
let answers = [];
let score = 0;
let correctAnswer = 0;
let gameInterval;
let speed = 150; // Velocidad inicial
let mode = "normal";

function strGame(selectedMode) {
    mode = selectedMode;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    rstGame();
    gameInterval = setInterval(moveSnake, speed);
}

function rstGame() {
    snake = [{ x: 200, y: 200 }];
    dx = 20; dy = 0;
    score = 0;
    speed = 150; // Velocidad inicial
    scoreDisplay.innerText = `Puntuación: ${score}`;
    generateMathOperation();
    drawSnake();
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
    // Dibujar las respuestas en el canvas
    drawAnswers();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Verificar si la serpiente choca con las paredes o consigo misma
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || checkCollision(head)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // Verificar si la serpiente comió una respuesta
    const answerIndex = checkIfSnakeAteAnswer(head);
    if (answerIndex !== -1) {
        if (answers[answerIndex].value === correctAnswer) {
            score++;
            scoreDisplay.innerText = `Puntuación: ${score}`;
            adjustDifficulty();  // Ajustar la dificultad según la puntuación
            generateMathOperation();  // Generar nueva operación
        } else {
            if (mode === "acortar") {
                // Disminuir la longitud de la serpiente y el puntaje
                snake.pop();
                score = Math.max(0, score - 1);
                scoreDisplay.innerText = `Puntuación: ${score}`;
                generateMathOperation();  // Generar nueva operación al comer respuesta incorrecta

                // Verificar si la serpiente se quedó sin segmentos o si el puntaje es 0
                if (snake.length === 0 || score === 0) {
                    endGame();
                    return;
                }
            } else {
                endGame();
                return;
            }
        }
    } else {
        snake.pop();
    }

    drawSnake();
}

function checkCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function generateMathOperation() {
    let num1, num2, incorrectAnswers;
    // Generar la operación matemática en función de la puntuación (dificultad)
    if (score < 6) {  // Nivel 1: Sumas
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        operationDisplay.innerText = `Operación: ${num1} + ${num2}`;
    } else if (score < 12) {  // Nivel 2: Restas
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * num1); // Para evitar negativos
        correctAnswer = num1 - num2;
        operationDisplay.innerText = `Operación: ${num1} - ${num2}`;
    } else if (score < 18) {  // Nivel 3: Multiplicación
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
        operationDisplay.innerText = `Operación: ${num1} x ${num2}`;
    } else {  // Nivel 4: División (solo resultados enteros)
        num1 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = Math.floor(Math.random() * 10) + 1;
        num2 = num1 * correctAnswer;
        operationDisplay.innerText = `Operación: ${num2} ÷ ${num1}`;
    }

    incorrectAnswers = [
        correctAnswer + Math.floor(Math.random() * 5 + 1),
        correctAnswer - Math.floor(Math.random() * 5 + 1)
    ];

    answers = [
        { x: randomPosition(), y: randomPosition(), value: correctAnswer },
        { x: randomPosition(), y: randomPosition(), value: incorrectAnswers[0] },
        { x: randomPosition(), y: randomPosition(), value: incorrectAnswers[1] }
    ];
}

function randomPosition() {
    return Math.floor(Math.random() * canvas.width / 20) * 20;
}

function drawAnswers() {
    answers.forEach(answer => {
        ctx.fillStyle = '#FF3B2F';
        ctx.fillRect(answer.x, answer.y, 20, 20);
        ctx.fillStyle = 'white';
        ctx.font = "17px Arial";
        ctx.fillText(answer.value, answer.x + 5, answer.y + 15);
    });
}

function checkIfSnakeAteAnswer(head) {
    for (let i = 0; i < answers.length; i++) {
        if (head.x === answers[i].x && head.y === answers[i].y) {
            return i;
        }
    }
    return -1;
}

function adjustDifficulty() {
    if (score % 6 === 0 && score > 0) {
        speed -= 20; // Aumentar la velocidad cada 6 puntos
        clearInterval(gameInterval);
        gameInterval = setInterval(moveSnake, speed); // Actualizar el intervalo
    }
}

function endGame() {
    clearInterval(gameInterval);
    alert(`Juego Terminado! Puntuación final: ${score}`);
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

// Controles de la serpiente
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            if (dy === 0) { dx = 0; dy = -20; }
            break;
        case "ArrowDown":
            if (dy === 0) { dx = 0; dy = 20; }
            break;
        case "ArrowLeft":
            if (dx === 0) { dx = -20; dy = 0; }
            break;
        case "ArrowRight":
            if (dx === 0) { dx = 20; dy = 0; }
            break;
    }
});