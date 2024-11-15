import { Sprite } from "./Sprite.js"
import { collisions } from "../main.js"

export class Axe {
    constructor(x, y, soffsetX = 1, soffsetY = 0, offsetX = 3, offsetY = 2, animation = false) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.soffsetX = soffsetX
        this.soffsetY = soffsetY
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.animation = animation
        this.width = 16
        this.height = 16
        this.sprite = new Sprite('tool', this.offsetX, this.offsetY, !animation)
        collisions.addObject(this, false)
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY)
    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }
}