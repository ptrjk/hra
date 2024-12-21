import { ObjectsMap } from "./CollisionMap.js";
import { Inventory } from '../GUI/Inventory.js';
import { Pointer } from '../GUI/Pointer.js';
import { Background } from './Background.js';
import { Player } from "../Player.js";
import { Tree } from '../Tree.js';
import { Axe } from "../Axe.js";
import Camera from "./Camera.js";
import { Hoe } from "../Hoe.js";
import { Seed_Wheat } from "../Seed_wheat.js";
import { PlantTile } from "../PlantTile.js";
import { Wheat } from "../Wheat.js";

const canvas = document.getElementById('game-canvas');
checkPixels()
canvas.width = 960;
canvas.height = 540;

const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

export const collisions = new ObjectsMap()
export const pointer = new Pointer(20, 20)
export const bg = new Background()
bg.generateMap()
export const inventory = new Inventory()

const tree = new Tree(200, 50)
const axe = new Axe(100, 50)
const hoe = new Hoe(140, 50)
const seedwheat = new Seed_Wheat(100, 70)
const planttile = new PlantTile(32, 32)
const wheat = new Wheat(32, 32)


const player = new Player(50, 50)

export const camera = new Camera(canvas.width, canvas.height)

let zoomFactor = 2.8


canvas.addEventListener("wheel", (event) => {
    event.preventDefault()
    if (event.deltaY < 0) {
        zoomFactor *= 1.1 // Zoom in
    } else {
        zoomFactor /= 1.1 // Zoom out
    }
    setCamera()
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
        planttile.draw(ctx)
        collisions.drawAll(ctx)
        inventory.draw(ctx)
        pointer.draw(ctx)



        //checkPixels(); // Now you should see non-zero RGB values

        ctx.fillStyle = "white";

        // Draw the text
        ctx.fillText(fps, 10, 10);
    }

}

window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    if ((e.clientX) / rect.width > 1 || (e.clientY) / rect.height > 1) {
        console.log("off")
        return
    }

    const cursorCenter = {
        x: Math.floor((e.clientX / rect.width * (canvas.width / zoomFactor) + camera.x) / 16) * 16,
        y: Math.floor((e.clientY / rect.height * (canvas.height / zoomFactor) + camera.y) / 16) * 16
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

function checkPixels() {
    console.log("checking");
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");

    // Get the image data (array of pixel data)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data; // This is a 1D array of RGBA values

    const test = Math.floor(Math.random() * 256)

    // Loop through each pixel
    for (let i = 0; i < pixels.length / 2; i += 4) {
        // Set each pixel's color to black (R=0, G=0, B=0, A=255)
        pixels[i] = test     // Red
        pixels[i + 1] = test // Green
        pixels[i + 2] = test // Blue
        pixels[i + 3] = 255; // Alpha (fully opaque)
    }

    // Write the modified pixel data back to the canvas
    ctx.putImageData(imageData, 0, 0);

    console.log("All pixels changed to black.");
}
