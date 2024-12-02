import { Sprite } from "./Sprite.js"


export class ObjectClass {
    constructor(x, y, soffsetX = 1, soffsetY = 0, offsetX = 3, offsetY = 2, width = 16, height = 16, animation = false, spriteName) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.soffsetX = soffsetX
        this.soffsetY = soffsetY
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.animation = animation
        this.width = width
        this.height = height
        this.sprite = new Sprite(spriteName, this.offsetX, this.offsetY, false)

    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }

    draw(ctx) {
        if (!this.animation)
            this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY)
        else
            this.sprite.drawAnimation(ctx, this.x, this.y, 0)
    }
}