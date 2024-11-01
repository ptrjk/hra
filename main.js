import { Block } from './classes/Block.js';
import { CollisionMap } from './classes/CollisionMap.js';
import { Player } from './classes/Player.js';
import { Background } from './classes/Background.js';
import { GrassTile } from './classes/GrassTile.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

export const collisions = new CollisionMap()
const player = new Player(20, 0)
export const bg = new Background()
bg.generateMap()
// collisions.addObject(player)

const itemList = []



window.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(((event.clientX) / rect.width) * 320 / 16) * 16
    const y = Math.floor(((event.clientY) / rect.height) * 180 / 16) * 16
    const ob = new GrassTile(x, y)
    itemList.push(ob)
    bg.listOfTiles.push(ob)
    collisions.addObject(ob)
})

window.addEventListener("keydown", (e) => {
    if (e.key === 'c') {
        console.log(collisions.checkCollision(player))
        ctx.scale(1.1, 1.1)
    }
})
ctx.font = '8px monospace'; // Example font for pixel look
ctx.fillStyle = 'black';      // Text color
ctx.textAlign = 'center';     // Center-align text horizontally
ctx.textBaseline = 'middle';
gameLoop()

function drawSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.drawMap(ctx)
    itemList.forEach(item => item.draw(ctx))
    player.draw(ctx)
    ctx.fillText('Hello, Player!', canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    drawSprite()
    requestAnimationFrame(gameLoop)
}
console.log("main executed")


ctx.imageSmoothingEnabled = false;

