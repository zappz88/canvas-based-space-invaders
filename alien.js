import { FillRect } from "./canvas/model/fillRect.js";
import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";

export class Alien extends FillRect {

    //property, ctor
    xVelocity;
    yVelocity;
    incrementingXVelocity = 0;
    incrementingYVelocity = 0;

    constructor(ctx, x, y, xVelocity = 0, yVelocity = 0, height = 10, width = 15, fillStyle = "#000000"){
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

        if(CanvasCollisionDetection2D.verticalCollisionDetected(this, this.ctx)){
            this.clear();
        }

        if(!CanvasCollisionDetection2D.horizontalCollisionDetected(this, this.ctx)){
            this.x += this.xVelocity;
        }
        else{
            // this.xVelocity = (this.xVelocity * -1);
            // this.y += this.yVelocity;

            if(this.xVelocity < 0){
                this.xVelocity = ((this.xVelocity - this.incrementingXVelocity) * -1);
            }
            else{
                this.xVelocity = ((this.xVelocity + this.incrementingXVelocity) * -1);
            }
            this.y += this.yVelocity;
        }
    }

    drawExplosion(){
        
    }

    //actions

    stop(){
        this.setXVelocity(0);
        this.setYVelocity(0);
    }
}