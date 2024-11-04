export class Sprite {
    constructor(name, numOfTilesX = 1, numOfTilesY = 1, staticSprite = false) {
        this.name = name
        this.image = new Image()
        this.image.src = `${name}.png`
        this.numOfTilesX = numOfTilesX
        this.numOfTilesY = numOfTilesY
        this.currentFrame = 0
        this.animationSpeed = 200
        this.isLoaded = false
        this.staticSprite = staticSprite

        this.image.onload = () => {
            this.isLoaded = true
        }
        if (!this.staticSprite)
            this.startAnimationInterval()
    }

    startAnimationInterval() {
        if (!this.animationTimer)
            this.animationTimer = setInterval(() => {
                if (this.currentFrame < this.numOfTilesX - 1)
                    this.currentFrame += 1
                else
                    this.currentFrame = 0
            }, this.animationSpeed)
    }

    stopAnimationInterval() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer)
            this.animationTimer = null
            this.currentFrame = 0
        }
    }

    /**
    Draw method
    */
    drawAnimation(ctx, x, y, tileIndex) {
        if (this.isLoaded) {
            let imageWidth = this.image.width
            let imageHeight = this.image.height

            let tileWidth = imageWidth / this.numOfTilesX
            let tileHeight = imageHeight / this.numOfTilesY

            let cx = tileWidth * this.currentFrame
            let cy = tileHeight * tileIndex
            this.drawSprite(ctx, x, y, cx, cy, tileWidth, tileHeight)
        }
    }

    drawStatic(ctx, x, y, tileIndexX, tileIndexY, width = 0, height = 0, e) {
        if (this.isLoaded) {
            let imageWidth = this.image.width
            let imageHeight = this.image.height

            let tileWidth = imageWidth / this.numOfTilesX
            let tileHeight = imageHeight / this.numOfTilesY

            let cx = tileWidth * tileIndexX
            let cy = tileHeight * tileIndexY

            this.drawSprite(ctx, x, y, cx, cy, tileWidth + width, tileHeight + height)
        }
    }

    drawSprite(ctx, x, y, sx = 0, sy = 0, width = null, height = null) {
        width = width ? width : this.image.width
        height = height ? height : this.image.height
        ctx.drawImage(this.image, sx, sy, width, height, x, y, width, height)
    }
}