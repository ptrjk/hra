import { Sprite } from "../sprite.js"
import { bg, collisions } from "../utils/GameSetup.js"
import { Tree } from "../Tree.js"
import { ObjectClass } from "../ObjectClass.js"

/*
tempx and tempy is same as x,y, but when player hover on some object for ex. tree, tempx will increases 
according to the size of the object (tree)
*/


export class Pointer extends ObjectClass {
    constructor(x, y) {
        super(x, y, 0, 0, 1, 1, 16, 16, false, 'p1')
        this.tempX = x
        this.tempY = y
        this.visibility = true
        this.pointing = null // set object that pointer is pointing too, but only from collisionmap class. (not background)
        this.pointingBlock = null // set object that pointer is pointing too, but only background tiles.
        this.p1 = new Sprite('p1', this.offsetX, this.offsetY, false)
        this.p2 = new Sprite('p2', this.offsetX, this.offsetY, false)
        this.p3 = new Sprite('p3', this.offsetX, this.offsetY, false)
        this.p4 = new Sprite('p4', this.offsetX, this.offsetY, false)

        window.addEventListener("keydown", (e) => {
            if (e.key === 'p') {
                console.log(collisions.getClosestObject(this, 0))
            }
        },)
    }

    draw(ctx) {
        if (!this.visibility) return
        this.p1.drawStatic(ctx, this.tempx, this.tempy, this.soffsetX, this.soffsetY)
        // - 3 pretoze pointer je 3x3
        this.p2.drawStatic(ctx, this.tempx + this.width - 3, this.tempy, this.soffsetX, this.soffsetY)
        this.p3.drawStatic(ctx, this.tempx + this.width - 3, this.tempy + this.height - 3, this.soffsetX, this.soffsetY)
        this.p4.drawStatic(ctx, this.tempx, this.tempy + this.height - 3, this.soffsetX, this.soffsetY)
    }


    updatePosition(x, y) {
        this.x = x
        this.y = y
        this.tempx = x
        this.tempy = y

        this.searchBackgroundTile()

        const objects = collisions.getObjectsInRange(this, 0)

        const res = objects.find((obj) => {
            return obj.obj instanceof Tree
        })

        // when pointing on tree, pointer will be larger
        if (res && !res.obj.chopped) {
            this.width = 32
            this.height = 32
            this.tempx = res.obj.x
            this.tempy = res.obj.y
            this.pointing = res.obj
        }
        else {
            this.width = 16
            this.height = 16
            this.pointing = null
        }
    }

    // Only test method, later transform it into CollisionMap method
    searchBackgroundTile() {
        bg.listOfTiles.forEach(element => {
            if (element.x === this.x && element.y === this.y) this.pointingBlock = element
        })
    }
}