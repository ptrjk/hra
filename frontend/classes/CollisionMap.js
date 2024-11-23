

export class CollisionMap {

    constructor() {
        this.objectList = []
    }


    addObject(object, useCollision = true) {
        this.objectList.push({
            collision: useCollision,
            obj: object
        })
        console.log(this.objectList)
    }

    removeObject(id) {
        for (let i = 0; i < this.objectList.length; i++) {
            if (this.objectList[i].obj.id === id) {
                this.objectList.splice(i, 1)
                break
            }
        }
    }

    isColliding(object, object2) {
        const mask = object.collisionMask;

        const x1 = object.x + (mask?.x || 0)
        const y1 = object.y + (mask?.y || 0)
        const width1 = mask?.width || object.width
        const height1 = mask?.height || object.height



        const x2 = object2.x;
        const y2 = object2.y;
        const width2 = object2.width;
        const height2 = object2.height;

        if (
            x1 + width1 > x2 &&
            x1 < x2 + width2 &&
            y1 + height1 > y2 &&
            y1 < y2 + height2
        ) {
            console.log("Coliding with")
            console.log(object2)
            return true;
        }
        return false;
    }

    isInRange(object, object2, radius = 20) {
        const mask = object.collisionMask

        const x1 = object.x + (mask?.x || 0) - radius
        const y1 = object.y + (mask?.y || 0) - radius
        const width1 = (mask?.width || object.width) + 2 * radius
        const height1 = (mask?.height || object.height) + 2 * radius

        const x2 = object2.x;
        const y2 = object2.y;
        const width2 = object2.width;
        const height2 = object2.height;

        if (
            x1 + width1 > x2 &&
            x1 < x2 + width2 &&
            y1 + height1 > y2 &&
            y1 < y2 + height2
        ) {
            return true;
        }
        return false;
    }

    checkCollision(object) {
        // ptm kontrolovat na zaklade id
        let collision = false
        this.objectList.forEach((objectOther) => {
            if (object.id === objectOther.obj.id || objectOther.collision === false || collision === true)
                return
            if (this.isColliding(object, objectOther.obj) === true)
                collision = true
        })
        return collision
    }

    /// Returns a list of object in player radius.
    getObjectsInRange(object, radius = 0) {
        let objectsInRange = []
        this.objectList.forEach((objectOther) => {
            if (object.id === objectOther.obj.id) return
            if (this.isInRange(object, objectOther.obj, radius))
                objectsInRange.push(objectOther)
        })
        return objectsInRange
    }

    calculateDistance(object, object2) {
        return Math.sqrt((object.x - object2.x) ** 2 + (object.y - object2.y) ** 2)
    }

    getClosestObject(object, radius = 0) {
        const objects = this.getObjectsInRange(object, radius)

        let closestObject = null
        let closestDist = null

        objects.forEach((item, index) => {
            const res = this.calculateDistance(object, item.obj)
            if (index === 0) {
                closestDist = res
                closestObject = item.obj
                return
            }
            if (res < closestDist) {
                closestDist = res
                closestObject = item.obj
            }
        })
        return closestObject
    }

    drawAll(ctx) {
        // neskor spravit sortovanie len pri player pohybe
        this.objectList.sort((a, b) => {
            const maskA = a.obj.collisionMask;
            const maskB = b.obj.collisionMask;

            const yA = a.obj.y + (maskA?.y || 0)
            const yB = b.obj.y + (maskB?.y || 0)


            return yA - yB
        })

        this.objectList.forEach((item) => item.obj.draw(ctx))

        pp
    }
}