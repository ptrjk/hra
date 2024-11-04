import { Sprite } from "./sprite.js"
import { bg } from '../main.js'

export class GrassTile {
    constructor(x, y, offsetX = 3, offsetY = 3) {
        this.id = this.generateUniqueId()
        this.x = x
        this.y = y
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.listOfTiles = bg.listOfTiles
        this.width = 16
        this.height = 16
        this.sprite = new Sprite('Grass', 11, 7, true)
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, this.offsetX, this.offsetY)
    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }

    calculateBitmask(tileMap) {
        let bitmask = 0;
        const x = Math.floor(this.x / 16)
        const y = Math.floor(this.y / 16)

        // Check neighbors
        if (tileMap.has(`${x},${y - 1}`)) bitmask |= 1 << 0; // Top
        if (tileMap.has(`${x - 1},${y}`)) bitmask |= 1 << 1; // Left
        if (tileMap.has(`${x + 1},${y}`)) bitmask |= 1 << 2; // Right
        if (tileMap.has(`${x},${y + 1}`)) bitmask |= 1 << 3; // Bottom

        const ee = {
            0b1100: [0, 0],
            0b1101: [0, 1],
            0b0101: [0, 2],
            0b0100: [0, 3],

            0b1110: [1, 0],
            0b1111: [1, 1],
            0b0111: [1, 2],
            0b0110: [1, 3],

            0b1010: [2, 0],
            0b1011: [2, 1],
            0b0011: [2, 2],
            0b0010: [2, 3],

            0b1000: [3, 0],
            0b1001: [3, 1],
            0b0001: [3, 2],
            0b0000: [3, 3],
        }
        if (!bitmask)
            return

        const offsets = ee[bitmask] || [3, 3]
        console.log(offsets)
        this.offsetX = offsets[0]
        this.offsetY = offsets[1]

        console.log(bitmask)
    }
}