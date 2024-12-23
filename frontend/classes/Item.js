import { ObjectClass } from "./ObjectClass.js";
import { collisions } from "./utils/GameSetup.js";



export class Item extends ObjectClass {
    constructor(x, y, soffsetX = 1, soffsetY = 0, offsetX = 3, offsetY = 2, width = 16, height = 16, animation = false, spriteName) {
        super(x, y, soffsetX, soffsetY, offsetX, offsetY, width, height, animation, spriteName, 1)
        collisions.addObject(this, false)
        this.floatEffect()

    }

    floatEffect() {
        const amplitude = 1; // Maximum height above and below the original position
        const speed = 0.05;  // Speed of the floating effect
        const originalY = this.y; // Store the starting y position
        let angle = 0; // Start angle

        setInterval(() => {
            angle += speed; // Increment angle over time
            this.y = originalY + Math.sin(angle) * amplitude; // Oscillate y around the original position
        }, 16); // Approximately 60 FPS
    }

}