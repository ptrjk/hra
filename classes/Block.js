import { Sprite } from "./sprite.js";


export class Block {
    constructor(x, y) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.width = 16
        this.height = 16
        this.sprite = new Sprite('Grass', 11, 7, true)
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, 1, 5)
    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }
}