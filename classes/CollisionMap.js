

export class CollisionMap {

    constructor() {
        this.objectList = []
    }


    addObject(object) {
        this.objectList.push(object)
        // console.log(this.objectList)
    }

    isColliding(object, object2) {
        if ((object.x + object.width > object2.x && object.x < object2.x + object2.width)
            && (object.y + object.height > object2.y && object.y < object2.y + object2.height)) {
            return true
        }
        return false
    }

    checkCollision(object) {
        // ptm kontrolovat na zaklade id
        let collision = false
        this.objectList.forEach((objectOther) => {
            if (object === objectOther)
                return
            if (this.isColliding(object, objectOther) === true)
                collision = true
        })
        return collision
    }
}