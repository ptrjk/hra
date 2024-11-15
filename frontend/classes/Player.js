import { Sprite } from "./Sprite.js"
import { collisions } from "../main.js"
import { inventory } from "../main.js"
import { Axe } from "./Axe.js"
import { pointer } from "../main.js"

export class Player {
    constructor(x, y) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.collisionMask = {
            x: 17,
            y: 16,
            width: 13,
            height: 15
        }
        this.width = 48
        this.height = 48
        this.sprite = new Sprite('playerr', 4, 4, true)
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
        if (this.action == 'axe') {
            this.spriteAction.drawAnimation(ctx, Math.round(this.x), Math.round(this.y), 4 + this.rotation)
        }

        else
            this.sprite.drawAnimation(ctx, Math.round(this.x), Math.round(this.y), this.rotation)
    }

    _registerEvents() {
        window.addEventListener("keydown", (event) => {
            this.keys[event.key.toLowerCase()] = true
            this.sprite.startAnimationInterval()

            if (event.key === 'c') {
                const item = inventory.getSelectedSlotItem()
                if (!item || item.name !== 'axe') {
                    return
                }
                this.action = 'axe'
                this.spriteAction.stopAnimationInterval()
                this.spriteAction.startAnimationInterval()
                setTimeout(() => {
                    this.action = null
                }, 400)
            }

            if (event.key === 'v') {
                const object = collisions.getClosestObject(this, 20)
                if (!object) return
                collisions.removeObject(object.id)
                inventory.addItem({ name: 'axe', quantity: 1 })
                //console.log(object)
            }
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.key.toLowerCase()] = false
            if (!Object.values(this.keys).some((val) => val === true))
                this.sprite.stopAnimationInterval()
        });
    }

    updatePosition() {

        // test ptm zmaz
        const playerCenter = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
        const cursorCenter = {
            x: pointer.tempX + pointer.width / 2,
            y: pointer.tempY + pointer.height / 2
        };

        const dist = collisions.calculateDistance(playerCenter, cursorCenter);

        console.log(dist)

        // Define a threshold for the cursor to start moving towards the player
        const threshold = 40;

        // Move only if the distance is greater than the threshold
        if (dist > threshold) {
            // Calculate direction vector
            const dx = playerCenter.x - cursorCenter.x;
            const dy = playerCenter.y - cursorCenter.y;

            // Normalize the direction vector
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            const directionX = dx / magnitude;
            const directionY = dy / magnitude;

            pointer.updatePosition(directionX, directionY)
        }

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
