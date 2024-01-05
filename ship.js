import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";
import { Laser } from "./laser.js";
import { StrokeRect } from "./canvas/model/strokeRect.js";

export class Ship extends StrokeRect {

    //property, ctor
    xVelocity;
    yVelocity;
    keyboardControlMap;

    constructor(ctx, x, y, xVelocity = 0, yVelocity = 0, height = 10, width = 20, strokeStyle = "#000000", keyboardControlMap){
        super(ctx, x, y, height, width, strokeStyle);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.keyboardControlMap = keyboardControlMap;
    }

    setXVelocity(val){
        this.xVelocity = val;
        return this;
    }

    setYVelocity(val){
        this.yVelocity = val;
        return this;
    }

    update() {
        this.draw();

        if(!CanvasCollisionDetection2D.horizontalCollisionDetected(this, this.ctx)){
            this.x += this.xVelocity;
        }
    }

    //actions

    move(event, velocity){
        switch(event.code){
            case this.keyboardControlMap.left:
                // console.log("ArrowUp");
                this.setXVelocity((-1 * velocity));
                break;
            case this.keyboardControlMap.right:
                // console.log("ArrowDown");
                this.setXVelocity(velocity);
                break;
        }
    }

    stop(event){
        switch(event.code){
            case this.keyboardControlMap.left:
                // console.log("ArrowLeft");
                this.setXVelocity(0);
                break;
            case this.keyboardControlMap.right:
                // console.log("ArrowRight");
                this.setXVelocity(0);
                break;
        }
    }

    shootLaser(event){
        switch(event.code){
            case this.keyboardControlMap.shootLaser:
                // console.log("Space");
                const mid = this.getCenterCoord();
                return new Laser(this.ctx, mid.x, (mid.y - this.height), 0, -2);
                break;
        }
    }
}