import { Sprite } from "./Sprite.js";


export class Block {
    constructor(name, x, y, soffsetX = 3, soffsetY = 3, offsetX = 1, offsetY = 1, animation = false) {
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
        this.sprite = new Sprite(name, this.offsetX, this.offsetY, !animation)
    }

    draw(ctx) {
        if (!this.animation)
            this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY)
        else
            this.sprite.drawAnimation(ctx, this.x, this.y, 0)
    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }
}