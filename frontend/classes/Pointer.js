import { Sprite } from "./Sprite.js"
import { collisions } from "./GameSetup.js"
import { Tree } from "./Tree.js"

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
        this.pointing = null
        this.sprite = new Sprite('p1', this.offsetX, this.offsetY, !animation)
        this.p1 = new Sprite('p1', this.offsetX, this.offsetY, false)
        this.p2 = new Sprite('p2', this.offsetX, this.offsetY, false)
        this.p3 = new Sprite('p3', this.offsetX, this.offsetY, false)
        this.p4 = new Sprite('p4', this.offsetX, this.offsetY, false)

        window.addEventListener("keydown", (e) => {
            if (e.key === 'p') {
                console.log(collisions.getClosestObject(this, 0))
            }
        },)
    }

    draw(ctx) {
        if (!this.visibility) return
        this.p1.drawStatic(ctx, this.tempx, this.tempy, this.soffsetX, this.soffsetY)
        // - 3 pretoze pointer je 3x3
        this.p2.drawStatic(ctx, this.tempx + this.width - 3, this.tempy, this.soffsetX, this.soffsetY)
        this.p3.drawStatic(ctx, this.tempx + this.width - 3, this.tempy + this.height - 3, this.soffsetX, this.soffsetY)
        this.p4.drawStatic(ctx, this.tempx, this.tempy + this.height - 3, this.soffsetX, this.soffsetY)

    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }

    updatePosition(x, y) {
        this.x = x
        this.y = y
        this.tempx = x
        this.tempy = y

        const objects = collisions.getObjectsInRange(this, 0)

        const res = objects.find((obj) => {
            return obj.obj instanceof Tree
        })
        if (res && !res.obj.chopped) {
            this.width = 32
            this.height = 32
            this.tempx = res.obj.x
            this.tempy = res.obj.y
            this.pointing = res.obj
        }
        else {
            this.width = 16
            this.height = 16
            this.pointing = null
        }
    }
}