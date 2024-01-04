import { KeyCode } from "./keyCode.js";

export class KeyboardControlMap {

    up;
    down;
    left;
    right;
    shootLaser;

    constructor(up, down, left, right, shootLaser){
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.shootLaser = shootLaser;
    }

}