// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Background from "./Background";
import Bullet from "./Bullet";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    screenWidth: number;
    screenHeight: number;

    frameId: number = 1;
    isDead: boolean = false;

    @property
    speed: number = 150;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        const size = cc.view.getDesignResolutionSize();
        this.screenHeight = size.height;
        this.screenWidth = size.width;
    }

    start() {
        this.node.x = Math.random() * (this.screenWidth - this.node.width) + this.node.width / 2;
        this.node.y = this.screenHeight;
    }

    update(dt) {
        this.node.y -= this.speed * dt;
        if (this.node.y + this.node.height / 2 < 0) {
            this.node.removeFromParent(true);
            this.destroy();
        }
    }

    onCollisionEnter(other: cc.Collider) {
        if (other.tag == 9 && !this.isDead) {
            const bg = cc.find("Background").getComponent(Background);
            bg.score++;
            cc.find("Score").getComponent(cc.Label).string = `分数：${bg.score}`
            other.getComponent(Bullet).die();
            this.die();
        } else if (other.tag == 0 && !this.isDead) {
            // 游戏结束
            cc.game.pause();
            cc.find("Background").getComponent(cc.AudioSource).pause();
            alert("Game Over !")
        }
    }

    die() {
        this.isDead = true;
        cc.resources.load("audio/use_bomb", cc.AudioClip, (error, clip: cc.AudioClip) => {
            cc.audioEngine.playEffect(clip, false);
        });
        this.schedule(() => {
            if (this.frameId == 5) {
                this.node.removeFromParent(true);
                this.destroy();
            } else {
                cc.resources.load(`images/enemy1_down${this.frameId}`, cc.SpriteFrame, (error, sf: cc.SpriteFrame) => {
                    this.getComponent(cc.Sprite).spriteFrame = sf;
                    this.frameId++;
                });
            }
        }, 0.1, 4, 0);
    }
}
