
import { Sprite } from "../sprite.js"
import { collisions } from "../utils/GameSetup.js"
import { Axe } from "../Axe.js"
import { ObjectClass } from "../ObjectClass.js"
import { Hoe } from "../Hoe.js"
import { Seed_Wheat } from "../Seed_wheat.js"

export class Inventory extends ObjectClass {
    constructor(x = 160 - (96 + 6) / 2, y = 150) {
        super(x, y, 0, 0, 1, 1, 24, 24, false, "slot")
        this.items = []
        this.maxSize = 4
        this.selectedSlot = 0
        this.spriteSelected = new Sprite('slot_selected', this.offsetX, this.offsetY, false)
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

            drawingSprite.drawStatic(ctx, this.x + 24 * i + (2 * i), this.y, this.soffsetX, this.soffsetY, 0, 0, 1, true)
        }

        this.items.forEach((item, index) => {
            item.sprite.drawStatic(ctx, (this.x + 4) + 24 * index + 2 * index, this.y + 4, item.soffsetX, item.soffsetY, 0, 0, 1, true)
        })
    }

    pickupItem(player) {
        const objects = collisions.getClosestObjectsList(player, 20)

        const pickableIndex = objects.findIndex((item) => {
            if (item instanceof Axe || item instanceof Hoe || item instanceof Seed_Wheat) return true
        })

        if (pickableIndex === -1) return

        const item = objects[pickableIndex]
        collisions.removeObject(item.id)

        console.log(item)

        if (item instanceof Axe)
            this.addItem({ name: 'axe', quantity: 1, soffsetX: item.soffsetX, soffsetY: item.soffsetY, sprite: item.sprite })
        else if (item instanceof Hoe)
            this.addItem({ name: 'hoe', quantity: 1, soffsetX: item.soffsetX, soffsetY: item.soffsetY, sprite: item.sprite })
        else if (item instanceof Seed_Wheat)
            this.addItem({ name: 'seed_wheat', quantity: 1, soffsetX: item.soffsetX, soffsetY: item.soffsetY, sprite: item.sprite })
    }

    addItem(item) {
        if (this.items.length >= this.maxSize) return // skip if full inventory
        this.items.push(item)
    }

    removeItem(itemName) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === itemName) {
                if (this.items[i].quantity > 1)
                    this.items[i].quantity -= 1
                else {
                    this.items.splice(i, 1)
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