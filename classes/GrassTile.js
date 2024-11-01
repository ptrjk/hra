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
        this.iterate()
    }

    draw(ctx) {
        this.sprite.drawStatic(ctx, this.x, this.y, this.offsetX, this.offsetY)
    }

    generateUniqueId() {
        return `id_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }

    iterate() {
        const myX = Math.floor(this.x / 16)
        const myY = Math.floor(this.y / 16)
        let list = []
        console.log({ myX, myY })

        for (let i = 0; i < this.listOfTiles.length; i++) {
            let x = Math.floor(this.listOfTiles[i].x / 16)
            let y = Math.floor(this.listOfTiles[i].y / 16)

            if ((Math.abs(myX - x) <= 2 && myY === y) || (Math.abs(myY - y) <= 2 && myX === x) || (myX - 1 === x && myY - 1 === y)
                || (myX - 1 === x && myY + 1 === y) || (myX + 1 === x && myY - 1 === y) || (myX + 1 === x && myY + 1 === y)) {
                list.push({ calcx: x, calcy: y, object: this.listOfTiles[i] })
            }
        }

        let sides = this.checkSides(list, myX, myY)

        if (sides.top) {
            this.offsetX = 1
            this.offsetY = 2
            // console.log("toto:")
            // console.log(this.checkSides(list, myX, myY - 1))
        }
        if (sides.bottom) {
            this.offsetX = 1
            this.offsetY = 0    
            // console.log("toto:")
            // console.log(this.checkSides(list, myX, myY - 1))
        }

        console.log(sides)

        console.log("----")
    }

    checkSides(list, myX, myY) {
        let sides = { left: false, right: false, top: false, bottom: false }
        list.forEach((item) => {
            let x = item.calcx
            let y = item.calcy
            if (x === myX && y + 1 === myY) {
                sides = { ...sides, top: true }
            } if (x === myX && y - 1 === myY) {
                sides = { ...sides, bottom: true }
            }
            if (x - 1 === myX && y === myY) {
                sides = { ...sides, right: true }
            }
            if (x + 1 === myX && y === myY) {
                sides = { ...sides, left: true }
            }
        })
        return sides
    }
}

// if (x === myX && y + 1 === myY) {
//     sides = { ...sides, top: true }
//     console.log("x")
//     this.offsetX = 1
//     this.offsetY = 1
//     list.forEach((itemMain) => {
//         if (itemMain.calcx === myX && itemMain.calcy + 1 === myY) {
//             itemMain.object.offsetX = 1
//             itemMain.object.offsetY = 0
//             list.forEach((item) => {
//                 if (item.calcx === myX && item.calcy + 2 === myY) {
//                     console.log("jop")
//                     itemMain.object.offsetX = 1
//                     itemMain.object.offsetY = 1
//                 }
//             })
//         }
//     })
// }