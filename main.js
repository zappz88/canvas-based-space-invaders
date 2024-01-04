import { Shape } from "./canvas/model/shape.js";
import { FillShape } from "./canvas/model/fillShape.js";
import { FillRect } from "./canvas/model/fillRect.js";
import { StrokeShape } from "./canvas/model/strokeShape.js";
import { StrokeRect } from "./canvas/model/strokeRect.js";
import { CollisionDetection } from "./canvas/model/collisionDetection/collisionDetection.js";
import { CollisionDetection2D } from "./canvas/model/collisionDetection/collisionDetection2D.js";
import { Point2D } from "./geometry/point2D.js";
import { CanvasCollisionDetection } from "./canvas/environment/canvasCollisionDetection.js";
import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";
import { KeyCode } from "./controls/keyCode.js";
import { KeyboardControlMap } from "./controls/keyboardControlMap.js";
import { Ship } from "./ship.js";
import { Laser } from "./laser.js";
import { Alien } from "./alien.js";

function animate(){

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ship.update();

    if(aliens.length > 0){
        for(let i = 0; i < aliens.length; i++){
            aliens[i].update();
        }
    }

    if(lasers.length > 0){
        for(let i = 0; i < lasers.length; i++){
            lasers[i].update();
            for(let j = 0; j < aliens.length; j++){
                if(lasers[i].isEnemyHit(aliens[j])){
                    aliens[j].clear();
                    lasers[i].clear();
                    aliens.splice(j , 1);	
                }
            }
        }
    }
}

function pauseGame(){
    paused = !paused;
}

function ShowWinnerScreen(winner){
    gameContainer.style.display = "none";
    winnerScreenContainer.innerHTML = `<h1>The winner is: ${winner}!!!</h1>`;
    winnerScreenContainer.style.display = "flex";
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const SHIP_XVELOCITY = 2;
var LAZER_YVELOCITY = 2;
var ALIEN_XVELOCITY = 2;
var ALIEN_YVELOCITY = 2;
var ALIEN_INCREMENTING_XVELOCITY = 0.1;
var ALIEN_INCREMENTING_YVELOCITY = 0.1;
var WINNING_SCORE = 10;
var paused = true;

const shipKeyBoardControlMap = new KeyboardControlMap(KeyCode.KeyW, KeyCode.KeyS, KeyCode.KeyA, KeyCode.KeyD, KeyCode.Space);
var ship = new Ship(ctx, ((canvas.width / 2) - 25), (canvas.height - 10), 0, 0, 10, 50, "#000000", shipKeyBoardControlMap);

const laser = new Laser(ctx, ((ship.x + ship.width) / 2), ship.y, 0, -2);

var aliens = [new Alien(ctx, 30, 0, 1, 1, 10, 20, "#000000"), new Alien(ctx, 0, 0, 1, 1, 10, 20, "#000000")];
var lasers = [laser];


var playerOneScore = 0;
const playerOneScoreBoard = document.querySelector("#playerOneScoreBoard");

// const startGameContainer = document.querySelector("#startGameContainer");
// const startButton = document.querySelector("#startButton");
// const winningScoreInputField = document.querySelector("#winningScoreInputField");
// const pongVelocityInputField = document.querySelector("#pongVelocityInputField");
// const pongSizeInputField = document.querySelector("#pongSizeInputField");
// const pongIncrementingXVelocityInputField = document.querySelector("#pongIncrementingXVelocityInputField");
// const pongIncrementingYVelocityInputField = document.querySelector("#pongIncrementingYVelocityInputField");
// const winningScoreField = document.querySelector("#winningScoreField");
const gameContainer = document.querySelector("#gameContainer");
const gameButtonContainer = document.querySelector("#gameButtonContainer");
const resetButton = document.querySelector("#resetButton");
const pauseButton = document.querySelector("#pauseButton");
const winnerScreenContainer = document.querySelector("#winnerScreenContainer");

// resetButton.addEventListener('click', (event) => {
    
//     setGame();
    
//     paddleOne.setX(0)
//              .setY((canvas.height - 50));
//     paddleTwo.setX((canvas.width - 10))
//              .setY((canvas.height - 50));
    
//     pong.setX((canvas.width / 2))
//         .setY((canvas.height / 2))
//         .setXVelocity(PONG_XVELOCITY)
//         .setYVelocity(PONG_YVELOCITY);

// }, false);

pauseButton.addEventListener('click', (event) => {
    
    pauseGame(paused);
    animate();

}, false);

// startButton.addEventListener('click', (event) => {
    
//     setGame();

//     startGameContainer.style.display = "none";
//     gameContainer.style.display = "flex";
//     gameButtonContainer.style.display = "flex";

//     setTimeout(() => { 
//         pauseGame(paused);
//         animate();
//     }, 1000)

// }, false);

function setGame(){
    // WINNING_SCORE = parseInt(winningScoreInputField.value) || WINNING_SCORE;
    // winningScoreField.innerText = WINNING_SCORE;
    // playerOneScore = 0;
    // playerOneScoreBoard.innerText = playerOneScore;
    // playerTwoScore = 0;
    // playerTwoScoreBoard.innerText = playerTwoScore;
    // PONG_XVELOCITY = randomIntegerSign() * (parseInt(pongVelocityInputField.value)) || PONG_XVELOCITY;
    // PONG_YVELOCITY = randomIntegerSign() * (parseInt(pongVelocityInputField.value)) || PONG_YVELOCITY;
    // PONG_SIZE = parseInt(pongSizeInputField.value) || PONG_SIZE;
    // PONG_INCREMENTING_XVELOCITY = parseInt(pongIncrementingXVelocityInputField.value) || PONG_INCREMENTING_XVELOCITY;
    // PONG_INCREMENTING_YVELOCITY = parseInt(pongIncrementingYVelocityInputField.value) || PONG_INCREMENTING_YVELOCITY;
    // pong.setSize(PONG_SIZE)
    //     .setXVelocity(PONG_XVELOCITY)
    //     .setYVelocity(PONG_YVELOCITY)
    //     .setIncrementingXVelocity(PONG_INCREMENTING_XVELOCITY)
    //     .setIncrementingYVelocity(PONG_INCREMENTING_YVELOCITY);
}

document.addEventListener('keydown', (event) => {
        
    ship.move(event, SHIP_XVELOCITY);
    const laser = ship.shootLaser(event);
    lasers.push(laser);

}, false);

document.addEventListener('keyup', (event) => {
    
    ship.stop(event);

}, false);
