export class UFOInvaders {

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

}