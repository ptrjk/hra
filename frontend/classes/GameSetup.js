import { CollisionMap } from "./CollisionMap.js";
import { Inventory } from './Inventory.js';
import { Pointer } from './Pointer.js';
import { Background } from './Background.js';
import { Player } from "./Player.js";
import { Tree } from './Tree.js';
import { Axe } from "./Axe.js";
import Camera from "./Camera.js";

const canvas = document.getElementById('game-canvas');
canvas.width = 1920;
canvas.height = 1080;

const ctx = canvas.getContext('2d');


ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;



export const collisions = new CollisionMap()
export const pointer = new Pointer(20, 20)
export const bg = new Background()
bg.generateMap()
export const inventory = new Inventory()


const tree = new Tree(64, 32)
const axe = new Axe(100, 50)
const player = new Player(50, 50)

// const playerImage = new Image();
// playerImage.src = 'assets/testplayer.png'; // Replace with your image URL
// playerImage.onload = () => player.load = true
// // Game objects
// const player = { x: 20, y: 20, width: 32, height: 32, load: false };

export const camera = new Camera(canvas.width, canvas.height)
// export const camera = new Camera()

let pointx = 0
let scale = 1

const playerr = {
    x: 2 / 2, // Start at the center of the world
    y: 2 / 2,
    width: 32, // Sprite dimensions
    height: 32,
    speed: 5,
    image: new Image(),
};

let test = 0
let zoomFactor = 5

canvas.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) {
        zoomFactor *= 1.1; // Zoom in
    } else {
        zoomFactor /= 1.1; // Zoom out
    }
    setCamera();
    event.preventDefault();
});

function setCamera() {
    console.log(zoomFactor)
    ctx.setTransform(zoomFactor, 0, 0, zoomFactor, 0, 0);
}

setCamera()

playerr.image.src = 'assets/testplayer.png';

export class GameSetup {
    constructor() {
    }

    drawAll(fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(-camera.x, 0)

        if (player.load === false) return

        console.log(player.x)
        // console.log(camera.x)

        // Draw all game objects with the scaled context
        bg.drawMap(ctx);
        collisions.drawAll(ctx);
        inventory.draw(ctx);
        ctx.restore();
        // pointer.draw(ctx);

        // ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);


    }

}

window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    if ((e.clientX) / rect.width > 1 || (e.clientY) / rect.height > 1) {
        console.log("off");
        return;
    }

    const playerCenter = {
        x: player.x + player.width / 2,
        y: player.y + player.height / 2
    };
    const cursorCenter = {
        x: Math.floor(((e.clientX / rect.width) * (320 / scale) + pointx) / 16) * 16,
        y: Math.floor((e.clientY / rect.height) * (180 / scale) / 16) * 16
    };

    const dist = collisions.calculateDistance(playerCenter, cursorCenter);

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