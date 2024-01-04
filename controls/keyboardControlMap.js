import { KeyCode } from "./keyCode.js";

export class KeyboardControlMap {

    up;
    down;
    left;
    right;
    shoot;

    constructor(up, down, left, right, shoot){
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.shoot = shoot;
    }

}