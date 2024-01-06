import { FillRect } from "./canvas/model/fillRect.js";
import { CanvasCollisionDetection2D } from "./canvas/environment/canvasCollisionDetection2D.js";

export class UFOInvader extends FillRect {

    //property, ctor
    xVelocity;
    yVelocity;
    incrementingXVelocity;
    incrementingYVelocity;
    fillStyles;
    fillStylesIndexMonitor;

    constructor(ctx, x, y, xVelocity = 0, yVelocity = 0, height = 10, width = 30, fillStyle = "#808080"){
        super(ctx, x, y, height, width, fillStyle);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.incrementingXVelocity = 0;
        this.incrementingYVelocity = 0;
        this.fillStyles = [
                "#000000", 
                "#111111", 
                "#222222", 
                "#333333", 
                "#444444",
                "#555555", 
                "#666666", 
                "#777777", 
                "#888888", 
                "#999999",
                "#AAAAAA", 
                "#BBBBBB", 
                "#CCCCCC", 
                "#DDDDDD", 
                "#EEEEEE",
                "#FFFFFF"
        ];
        this.fillStylesIndexMonitor = 0;
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

        if(
            CanvasCollisionDetection2D.verticalCollisionDetected(this, this.ctx) ||
            CanvasCollisionDetection2D.horizontalCollisionDetected(this, this.ctx)
        ){
            this.clear();
        }

        this.x += this.xVelocity;

        if(this.fillStylesIndexMonitor >= this.fillStyles.length){
            this.fillStylesIndexMonitor = 0;   
        }
        this.fillStylesIndexMonitor++;

        this.setFillstyle(this.fillStyles[this.fillStylesIndexMonitor]);
    }

    //actions

    stop(){
        this.setXVelocity(0);
        this.setYVelocity(0);
    }
}
