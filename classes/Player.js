import { Sprite } from "./sprite.js"
import { collisions } from "../main.js"

export class Player {
    constructor(x, y) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.width = 48
        this.height = 48
        this.sprite = new Sprite('playerr', 4, 4, true)
        this.keys = {}
        this.speed = 0.5
        this.rotation = 0
        this._registerEvents()
        console.log(collisions)
    }

    draw(ctx) {
        this.updatePosition()
        this.sprite.drawAnimation(ctx, Math.round(this.x), Math.round(this.y), this.rotation)
    }

    _registerEvents() {
        window.addEventListener("keydown", (event) => {
            this.keys[event.key.toLowerCase()] = true
            this.sprite.startAnimationInterval()
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.key.toLowerCase()] = false
            if (!Object.values(this.keys).some((val) => val === true))
                this.sprite.stopAnimationInterval()
        });
    }

    updatePosition() {
        if (this.keys['w']) {
            if (!collisions.checkCollision({ ...this, y: this.y - 1 }))
                this.y -= this.speed
            this.rotation = 1
        }
        if (this.keys['a']) {
            if (!collisions.checkCollision({ ...this, x: this.x - 1 }))
                this.x -= this.speed
            this.rotation = 2
        }
        if (this.keys['s']) {
            if (!collisions.checkCollision({ ...this, y: this.y + 1 }))
                this.y += this.speed
            this.rotation = 0
        }
        if (this.keys['d']) {
            this.rotation = 3
            if (!collisions.checkCollision({ ...this, x: this.x + 1 }))
                this.x += this.speed
        }
    }


    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }
}
