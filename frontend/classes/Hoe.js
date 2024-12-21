import { collisions } from "./utils/GameSetup.js"
import { ObjectClass } from "./ObjectClass.js"

export class Hoe extends ObjectClass {
    constructor(x, y) {
        super(x, y, 2, 0, 3, 2, 16, 16, false, "tool")
        collisions.addObject(this, false)
    }
}