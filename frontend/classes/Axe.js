import { Item } from "./Item.js"

export class Axe extends Item {
    constructor(x, y) {
        super(x, y, 1, 0, 3, 2, 16, 16, false, "tool")
    }
}