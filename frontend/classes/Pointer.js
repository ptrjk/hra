import { Sprite } from "./Sprite.js"
import { collisions } from "./GameSetup.js"

export class Pointer {
    constructor(x, y, soffsetX = 0, soffsetY = 0, offsetX = 1, offsetY = 1, animation = false) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.tempX = x
        this.tempY = y
        this.soffsetX = soffsetX
        this.soffsetY = soffsetY
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.animation = animation
        this.visibility = true
        this.width = 16
        this.height = 16
        this.sprite = new Sprite('pointer', this.offsetX, this.offsetY, !animation)

        window.addEventListener("keydown", (e) => {
            if (e.key === 'p') {
                console.log(collisions.checkCollision(this))
            }
        },)
    }

    draw(ctx) {
        if (!this.visibility) return
        this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY)
    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }

    updatePosition(x, y) {
        this.tempX += x
        this.tempY += y

        const xx = Math.floor(this.tempX)
        const yy = Math.floor(this.tempY)

        if (yy % 16 === 0) {
            this.y = yy
        }
        if (xx % 16 === 0) {
            this.x = xx
        }
    }
}