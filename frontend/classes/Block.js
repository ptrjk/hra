import { ObjectClass } from "./ObjectClass.js";


export class Block extends ObjectClass {
    constructor(name, x, y, soffsetX = 3, soffsetY = 3, offsetX = 1, offsetY = 1, animation = false) {
        super(x, y, soffsetX, soffsetY, offsetX, offsetY, 16, 16, animation, name)
    }
}