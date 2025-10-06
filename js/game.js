let gridBox = document.querySelector(".grid-box");
let buttons = document.querySelectorAll(".column");

gridX = 5;
gridY = 5;

let turn = 'player1';

let sampleArray = [];

for(let i = 0; i < gridX; i++) {
    for(let j = 0; j < gridY; j++) {
        sampleArray[j] = 0;
    }
    grid[i] = sampleArray;
    sampleArray = [];
}

for(let i = 0; i < gridX; i++) {
    let row = "";
    row += "<div id=\"" + i + "\" class=\"grid\">";
    for(let j = 0; j < gridY; j++) {
        row += "<div id=\"" + j + "\" class=\"column\"></div>";
    }
    row += "</div>";
    gridBox.innerHTML += row;
}

function takeAShot(x, y) {
    // TODO Shooting logic

    checkWinner();
    switchTurns();
    if(gameType === 'pve') randomShot();
}

function checkWinner() {

}

function randomizeGrid() {

}

function randomShot() {
    // this function is only used if player is playing against the cpu
}

function switchTurns() {

}