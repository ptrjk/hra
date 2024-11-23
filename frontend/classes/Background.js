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

// Function to save data to a file
function saveToFile(data, filename) {
    // Create a Blob with the data (JSON format)
    const blob = new Blob([data], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = filename;

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by removing the link element
    document.body.removeChild(link);
}