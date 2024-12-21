import { collisions } from "./utils/GameSetup.js"
import { ObjectClass } from "./ObjectClass.js"


export class Wheat extends ObjectClass {

    constructor(x, y) {
        super(x, y, 1, 0, 6, 2, 16, 16, false, "plants")
        collisions.addObject(this, false)
        this.interval = setInterval(() => {
            if (this.soffsetX < 4)
                this.soffsetX += 1
            else
                clearInterval(this.interval)
        }, 500)
    }
}   