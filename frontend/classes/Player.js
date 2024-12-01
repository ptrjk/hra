import { Sprite } from "./Sprite.js"
import { camera, collisions, pointer } from "./GameSetup.js"
import { inventory } from "./GameSetup.js"
import { ObjectClass } from "./ObjectClass.js"
import { Tree } from "./Tree.js"

export class Player extends ObjectClass {
    constructor(x, y) {
        super(x, y, 0, 0, 4, 4, 48, 48, true, 'player')
        this.collisionMask = {
            x: 17,
            y: 16,
            width: 13,
            height: 15
        }
        this.image = new Image()
        this.image.src = `assets/testplayer.png`
        this.tempx = x
        this.tempy = y
        this.spriteAction = new Sprite('player_actions', 2, 12, false, false)
        this.keys = {}
        this.speed = 0.5
        this.rotation = 0
        this.action = null
        this._registerEvents()
        collisions.addObject(this)
    }

    draw(ctx) {
        this.updatePosition()
        ctx.drawImage(this.image, 0, 0, 32, 32, this.x, this.y, 32, 32)
        // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
        // if (this.action == 'axe') {
        //     this.spriteAction.drawAnimation(ctx, Math.round(this.x), Math.round(this.y), 4 + this.rotation)
        // }

        // else
        //     // ctx.drawImage(this.image, 300, 300, 32, 32)
        //this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY, this.width / 2, this.height / 2, true)
        //     this.sprite.drawAnimation(ctx, Math.round(this.x), Math.round(this.y), this.rotation)
    }

    _registerEvents() {
        window.addEventListener("keydown", (event) => {
            this.keys[event.key.toLowerCase()] = true
            this.sprite.startAnimationInterval()

            if (event.key === ' ') {
                const item = inventory.getSelectedSlotItem()
                if (!item || item.name !== 'axe' || this.action !== null) {
                    return
                }
                this.action = 'axe'
                this.spriteAction.stopAnimationInterval()
                this.spriteAction.startAnimationInterval()
                this.chopTree()


                setTimeout(() => {
                    this.action = null
                }, 400)
            }

            if (event.key.toLowerCase() === 'e') {
                inventory.pickupItem(this)
            }
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.key.toLowerCase()] = false
            if (!Object.values(this.keys).some((val) => val === true))
                this.sprite.stopAnimationInterval()
        });
    }

    updatePosition() {
        if (this.action !== null) return

        if (this.keys['w']) {
            if (!collisions.checkCollision({ ...this, y: this.y - 1 })) {
                this.tempy -= this.speed
                this.y = Math.floor(this.tempy)

            }

            this.rotation = 1
        }
        if (this.keys['a']) {
            if (!collisions.checkCollision({ ...this, x: this.x - 1 })) {
                this.tempx -= this.speed
                this.x = Math.floor(this.tempx)
                // camera.x = -this.x + 50
            }
            this.rotation = 2
        }
        if (this.keys['s']) {
            if (!collisions.checkCollision({ ...this, y: this.y + 1 })) {
                this.tempy += this.speed
                this.y = Math.floor(this.tempy)
            }

            this.rotation = 0
        }
        if (this.keys['d']) {
            this.rotation = 3
            if (!collisions.checkCollision({ ...this, x: this.x + 1 })) {
                this.tempx += this.speed
                this.x = Math.floor(this.tempx)
                // camera.x = -this.x + 50
            }
        }
        camera.x = Math.max(0, Math.min(this.x - camera.width / 5 / 2, 2000 - camera.width));
        camera.y = Math.max(0, Math.min(this.y - camera.height / 5 / 2, 2000 - camera.height));
    }

    chopTree() {
        const object = pointer.pointing
        console.log(object)
        if (object === null || !object instanceof Tree) return

        const dx = (object.x + object.width / 2) - (this.x + this.collisionMask.x)
        const dy = (object.y + object.height / 2) - (this.y + this.collisionMask.y)

        // Normalize the direction vector
        const magnitude = Math.sqrt(dx * dx + dy * dy)
        const directionX = dx / magnitude
        const directionY = dy / magnitude

        const direction = this.getDirection(directionX, directionY)
        this.rotation = direction

        object.chopTree()
    }

    getDirection(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal direction
            return dx > 0 ? 3 : 2 // 3 = right, 2 = left
        } else {
            // Vertical direction
            return dy > 0 ? 0 : 1 // 0 = down, 1 = up
        }
    }
}
