import { GrassTile } from "./GrassTile.js"

// collisions doesnt exist in background
export class Background {
    constructor() {
        this.listOfTiles = []
    }

    generateMap() {
        // let list = []
        // for (let j = 0; j <= 2; j++) {
        //     for (let i = 0; i <= 2; i++) {
        //         const item = new GrassTile(32 + (i * 16), 32 + (j * 16), 0, 0)
        //         this.addObject(item)
        //     }
        // }
        return [] //list
    }

    addObject(object) {
        this.listOfTiles.push(object)
    }

    drawMap(ctx) {
        this.listOfTiles.forEach(item => item.draw(ctx))
    }

}