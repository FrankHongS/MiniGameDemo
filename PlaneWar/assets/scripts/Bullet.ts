// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    screenHeight: number;
    @property
    speed: number = 200;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        const size = cc.view.getDesignResolutionSize();
        this.screenHeight = size.height;
    }

    start() {

    }

    update(dt) {
        this.node.y += dt * this.speed;
        if (this.node.y - this.node.height / 2 > this.screenHeight) {
            this.node.removeFromParent(true);
            this.destroy();
        }
    }

    die() {
        this.node.removeFromParent(true);
        this.destroy();
    }
}
