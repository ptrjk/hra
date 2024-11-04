import { Sprite } from "./sprite.js"
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
        this.sprite = new Sprite('nature', this.offsetX, this.offsetY, true)
        collisions.addObject(this)
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY, 16, 16, true)
    }
}