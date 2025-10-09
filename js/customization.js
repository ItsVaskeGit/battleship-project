let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let ships = document.querySelectorAll(".ship");
let buttons = [];
let turn = 'player1';
let currentRotation = 0;

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
            let xAxis = [];
            let yAxis = [];
            xAxis.push(currentDragOver[0].id, currentDragOver[1].id, currentDragOver[2].id);
            yAxis.push(currentDragOver[0].parentElement.id,
                currentDragOver[1].parentElement.id, currentDragOver[2].parentElement.id);
            let xAxisWithoutDuplicates = xAxis.filter((item, index) => xAxis.indexOf(item) === index);
            let yAxisWithoutDuplicates = yAxis.filter((item, index) => yAxis.indexOf(item) === index);
            currentDragOver[0].replaceWith(ship);
            currentDragOver[1].remove();
            currentDragOver[2].remove();
            addEntry(xAxisWithoutDuplicates.map(Number), yAxisWithoutDuplicates.map(Number));
        }else if(dragged.id === "battleship") {
            let xAxis = [];
            let yAxis = [];
            xAxis.push(currentDragOver[0].id, currentDragOver[1].id);
            yAxis.push(currentDragOver[0].parentElement.id,
                currentDragOver[1].parentElement.id);
            let xAxisWithoutDuplicates = xAxis.filter((item, index) => xAxis.indexOf(item) === index);
            let yAxisWithoutDuplicates = yAxis.filter((item, index) => yAxis.indexOf(item) === index);
            currentDragOver[0].replaceWith(ship);
            currentDragOver[1].remove();
            addEntry(xAxisWithoutDuplicates.map(Number), yAxisWithoutDuplicates.map(Number));
        }else {
            currentDragOver[0].replaceWith(ship);
            addEntry([Number(currentDragOver[0].id)], [Number(currentDragOver[0].parentElement.id)]);
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

function addEntry(xAxisWithoutDuplicates, yAxisWithoutDuplicates) {
    if(turn === "player1") {
        if(dragged.rotate === "90deg") {
            grid1.push({type: 3, direction: "down", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }else if(dragged.rotate === "180") {
            grid1.push({type: 3, direction: "left", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }else if(dragged.rotate === "270") {
            grid1.push({type: 3, direction: "up", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }else {
            grid1.push({type: 3, direction: "right", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }
        console.log(grid1);
    }else {
        if(dragged.rotate === "90deg") {
            grid2.push({type: 3, direction: "down", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }else if(dragged.rotate === "180") {
            grid2.push({type: 3, direction: "left", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }else if(dragged.rotate === "270") {
            grid2.push({type: 3, direction: "up", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }else {
            grid2.push({type: 3, direction: "right", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }
        console.log(grid2);
    }
}