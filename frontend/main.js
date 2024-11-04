import { Block } from './classes/Block.js';
import { CollisionMap } from './classes/CollisionMap.js';
import { Player } from './classes/Player.js';
import { Background } from './classes/Background.js';
import { Tree } from './classes/Tree.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

export const collisions = new CollisionMap()
const player = new Player(20, 0)
export const bg = new Background()
let selectedblock = 'grass'
let offsetX = 0
let offsetY = 0
bg.generateMap()

const itemList = []



window.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect()
    if ((event.clientX) / rect.width > 1 || (event.clientY) / rect.height > 1) {
        console.log("off")
        return
    }
    const x = Math.floor(((event.clientX) / rect.width) * 320 / 16) * 16
    const y = Math.floor(((event.clientY) / rect.height) * 180 / 16) * 16
    let ob = null
    if (selectedblock === 'water') {
        //ob = new WaterTile(x, y, 0, 0)
        ob = new Block('water', x, y, offsetX, offsetY, 4, 1, true)
        //ob = new Block('water', x, y, offsetX, offsetY)
    }
    else if (selectedblock === 'grass') {
        ob = new Tree(x, y) // new Block('grass', x, y, offsetX, offsetY, 11, 7)
        //ob = new Block('water', x, y, offsetX, offsetY)
    }
    itemList.push(ob)
    bg.addObject(ob)

})

gameLoop()

function drawSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.drawMap(ctx)
    collisions.drawAll(ctx)
}

function gameLoop() {
    drawSprite()
    requestAnimationFrame(gameLoop)
}
console.log("main executed")


ctx.imageSmoothingEnabled = false;

document.getElementById('grass').addEventListener('click', (e) => {
    selectedblock = 'grass'
    offsetX = document.getElementById('offsetX').value || 0
    offsetY = document.getElementById('offsetY').value || 0
})

document.getElementById('water').addEventListener('click', (e) => {
    selectedblock = 'water'
    offsetX = document.getElementById('offsetX').value || 0
    offsetY = document.getElementById('offsetY').value || 0

    const preparedData = bg.listOfTiles.map((item) => {
        const { sprite, id, ...rest } = item
        return { ...rest, name: sprite.name }
    })
    const data = JSON.stringify(preparedData)
    saveToFile(data, 'listOfObjects.json');
})



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