import { Sprite } from "./Sprite.js"
import { collisions } from "../main.js"

export class Tree {
    constructor(x, y, soffsetX = 1, soffsetY = 0, offsetX = 9, offsetY = 5) {
        this.id = 'p'
        this.x = x
        this.y = y
        this.soffsetX = soffsetX
        this.soffsetY = soffsetY
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.width = 32
        this.height = 32
        this.sprite = new Sprite('nature', this.offsetX, this.offsetY, true)
        collisions.addObject(this, false)
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY, this.width / 2, this.height / 2, true)
    }
}