import { Item } from "./Item.js";


export class Seed_Wheat extends Item {

    constructor(x, y) {
        super(x, y, 0, 0, 6, 2, 16, 16, false, "plants")
    }
}