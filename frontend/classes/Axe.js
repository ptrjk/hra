import { collisions } from "./utils/GameSetup.js"
import { ObjectClass } from "./ObjectClass.js"

export class Axe extends ObjectClass {
    constructor(x, y) {
        super(x, y, 1, 0, 3, 2, 16, 16, false, "tool")
        collisions.addObject(this, false)
    }
}