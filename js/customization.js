let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let ships = document.querySelectorAll(".ship");
let buttons = [];
let turn = 'player1';
let currentRotation = 0;

gridX = 7;
gridY = 7;

turnLabel.innerHTML = "Turn: Player 1";

for(let i = 0; i < gridX; i++) {
    const row = document.createElement('div');
    row.setAttribute("class", "row");
    row.setAttribute("id", i);
    for(let j = 0; j < gridY; j++) {
        const button = document.createElement('div');
        button.setAttribute("class", "column");
        button.setAttribute("id", j);
        button.innerHTML = "?";
        row.appendChild(button);
        buttons.push(button);
    }
    gridBox.appendChild(row);
}

ships.forEach((ship) => {
    let offsetHeight = buttons[0].offsetHeight;
    let offsetWidth = buttons[0].offsetWidth;
    ship.style.height = (offsetHeight - 90) + "px";
    console.log(offsetWidth)
    console.log(offsetHeight)
    if(ship.id === "3") {
        ship.style.width = (offsetWidth * 3) + 30 + "px";
        ship.addEventListener("mousedown",(e) => {

        });
    }else if(ship.id === "2") {
        ship.style.width = (offsetWidth * 2) + 30 + "px";
        ship.addEventListener("mousedown", (e) => {

        });
    }else if(ship.id === "1") {
        ship.style.width = offsetWidth + 30 + "px";
        ship.addEventListener("mousedown", (e) => {

        });
    }
    ship.addEventListener("click", () => {
        if(currentRotation < 360) {
            currentRotation += 90;
        }else {
            currentRotation = 0;
        }
        ship.style.rotate =  currentRotation + "deg";
    });
})