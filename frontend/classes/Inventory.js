
import { Sprite } from "./Sprite.js"
import { collisions } from "./GameSetup.js"
import { Axe } from "./Axe.js"
import { ObjectClass } from "./ObjectClass.js"

export class Inventory extends ObjectClass {
    constructor(x = 160 - (96 + 6) / 2, y = 150, soffsetX = 0, soffsetY = 0, offsetX = 1, offsetY = 1, animation = false) {
        super(x, y, 0, 0, 1, 1, 24, 24, false, "slot")
        this.items = []
        this.maxSize = 4
        this.selectedSlot = 0
        this.spriteSelected = new Sprite('slot_selected', this.offsetX, this.offsetY, !animation)
        this.itemSprites = []
        this._registerEvents()
    }

    _registerEvents() {
        window.addEventListener("keydown", (event) => {
            if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4') {
                this.selectedSlot = Number(event.key) - 1
            }
        });
    }

    draw(ctx) {
        for (let i = 0; i < this.maxSize; i++) {
            let drawingSprite;

            if (i === this.selectedSlot)
                drawingSprite = this.spriteSelected
            else
                drawingSprite = this.sprite

            drawingSprite.drawStatic(ctx, this.x + 24 * i + (2 * i), this.y, this.soffsetX, this.soffsetY)
        }

        this.itemSprites.forEach((item, index) => {
            item.drawStatic(ctx, (this.x + 4) + 24 * index + 2 * index, this.y + 4, 1, 0, 0, 0, 1)
        })
    }

    pickupItem(player) {
        const object = collisions.getClosestObject(player, 20)
        if (!object || !(object instanceof Axe)) return
        console.log(object)
        collisions.removeObject(object.id)
        this.addItem({ name: 'axe', quantity: 1 })
    }


    addItem(item) {
        if (this.items.length >= this.maxSize) return // skip if full inventory
        const spr = new Sprite('tool', 3, 2, false)
        this.itemSprites.push(spr)
        this.items.push(item)
    }

    removeItem(itemName) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === itemName) {
                if (this.items[i].quantity > 1)
                    this.items[i].quantity -= 1
                else {
                    this.items.splice(i, 1)
                    this.itemSprites.splice(i, 1)
                }
                break
            }
        }
    }

    containsItem(name) {
        let contains = false
        this.items.forEach((item) => {
            if (item.name === name) contains = true
        })
        return contains
    }

    getSelectedSlotItem() {
        return this.items[this.selectedSlot]
    }
}