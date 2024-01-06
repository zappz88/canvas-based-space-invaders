import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";
import { Invader } from "./invader.js";

export class Invaders {

    ctx;
    x;
    y;
    //2D matrix
    invaderMatrix2D;
    invaderMatrix2DRowCount;
    descentVelocity;

    constructor(ctx, x, y, invaderMatrix2D, invaderMatrix2DRowCount, descentVelocity){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.invaderMatrix2D = invaderMatrix2D;
        this.invaderMatrix2DRowCount = invaderMatrix2DRowCount;
        this.descentVelocity = descentVelocity;
    }

    setCTX(val){
        this.ctx = val;
        return this;
    }

    setX(val){
        this.x = val;
        return this;
    }

    setY(val){
        this.y = val;
        return this;
    }

    setInvaders(val){
        this.invaderMatrix2D = val;
        return this;
    }

    setInvaderMatrix2DRowCount(val){
        this.invaderMatrix2DRowCount = val;
        return this;
    }

    setDescentVelocity(val){
        this.descentVelocity = val;
        return this;
    }

    getInvaderMatrix2D(){
        return this.invaderMatrix2D;
    }

    getInvaderMatrix2DRow(val){
        return this.invaderMatrix2D[val];
    }

    setInvaderMatrix2DRow(index, val){
        return this.invaderMatrix2D[index] = val;
    }

    update(){
        for(let i = 0; i < this.invaderMatrix2D.length; i++){
            for(let j = 0; j < this.invaderMatrix2D[i].length; j++){
                const curr = this.invaderMatrix2D[i][j];
                curr.update();
                if(
                    CanvasCollisionDetection2D.rightCollisionDetected(curr, this.ctx) ||
                    CanvasCollisionDetection2D.leftCollisionDetected(curr, this.ctx)
                ){
                    this.updateDescent();
                }
            }
        }
    }

    updateDescent(){
        for(let i = 0; i < this.invaderMatrix2D.length; i++){
            for(let j = 0; j < this.invaderMatrix2D[i].length; j++){
                const curr = this.invaderMatrix2D[i][j];
                if(curr.xVelocity < 0){
                    curr.xVelocity = ((curr.xVelocity - curr.incrementingXVelocity) * -1);
                }
                else{
                    curr.xVelocity = ((curr.xVelocity + curr.incrementingXVelocity) * -1);
                }
                curr.y += this.descentVelocity;;
            }
        }
    }

    generateInvaders(){
        let invaders = [];
        let newX = this.x;
        let newY = this.y;
        for(let i = 0; i < 3; i++){
            invaders.push(this.#generateInvaderRow(this.ctx, newX, newY, 15));
            newX = 0;
            newY += 12;
        }
        return invaders;
    }

    #generateInvaderRow(x, y, invaderCount){
        let invaderRow = [];
        for(let i = 0; i < invaderCount; i++){
            const invader = new Invader(this.ctx, x, y, 1, 0, 10, 15);
            invaderRow.push(invader);
            x += 12;
        }
        return invaderRow;
    }

}