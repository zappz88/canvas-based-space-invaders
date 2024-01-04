import { FillRect } from "./canvas/model/fillRect.js";
import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";
import { CollisionDetection2D } from "./canvas/model/collisionDetection/collisionDetection2D.js";

export class Laser extends FillRect {

    //property, ctor
    xVelocity;
    yVelocity;
    incrementingXVelocity = 0.2;
    incrementingYVelocity = 0.1;

    constructor(ctx, x, y, xVelocity = 0, yVelocity = -2, height = 5, width = 1, fillStyle = "#000000"){
        super(ctx, x, y, height, width, fillStyle);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    setXVelocity(val){
        this.xVelocity = val;
        return this;
    }

    setYVelocity(val){
        this.yVelocity = val;
        return this;
    }

    setIncrementingXVelocity(val){
        this.incrementingXVelocity = val;
        return this;
    }

    setIncrementingYVelocity(val){
        this.incrementingYVelocity = val;
        return this;
    }

    update() {
        this.draw();

        if(!CanvasCollisionDetection2D.verticalCollisionDetected(this, this.ctx)){
            this.y += this.yVelocity;
        }
        else{
            // console.log("cleared screen");
            this.clear();
        }
    }
    //actions

    stop(){
        this.setYVelocity(0);
    }

    isEnemyHit(alien){
        return CollisionDetection2D.getTopCollisionDetected(this, alien);
    }
}