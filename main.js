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
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    ship.update();

    if(aliens.length > 0){
        for(let i = 0; i < aliens.length; i++){
            aliens[i].update();
        }
    }
    else{
        generateAliens(ctx, ALIEN_COUNT);
    }

    if(lasers.length > 0){
        for(let i = 0; i < lasers.length; i++){
            lasers[i].update();
        }
    }

    if(lasers.length > 0){
        for(let i = 0; i < lasers.length; i++){
            if(aliens.length > 0){
                for(let j = 0; j < aliens.length; j++){
                    if(lasers[i].isEnemyHit(aliens[j])){
                        aliens[j].clear();
                        lasers[i].clear();
                        aliens.splice(j, 1);
                        lasers.splice(i, 1);
                        playerOneScore += 100;
                        playerOneScoreBoard.innerText = playerOneScore;	
                    }
                }
            }
            if(CanvasCollisionDetection2D.topCollisionDetected(lasers[i], ctx)){
                lasers[i].clear();
                lasers.splice(i, 1);
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
ctx.fillStyle = "#000000";

const SHIP_HEIGHT = 10;
const SHIP_WIDTH = 20;
const SHIP_XORIGIN = ((canvas.width / 2) - SHIP_WIDTH);
const SHIP_YORIGIN = (canvas.height - SHIP_HEIGHT);
const SHIP_XVELOCITY = 2;

const LAZER_HEIGHT = 5;
const LAZER_WIDTH = 0.5;
const LAZER_YVELOCITY = -2;


const ALIEN_HEIGHT = 10;
const ALIEN_WIDTH = 15;
const ALIEN_XVELOCITY = 1;
const ALIEN_YVELOCITY = (ALIEN_HEIGHT + 3);
const ALIEN_INCREMENTING_XVELOCITY = 0.1;
const ALIEN_INCREMENTING_YVELOCITY = 0.1;
const ALIEN_XPADDING = (ALIEN_WIDTH + 3);

var ALIEN_COUNT = 15;
var paused = false;

const shipKeyBoardControlMap = new KeyboardControlMap(KeyCode.ArrowUp, KeyCode.ArrowDown, KeyCode.ArrowLeft, KeyCode.ArrowRight, KeyCode.Space);
var ship = new Ship(ctx, SHIP_XORIGIN, SHIP_YORIGIN, 0, 0, SHIP_HEIGHT, SHIP_WIDTH, "#000000", shipKeyBoardControlMap);

var aliens = [];
var lasers = [];


var playerOneScore = 0;
const playerOneScoreBoard = document.querySelector("#playerOneScoreBoard");

const startGameContainer = document.querySelector("#startGameContainer");
const startButton = document.querySelector("#startButton");

const gameContainer = document.querySelector("#gameContainer");
const gameButtonContainer = document.querySelector("#gameButtonContainer");
const pauseButton = document.querySelector("#pauseButton");
const winnerScreenContainer = document.querySelector("#winnerScreenContainer");


function setGame(){
    generateAliens(ctx);
}

function generateAliens(ctx, alienCount){
    let x = 0;
    let y = 0;
    for(let i = 0; i < alienCount; i++){
        const alien = new Alien(ctx, x, y, ALIEN_XVELOCITY, ALIEN_YVELOCITY, ALIEN_HEIGHT, ALIEN_WIDTH);
        aliens.push(alien);
        x += ALIEN_XPADDING;
    }
}

pauseButton.addEventListener('click', (event) => {
    
    pauseGame(paused);
    animate();

}, false);

startButton.addEventListener('click', (event) => {
    
    setGame();

    startGameContainer.style.display = "none";
    gameContainer.style.display = "flex";
    gameButtonContainer.style.display = "flex";

    setTimeout(() => { 
        pauseGame(paused);
        animate();
    }, 1000)

}, false);

document.addEventListener('keydown', (event) => {
    
    //ship
    //ship movement
    ship.move(event, SHIP_XVELOCITY);

    //ship shooting
    const laser = ship.shootLaser(event);
    if(laser){
        lasers.push(laser);
    }

}, false);

document.addEventListener('keyup', (event) => {
    
    ship.stop(event);

}, false);
