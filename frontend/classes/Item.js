import { ObjectClass } from "./ObjectClass.js"
import { collisions } from "./utils/GameSetup.js"



export class Item extends ObjectClass {
    constructor(x, y, soffsetX = 1, soffsetY = 0, offsetX = 3, offsetY = 2, width = 16, height = 16, animation = false, spriteName) {
        super(x, y, soffsetX, soffsetY, offsetX, offsetY, width, height, animation, spriteName, 1)
        this.floatingInterval = null
        this.player = null
        this.progress = 0
        collisions.addObject(this, false)
        //this.floatEffect()
        this.dropx = null
        this.dropy = null
        this.action = "drop"
    }

    floatEffect() {
        const amplitude = 1; // Maximum height above and below the original position
        const speed = 0.05;  // Speed of the floating effect
        const originalY = this.y; // Store the starting y position
        let angle = 0; // Start angle

        this.floatingInterval = setInterval(() => {
            angle += speed; // Increment angle over time
            this.y = originalY + Math.sin(angle) * amplitude; // Oscillate y around the original position
        }, 16); // Approximately 60 FPS
    }

    pickUpEffect(player) {
        clearInterval(this.floatingInterval)
        this.player = player
    }

    _updatePosition() {
        if (this.player) {
            this.jumpEffectFunction(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, () => {
                this.player = null
                this.action = "pickup"
            })
            // const speed = 0.7
            // const hillHeight = 0.5
            // const dx = this.player.x + this.player.width / 2 - this.x // Distance in x
            // const dy = this.player.y + this.player.height / 2 - this.y // Distance in y
            // const distance = Math.sqrt(dx * dx + dy * dy) // Total distance to player

            // if (distance < 1) {
            //     this.player = null
            //     this.action = "pickup"
            // }

            // const nx = dx / distance // Normalized x direction
            // const ny = dy / distance // Normalized y direction

            // this.progress = Math.min(this.progress + speed / distance, 1)

            // const hillEffect = hillHeight * (1 - (this.progress - 0.5) ** 2 * 4)

            // this.x += nx * speed
            // this.y += ny * speed - hillEffect * Math.abs(nx)
        }
        else if (this.action === "pickup") {
            if (this.scale > 0.2)
                this.scale -= 0.03
            else {
                this.action = null
                collisions.removeObject(this.id)
            }
        }
        else if (this.action === "drop") {
            if (!this.dropx) {
                let r = Math.floor(Math.random() * 21) - 10
                if (r === 0) r += 1
                this.dropx = this.x + r
            }
            if (!this.dropy) this.dropy = this.y
            this.jumpEffectFunction(this.dropx, this.dropy, () => {
                this.action = null
            })
        }
    }

    jumpEffectFunction(targetX, targetY, callbackFn) {
        const speed = 0.7
        const hillHeight = 2
        const dx = targetX - this.x // Distance in x
        const dy = targetY - this.y // Distance in y
        const distance = Math.sqrt(dx * dx + dy * dy) // Total distance to player

        if (distance < 1) {
            callbackFn()
            this.progress = 0
        }

        const nx = dx / distance // Normalized x direction
        const ny = dy / distance // Normalized y direction

        this.progress = Math.min(this.progress + speed / distance, 1)

        const hillEffect = hillHeight * (1 - (this.progress - 0.5) ** 2 * 4)

        this.x += nx * speed
        this.y += ny * speed - hillEffect * Math.abs(nx)
    }

    draw(ctx) {
        this._updatePosition()
        this.sprite.drawStatic(ctx, this.x, this.y, this.soffsetX, this.soffsetY, 0, 0, this.scale)
    }

}