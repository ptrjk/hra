import { Sprite } from "./Sprite.js"
import { camera, collisions } from "./GameSetup.js"
import { ObjectClass } from "./ObjectClass.js"

export class Tree extends ObjectClass {
    constructor(x, y) {
        super(x, y, 1, 0, 9, 5, 32, 32, false, "nature")
        collisions.addObject(this, true)
        this.chopped = false
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY, this.width / 2, this.height / 2, true)
    }

    chopTree() {
        if (this.chopped) return
        this.soffsetX = 4
        this.soffsetY = 2
        this.width = 0
        this.height = 0
        this.x += 8
        this.y += 17
        this.chopped = true
    }
}