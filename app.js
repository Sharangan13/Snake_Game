let scores=[0]

function SNAKEGAME(){
const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;




let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
];


const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const rightBtn = document.getElementById('rightBtn');
const leftBtn = document.getElementById('leftBtn');

upBtn.addEventListener('click', () => {
    changeDirection(0, -UNIT);
});

downBtn.addEventListener('click', () => {
    if (!started) {
        started = true;
        nextTick();
    }    changeDirection(0, UNIT);
});

rightBtn.addEventListener('click', () => {
    if (!started) {
        started = true;
        nextTick();
    }    changeDirection(UNIT, 0);
});

leftBtn.addEventListener('click', () => {
       changeDirection(-UNIT, 0);
});

window.addEventListener('keydown', keyPress);
startGame();

function startGame() {
    context.fillStyle = '#232D3F';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    displayFood();
    drawSnake();

}

function clearBoard() {
    context.fillStyle = '#232D3F';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function createFood() {
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT;
}

function displayFood() {
    context.fillStyle = 'Orange';
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake() {
    context.fillStyle = '#34ebd2';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 10;
        scoreText.textContent = score;
        createFood();
    } else snake.pop();
}

function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            touchSnakeBody();
            checkGameOver();
            nextTick();
        }, 200);
    } else if (!active) {
        clearBoard();
        context.font = 'bold 25px serif';
        context.textAlign = 'center';

       context.fillStyle = 'red';
       context.fillText('Game Over !!', WIDTH / 2, HEIGHT / 2 - 20);

       context.fillStyle = 'white';
       context.fillText(`Your Score is: ${score}`, WIDTH / 2, HEIGHT / 2 + 20);

       let showScore = document.getElementById('score');
       showScore.style.display = 'none';

       let tryAgainBtn = document.getElementById('tryAgainBtn');
       tryAgainBtn.style.display = 'block';


       scores.push(score);

       let maxValue=document.getElementById("maxScoreVal")
       maxValue.textContent=Math.max(...scores);
 

    }
}

function keyPress(event) {
    if (!started) {
        started = true;
        nextTick();
    }
    
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch (true) {
        case event.keyCode == LEFT && xVel != UNIT:
            xVel = -UNIT;
            yVel = 0;
            break;
        case event.keyCode == RIGHT && xVel != -UNIT:
            xVel = UNIT;
            yVel = 0;
            break;
        case event.keyCode == UP && yVel != UNIT:
            xVel = 0;
            yVel = -UNIT;
            break;
        case event.keyCode == DOWN && yVel != -UNIT:
            xVel = 0;
            yVel = UNIT;
            break;
    }
}

function changeDirection(newXVel, newYVel) {
    if (xVel !== -newXVel || yVel !== -newYVel) {
        xVel = newXVel;
        yVel = newYVel;
    }
}

function checkGameOver() {
    switch (true) {
        case snake[0].x < 0:
        case snake[0].x >= WIDTH:
        case snake[0].y < 0:
        case snake[0].y >= HEIGHT:
            active = false;
            break;
    }
}

function touchSnakeBody() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            active = false;
            break;
        }
    }
}


}

SNAKEGAME()

function tryAgain(){
    let tryAgainBtn = document.getElementById('tryAgainBtn');
       tryAgainBtn.style.display = 'none';

       let showScore = document.getElementById('score');
       showScore.style.display = 'block';

       
      let resetScore=document.getElementById("scoreVal")
      resetScore.textContent=0

       SNAKEGAME()
       
    

}
