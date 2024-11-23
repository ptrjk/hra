import { Sprite } from "./Sprite.js"
import { collisions } from "./GameSetup.js"
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
        this.tempx = 0
        this.tempy = 0
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

        ctx.beginPath();            // Start a new path
        ctx.moveTo(this.x + this.collisionMask.x, this.y + this.collisionMask.y);         // Move to the starting point
        ctx.lineTo(this.tempx, this.tempy);         // Draw a line to the end point
        // ctx.strokeStyle = black;    // Set the line color
        // ctx.lineWidth = width;      // Set the line width
        ctx.stroke();               // Render the line
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

    chopTree() {
        const object = collisions.getClosestObject(this, 10)
        if (object === null || !object instanceof Tree) return

        this.tempx = object.x + object.width / 2
        this.tempy = object.y + object.height / 2
        const dx = (object.x + object.width / 2) - (this.x + this.collisionMask.x);
        const dy = (object.y + object.height / 2) - (this.y + this.collisionMask.y);

        // Normalize the direction vector
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const directionX = dx / magnitude;
        const directionY = dy / magnitude;

        console.log(directionX, directionY)



        // if (directionX < -0.5 && this.rotation !== 2) {
        //     console.log("Player is to the left of the tree.");
        //     return
        // } else if (directionX > 0.5 && this.rotation !== 3) {
        //     console.log("Player is to the right of the tree.");
        //     return
        // }

        // if (directionY < -0.5 && this.rotation !== 1) {
        //     console.log("Player is above the tree.");
        //     return
        // } else if (directionY > 0.5 && this.rotation !== 0) {
        //     console.log("Player is below the tree.");
        //     return
        // }

        const direction = this.getDirection(directionX, directionY)
        if (this.rotation !== direction) {
            console.log(`Cannot chop tree: Player is facing ${this.rotation}, but needs to face ${direction}.`);
            return;
        }
        console.log("chop")
        // object.chopTree()
    }

    getDirection(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal direction
            return dx > 0 ? 3 : 2; // 3 = right, 2 = left
        } else {
            // Vertical direction
            return dy > 0 ? 0 : 1; // 0 = down, 1 = up
        }
    }

    drawDebug(ctx) { }
}
