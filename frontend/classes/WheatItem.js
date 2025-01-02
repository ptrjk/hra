import { Item } from "./Item.js"
import { collisions } from "./utils/GameSetup.js"


export class WheatItem extends Item {

    constructor(x, y) {
        super(x, y, 5, 0, 6, 2, 16, 16, false, "plants")
    }
}   