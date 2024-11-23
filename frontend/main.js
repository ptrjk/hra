
import { GameSetup } from './classes/GameSetup.js';




// export const collisions = new CollisionMap()
export const gameSetup = new GameSetup()

let selectedblock = 'grass'
let offsetX = 0
let offsetY = 0





const itemList = []







// window.addEventListener("mousedown", (event) => {
//     const rect = canvas.getBoundingClientRect()
//     if ((event.clientX) / rect.width > 1 || (event.clientY) / rect.height > 1) {
//         console.log("off")
//         return
//     }
//     const x = Math.floor(((event.clientX) / rect.width) * 320 / 16) * 16
//     const y = Math.floor(((event.clientY) / rect.height) * 180 / 16) * 16
//     let ob = null
//     if (selectedblock === 'water') {
//         ob = new Block('water', x, y, offsetX, offsetY, 4, 1, true)

//     }
//     else if (selectedblock === 'grass') {
//         //ob = new Block('grass', x, y, offsetX, offsetY, 11, 7)
//         //collisions.addObject(ob)
//         ob = new Axe(x, y) //
//         //ob = new Tree(x, y)
//     }
//     itemList.push(ob)

// })

gameLoop()

function drawSprite() {
    gameSetup.drawAll()
}

function gameLoop() {
    drawSprite()
    requestAnimationFrame(gameLoop)
}
console.log("main executed")


document.getElementById('grass').addEventListener('click', (e) => {
    selectedblock = 'grass'
    offsetX = document.getElementById('offsetX').value || 0
    offsetY = document.getElementById('offsetY').value || 0
})

// window.addEventListener('keydown', (e) => {
//     if (e.key === 'x') {
//         inventory.addItem({
//             name: 'axe', qunatity: 1
//         })
//     }
//     if (e.key === 'z') {
//         inventory.removeItem('axe')
//     }
//     if (e.key === 'c') {
//         console.log(inventory.items)
//     }
// })

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