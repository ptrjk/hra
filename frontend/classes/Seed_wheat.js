import { collisions } from "./utils/GameSetup.js";
import { ObjectClass } from "./ObjectClass.js";


export class Seed_Wheat extends ObjectClass {

    constructor(x, y) {
        super(x, y, 0, 0, 6, 2, 16, 16, false, "plants")
        collisions.addObject(this, false)
    }
}