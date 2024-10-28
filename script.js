const canvas =document.getElementById("canvasGame");
const ctx =canvas.getContext('2d');

// size of one snak segment
const box =20; 
let snake = [{x:9 *box, y:10 *box}];//initial snake position
let direction = 'RIGHT';//initial movement direction
//random food position
let food={
    x:Math.floor(Math.random()*19 +1)*box,
    y:Math.floor(Math.random()*19 +1)*box
}

let score =0;
let gameOver = false;
let game;

function initializeGame() {
    snake = [{x: 9 * box, y: 10 * box}];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    gameOver = false; // Reset the game 

    clearInterval(game);
    game = setInterval(create, 350);
}

//control the snake direction
document.addEventListener('keydown',snakeDirection);

function snakeDirection(event){
    if (event.keyCode===37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    }
    else if (event.keyCode===38 && direction !== 'DOWN'){
        direction='UP';
    }
    else if(event.keyCode===39 && direction !== 'LEFT'){
        direction= 'RIGHT';
    }    
    else if(event.keyCode===40 && direction !=='UP')
        direction = 'DOWN';  
}

// Working for drawing snake

function drawSnake(){
    for(let i=0 ; i<snake.length; i++){
        ctx.fillStyle =(i===0) ? 'purple':'plum';
        ctx.fillRect(snake[i].x, snake[i].y, box,box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}
//working for preparing snake food
function drawFood(){
    ctx.fillStyle = '  rgb(53, 167, 175)';
    ctx.fillRect(food.x, food.y, box,box);
}


function updateGame(){
    if (gameOver) return; // Skip update if the game is over

    let snakeX = snake[0].x ;
    let snakeY = snake[0].y;


//move snake in current direction

if(direction === 'LEFT') snakeX -= box;
if(direction === 'UP') snakeY -= box ;
if(direction ==='RIGHT') snakeX += box;
if(direction === 'DOWN') snakeY += box;

// check if snake eat food

if(snakeX === food.x && snakeY === food.y){
    score++;
    food ={
        x:Math.floor(Math.random()*19 +1)*box,
        y:Math.floor(Math.random()*19 +1)*box
        
    };//snake food regenerate

}
else{
    snake.pop();//removing of snake tail if food is  not eaten
}

//Add new head to tail of snake
let newHead ={
    x:snakeX,
    y:snakeY
};

//working to check if snake collaps with wall or itself

if(snakeX<0 || snakeY <0 || snakeX>=20 *box ||  snakeY >=20*box || collision(newHead , snake )){
    clearInterval(game);//game over
    gameOver = true; // Set game over

}

snake.unshift(newHead);//add new head
}

//collision checking

function collision(head, array){
    for (let i = 0; i<array.length; i++){
        if (head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

//Main game loop

function create(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    drawSnake();
    drawFood();
    updateGame();
    ctx.fillStyle = 'purple';
    ctx.font = ' 1.5rem monospace';
    ctx.fillText(`Score: ${score}`, box, box);

    // Display "Game Over" if the game is over
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '2rem monospace';
        ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    }
}