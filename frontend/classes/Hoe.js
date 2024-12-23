import { Item } from "./Item.js";

export class Hoe extends Item {
    constructor(x, y) {
        super(x, y, 2, 0, 3, 2, 16, 16, false, "tool")
    }
}