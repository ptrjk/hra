import { collisions } from "./utils/GameSetup.js"
import { ObjectClass } from "./ObjectClass.js"
import { Sprite } from "./sprite.js"

export class Tree extends ObjectClass {
    constructor(x, y) {
        super(x, y, 1, 0, 9, 5, 32, 32, false, "nature")
        collisions.addObject(this, true)
        this.chopped = false
        this.lives = 3
        this.spriteAction = new Sprite('tree_animation', 5, 1, false, false)
        this.action = null
    }

    draw(ctx) {
        if (this.action === null)
            this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY, this.width / 2, this.height / 2, true)
        else if (this.action === 'chopping')
            this.spriteAction.drawAnimation(ctx, this.x, this.y, 0)
    }

    chopTree() {
        if (this.chopped) return
        if (this.lives > 1) {
            this.lives -= 1
            this.action = "chopping"
            this.spriteAction.animationSpeed = 100
            this.spriteAction.stopAnimationInterval()
            this.spriteAction.startAnimationInterval()

            setTimeout(() => {
                this.action = null
            }, 500)
            return
        }
        this.soffsetX = 4
        this.soffsetY = 2
        this.width = 0
        this.height = 0
        this.x += 8
        this.y += 17
        this.chopped = true
    }
}