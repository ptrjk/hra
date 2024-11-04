

export class CollisionMap {

    constructor() {
        this.objectList = []
    }


    addObject(object) {
        this.objectList.push(object)
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
            if (object.id === objectOther.id)
                return false
            if (this.isColliding(object, objectOther) === true)
                collision = true
        })
        return collision
    }

    drawAll(ctx) {
        // neskor spravit sortovanie len pri player pohybe
        this.objectList.sort((a, b) => a.y - b.y)
        this.objectList.forEach((item) => item.draw(ctx))
    }
}