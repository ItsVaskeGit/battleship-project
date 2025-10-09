let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let ships = document.querySelectorAll(".ship");
let buttons = [];
let turn = 'player1';
let currentRotation = 0;

let lastX;
let lastY;

gridX = 7;
gridY = 7;

let dragged = null;
let currentDragOver = null;

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
    let height = buttons[0].scrollHeight;
    let width = buttons[0].scrollWidth;
    ship.style.height = (height - 40) + "px";
    if(ship.id === "cruiser") {
        ship.style.width = (width * 3) + 50 + "px";
    }else if(ship.id === "battleship") {
        ship.style.width = (width * 2) + 80 + "px";
    }else if(ship.id === "boat") {
        ship.style.width = width + 80 + "px";
    }
    ship.addEventListener("dragstart", () => {
        console.log("dragstart")
        dragged = ship;
    });
    ship.addEventListener("dragend", () => {
        ship.style.margin = "20px 30px 20px 30px";
        if(dragged.id === "cruiser") {
            console.log(currentDragOver);
            currentDragOver[0].replaceWith(ship);
            currentDragOver[1].remove();
            currentDragOver[2].remove();
            if(turn === "player1") {

            }else {

            }
        }else if(dragged.id === "battleship") {
            currentDragOver[0].replaceWith(ship);
            currentDragOver[1].remove();
            if(turn === "player1") {

            }else {

            }
        }else {
            currentDragOver[0].replaceWith(ship);
            if(turn === "player1") {

            }else {

            }
        }
        ship.draggable = false;
        ship.removeEventListener("click", onClick);
    });
    ship.addEventListener("click", onClick);
});

buttons.forEach((button) => {
    button.addEventListener("dragover", (e) => {
        if(dragged.id === "cruiser") {
            let nextButton;
            let nextNextButton;
            if(dragged.style.rotate === "90deg") {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id) + 1
                            && Number(currentButton.id) === Number(button.id)});
                nextNextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id) + 2
                            && Number(currentButton.id) === Number(button.id)});
            }else if(dragged.style.rotate === "180deg") {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                            && Number(currentButton.id) === Number(button.id) - 1});
                nextNextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                            && Number(currentButton.id) === Number(button.id) - 2});
            }else if(dragged.style.rotate === "270deg") {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id) - 1
                            && Number(currentButton.id) === Number(button.id)});
                nextNextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id) - 2
                            && Number(currentButton.id) === Number(button.id)});
            }else {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                            && Number(currentButton.id) === Number(button.id) + 1});
                nextNextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                            && Number(currentButton.id) === Number(button.id) + 2});
            }
            currentDragOver = [button, nextButton, nextNextButton];
        }else if(dragged.id === "battleship") {
            let nextButton;
            if(dragged.style.rotate === "90deg") {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id) + 1
                            && Number(currentButton.id) === Number(button.id)});
            }else if(dragged.style.rotate === "180deg") {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                            && Number(currentButton.id) === Number(button.id) - 1});
            }else if(dragged.style.rotate === "270deg") {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id) - 1
                            && Number(currentButton.id) === Number(button.id)});
            }else {
                nextButton =
                    buttons.find(
                        (currentButton) => {return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                            && Number(currentButton.id) === Number(button.id) + 1});
            }
            currentDragOver = [button, nextButton];
        }else if(dragged.id === "boat") {
            currentDragOver = [button];
        }
    });
})

function onClick(e) {
    if(currentRotation < 360) {
        currentRotation += 90;
    }else {
        currentRotation = 0;
    }
    e.target.style.rotate =  currentRotation + "deg";
}