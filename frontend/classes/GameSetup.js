import { ObjectsMap } from "./CollisionMap.js";
import { Inventory } from './Inventory.js';
import { Pointer } from './Pointer.js';
import { Background } from './Background.js';
import { Player } from "./Player.js";
import { Tree } from './Tree.js';
import { Axe } from "./Axe.js";
import Camera from "./Camera.js";
import { Hoe } from "./Hoe.js";

const canvas = document.getElementById('game-canvas');
canvas.width = 1920;
canvas.height = 1080;

const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

export const collisions = new ObjectsMap()
export const pointer = new Pointer(20, 20)
export const bg = new Background()
bg.generateMap()
export const inventory = new Inventory()

const tree = new Tree(64, 32)
const axe = new Axe(100, 50)
const hoe = new Hoe(140, 50)

const player = new Player(50, 50)

export const camera = new Camera(canvas.width, canvas.height)

let zoomFactor = 5


canvas.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) {
        zoomFactor *= 1.1 // Zoom in
    } else {
        zoomFactor /= 1.1 // Zoom out
    }
    setCamera()
    event.preventDefault()
});

function setCamera() {
    ctx.setTransform(zoomFactor, 0, 0, zoomFactor, 0, 0)
}

setCamera()

export class GameSetup {
    constructor() {
    }

    drawAll(fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        bg.drawMap(ctx)
        collisions.drawAll(ctx)
        inventory.draw(ctx)
        pointer.draw(ctx)
    }

}

window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    if ((e.clientX) / rect.width > 1 || (e.clientY) / rect.height > 1) {
        console.log("off")
        return
    }

    const cursorCenter = {
        x: Math.floor(e.clientX / rect.width * (canvas.width / zoomFactor) / 16) * 16,
        y: Math.floor(e.clientY / rect.height * (canvas.height / zoomFactor) / 16) * 16
    };

    // const playerCenter = {
    //     x: player.x + player.width / 2,
    //     y: player.y + player.height / 2
    // };
    //const dist = collisions.calculateDistance(playerCenter, cursorCenter);

    // if (dist >= 40) {
    //     pointer.visibility = false
    //     return
    // } else {
    pointer.visibility = true
    // }

    if ((pointer.x != cursorCenter.x || pointer.y != cursorCenter.y)) {
        pointer.updatePosition(cursorCenter.x, cursorCenter.y)
    }
});