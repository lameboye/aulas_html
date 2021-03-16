let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
var contador = 0;
let jogo, cronometro;
var pontuacao = document.getElementById("pontuacao");
let snake = [];
snake [0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function criarBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawFood(){
    context.fillStyle = "#F78181" ;
    context.fillRect(food.x, food.y, box, box);
}

function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "#A9F5BC";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function iniciarJogo(){
    
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            pararjogo();
            alert("Game Over :( resete a página!");
        }
    }


    criarBG();
    criarCobrinha();
    drawFood();
    document.getElementById("iniciar").disabled = "disabled";
    document.getElementById("refresh").disabled = "";
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) { snake.pop(); }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        
        contador= contador + 10;
        pontuacao.innerHTML = contador;
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function iniciandojogo(){
    jogo = setInterval(iniciarJogo, 100);
    iniciarCronometro();
}

function pararjogo(){
    clearInterval(jogo);
    clearInterval(cronometro);
}

/* FUNÇÕES CRONOMETRO */

function iniciarCronometro(){

    var th = document.getElementById("th");
    var tm = document.getElementById("tm");
    var ts = document.getElementById("ts");
    var td = document.getElementById("td");

    var h = 0, m = 0, s = 0, d = 0;

    cronometro = setInterval(function () {
        th.innerHTML = h < 10 ? '0' + h : h;
        tm.innerHTML = m < 10 ? '0' + m : m;
        ts.innerHTML = s < 10 ? '0' + s : s;
        td.innerHTML = d < 10 ? '0' + d : d;

        if (d < 9 ){ d +=1; }
        else if (s < 59 ){ s +=1; d = 0; }
        else if (m < 59 ){ m +=1; d = 0; s = 0; }
        else if (h < 23 ){ h +=1; d = 0; s = 0; m = 0;}
        else { alert("Você atingiu o tempo máximo de jogo, por favor resete!");}
    }, 100);
}

