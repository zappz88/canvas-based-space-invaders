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
import { SpaceShip } from "./spaceShip.js";
import { Laser } from "./laser.js";
import { Invader } from "./invader.js";
import { Invaders } from "./invaders.js";

function animate(){
    if(paused){
        return;
    }

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    spaceShip.update();

    if(invaders.invaderMatrix2D.length > 0){
        invaders.update();
        for(let i = 0; i < invaders.invaderMatrix2D.length; i++){
            const currentInvaderRow = invaders.invaderMatrix2D[i];
            if(currentInvaderRow.length === 0){
                invaders.invaderMatrix2D.splice(i, 1);
            }
            for(let j = 0; j < invaders.invaderMatrix2D[i].length; j++){
                const currentInvader = invaders.invaderMatrix2D[i][j];
                if(spaceShip.laserHit(currentInvader)){
                    console.log("hit");
                    currentInvader.clear();
                    currentInvaderRow.splice(j, 1);
                    playerOneScore += 100;
                    playerOneScoreBoard.innerText = playerOneScore;	
                }
            }
        }
    }
    else{
        console.log("generating new invaders");
        INVADER_XVELOCITY += 0.25;
        invaders = new Invaders(ctx, 0, 0, (generateInvaders(ctx, 5, 5)), 0, INVADER_YVELOCITY);
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

const SPACESHIP_HEIGHT = 6;
const SPACESHIP_WIDTH = 12;
const SPACESHIP_XORIGIN = ((canvas.width / 2) - SPACESHIP_WIDTH);
const SPACESHIP_YORIGIN = (canvas.height - SPACESHIP_HEIGHT);
const SPACESHIP_XVELOCITY = 2;

const LAZER_HEIGHT = 5;
const LAZER_WIDTH = 0.5;
const LAZER_YVELOCITY = -2;


const INVADER_HEIGHT = 8;
const INVADER_WIDTH = 8;
const INVADER_XPADDING = INVADER_WIDTH / 2;
const INVADER_YPADDING = INVADER_HEIGHT / 2;
var INVADER_XVELOCITY = 0.25;
const INVADER_YVELOCITY = (INVADER_HEIGHT + INVADER_YPADDING);
const INVADER_INCREMENTING_XVELOCITY = 0.1;
const INVADER_INCREMENTING_YVELOCITY = 0.1;


var INVADER_COUNT = 15;
var paused = true;

const spaceShipKeyBoardControlMap = new KeyboardControlMap(KeyCode.ArrowUp, KeyCode.ArrowDown, KeyCode.ArrowLeft, KeyCode.ArrowRight, KeyCode.Space);
var spaceShip = new SpaceShip(ctx, SPACESHIP_XORIGIN, SPACESHIP_YORIGIN, 0, 0, SPACESHIP_HEIGHT, SPACESHIP_WIDTH, "#000000", spaceShipKeyBoardControlMap);

var invaders = new Invaders(ctx, 0, 0, (generateInvaders(ctx, 5, 5)), 0, INVADER_YVELOCITY);

function generateInvaders(ctx, x, y){
    let invaders = [];
    let newX = x;
    let newY = y;
    for(let i = 0; i < 5; i++){
        invaders.push(generateInvaderRow(ctx, newX, newY, 15));
        newX = 5;
        newY += INVADER_HEIGHT + INVADER_YPADDING;
    }
    return invaders;
}

function generateInvaderRow(ctx, x, y, invaderCount){
    let invaderRow = [];
    for(let i = 0; i < invaderCount; i++){
        const invader = new Invader(ctx, x, y, INVADER_XVELOCITY, 0, INVADER_HEIGHT, INVADER_WIDTH);
        invaderRow.push(invader);
        x += INVADER_WIDTH + INVADER_XPADDING;
    }
    return invaderRow;
}

var playerOneScore = 0;
const playerOneScoreBoard = document.querySelector("#playerOneScoreBoard");

const startGameContainer = document.querySelector("#startGameContainer");
const startButton = document.querySelector("#startButton");

const gameContainer = document.querySelector("#gameContainer");
const gameButtonContainer = document.querySelector("#gameButtonContainer");
const pauseButton = document.querySelector("#pauseButton");
const winnerScreenContainer = document.querySelector("#winnerScreenContainer");

pauseButton.addEventListener('click', (event) => {
    
    pauseGame(paused);
    animate();

}, false);

startButton.addEventListener('click', (event) => {

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
    spaceShip.move(event, SPACESHIP_XVELOCITY);

    //ship shooting
    spaceShip.shootLaser(event);

}, false);

document.addEventListener('keyup', (event) => {
    
    spaceShip.stop(event);

}, false);
