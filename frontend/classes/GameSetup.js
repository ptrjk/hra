import { CollisionMap } from "./CollisionMap.js";
import { Inventory } from './Inventory.js';
import { Pointer } from './Pointer.js';
import { Background } from './Background.js';
import { Player } from "./Player.js";
import { Tree } from './Tree.js';
import { Axe } from "./Axe.js";

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;


export const collisions = new CollisionMap()
export const pointer = new Pointer(20, 20)
export const bg = new Background()
bg.generateMap()
export const inventory = new Inventory()

const player = new Player(137, 71)
const tree = new Tree(64, 32)
const axe = new Axe(100, 50)


export class GameSetup {
    constructor() {
    }

    drawAll() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        bg.drawMap(ctx)
        collisions.drawAll(ctx)
        inventory.draw(ctx)
        pointer.draw(ctx)
        player.drawDebug(ctx)
    }
}

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

    // if (dist >= 40) {
    //     pointer.visibility = false
    //     return
    // } else {
        pointer.visibility = true
   // }

    pointer.x = cursorCenter.x
    pointer.y = cursorCenter.y
});