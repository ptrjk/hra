import { Block } from './classes/Block.js';
import { CollisionMap } from './classes/CollisionMap.js';
import { Player } from './classes/Player.js';
import { Background } from './classes/Background.js';
import { Tree } from './classes/Tree.js';
import { Axe } from './classes/Axe.js';
import { Inventory } from './classes/Inventory.js';
import { Pointer } from './classes/Pointer.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

export const collisions = new CollisionMap()
const player = new Player(137, 71)
export const pointer = new Pointer(20, 20)
export const bg = new Background()
export const inventory = new Inventory()
let selectedblock = 'grass'
let offsetX = 0
let offsetY = 0

const tree = new Tree(20, 20)

bg.generateMap()

const x = new Axe(150, 70)
const itemList = []


window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    if ((event.clientX) / rect.width > 1 || (event.clientY) / rect.height > 1) {
        console.log("off");
        return;
    }

    const playerCenter = {
        x: player.x + player.width / 2,
        y: player.y + player.height / 2
    };
    const cursorCenter = {
        x: Math.floor(((event.clientX) / rect.width) * 320 / 16) * 16,
        y: Math.floor(((event.clientY) / rect.height) * 180 / 16) * 16
    };

    const dist = collisions.calculateDistance(playerCenter, cursorCenter);

    if (dist >= 40) return

    pointer.x = cursorCenter.x
    pointer.y = cursorCenter.y



    console.log(dist)

    // // Define a threshold for the cursor to start moving towards the player
    // const threshold = 40;

    // // Move only if the distance is greater than the threshold
    // if (dist > threshold) {
    //     // Calculate direction vector
    //     const dx = playerCenter.x - cursorCenter.x;
    //     const dy = playerCenter.y - cursorCenter.y;

    //     // Normalize the direction vector
    //     const magnitude = Math.sqrt(dx * dx + dy * dy);
    //     const directionX = dx / magnitude;
    //     const directionY = dy / magnitude;

    //     pointer.updatePosition(directionX, directionY)
    // }
});




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
        ob = new Block('water', x, y, offsetX, offsetY, 4, 1, true)

    }
    else if (selectedblock === 'grass') {
        //ob = new Block('grass', x, y, offsetX, offsetY, 11, 7)
        //collisions.addObject(ob)
        ob = new Axe(x, y) //
        //ob = new Tree(x, y)
    }
    itemList.push(ob)

})

gameLoop()

function drawSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.drawMap(ctx)
    collisions.drawAll(ctx)
    inventory.draw(ctx)
    pointer.draw(ctx)
    // Start a new Path
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2);
    ctx.lineTo(pointer.x + pointer.width / 2, pointer.y + pointer.height / 2);

    // Draw the Path
    ctx.stroke();
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

window.addEventListener('keydown', (e) => {
    if (e.key === 'x') {
        inventory.addItem({
            name: 'axe', qunatity: 1
        })
    }
    if (e.key === 'z') {
        inventory.removeItem('axe')
    }
    if (e.key === 'c') {
        console.log(inventory.items)
    }
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
    //saveToFile(data, 'listOfObjects.json');
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