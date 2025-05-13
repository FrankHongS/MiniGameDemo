// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Background extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    screenHeight: number;
    bgs: cc.Node[];
    score: number = 0;

    @property
    speed: number = 100;

    @property(cc.Prefab)
    enemyPrefab: cc.Prefab;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // getDesignResolutionSize 设计分辨率
        this.screenHeight = cc.view.getDesignResolutionSize().height;
        this.bgs = this.node.children;
        cc.director.getCollisionManager().enabled = true;
    }

    start() {
        this.schedule(() => {
            const enemy = cc.instantiate(this.enemyPrefab);
            enemy.setParent(cc.director.getScene());
        }, 1);
    }

    update(dt: number) {
        // for (let bg of this.bgs) {
        //     bg.y -= this.speed * dt;
        //     if (bg.y < -this.screenHeight) {
        //         bg.y = this.screenHeight;
        //     }
        // }
        const bg1 = this.bgs[0];
        const bg2 = this.bgs[1];
        bg1.y -= this.speed * dt;
        bg2.y -= this.speed * dt;
        if (bg1.y < -bg1.height) {
            bg1.y = bg2.y + bg2.height;
        }
        if (bg2.y < -bg2.height) {
            bg2.y = bg1.y + bg1.height;
        }
    }
}
