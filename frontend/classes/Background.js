import { Block } from "./Block.js"

// collisions doesnt exist in background
export class Background {
    constructor() {
        this.listOfTiles = []
        this.isLoaded = false
    }

    async generateMap() {
        const res = await fetch('http://localhost:3000')
        const data = await res.json()
        this.listOfTiles = data.map((item) => {
            return new Block(item.name, item.x, item.y, item.soffsetX, item.soffsetY, item.offsetX, item.offsetY, item.animation)
        })

        this.isLoaded = true
        return true
    }

    addObject(object) {
        this.listOfTiles.push(object)
    }

    /// Check for backgroundtiles
    isPositionFree(x, y) {
        let value = true
        this.listOfTiles.forEach((item) => {
            if (item.x === x && item.y === y) {
                value = false
            }
        })
        return value
    }

    drawMap(ctx) {
        this.listOfTiles.forEach((item) => {
            item.draw(ctx)
        })
    }
}