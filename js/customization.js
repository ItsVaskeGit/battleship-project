let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let ships = document.querySelectorAll(".ship");
let next = document.querySelector(".next");
let buttons = [];
let turn = "player1";

let dragged = null;
let currentDragOver = null;

let data = JSON.parse(localStorage.getItem("data"));

let gridX = data.gridX;
let gridY = data.gridY;
let grid1 = data.grid1;
let grid2 = data.grid2;
let gameType = data.gameType;
let player1Wins = data.player1Wins;
let player2Wins = data.player2Wins;
let cpuWins =  data.cpuWins;
let player1GridRandom = data.player1GridRandom;
let player2GridRandom = data.player2GridRandom;
let player1WinRatio = data.player1WinRatio;
let player2WinRatio = data.player2WinRatio;
let cpuWinRatio = data.cpuWinRatio;
let gamesPlayed = data.gamesPlayed;
let games = data.games;

turnLabel.innerHTML = "Turn: Player 1";

for (let i = 0; i < gridX; i++) {
    const row = document.createElement('div');
    row.setAttribute("class", "row");
    row.setAttribute("id", i);
    for (let j = 0; j < gridY; j++) {
        const button = document.createElement('div');
        button.setAttribute("class", "column");
        button.setAttribute("id", j);
        button.innerHTML = "?";
        row.appendChild(button);
        buttons.push(button);
    }
    gridBox.appendChild(row);
}

generateButtonListeners();

ships.forEach((ship) => {
    let height = buttons[0].scrollHeight;
    let width = buttons[0].scrollWidth;
    styleShip(width, height, ship);
    ship.addEventListener("dragstart", () => {
        dragStart(ship);
    });
    ship.addEventListener("dragend", () => {
        dragOver(height, width, ship);
    });
    ship.addEventListener("click", onClick);
});

function generateButtonListeners() {
    buttons.forEach((button) => {
        button.addEventListener("dragover", () => {
            if (dragged.classList[[1]] === "cruiser") {
                let nextButton;
                let nextNextButton;
                if (dragged.style.rotate === "90deg") {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id) + 1
                                        && Number(currentButton.id) === Number(button.id);
                                } else {
                                    return false;
                                }
                            });
                    nextNextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id) + 2
                                        && Number(currentButton.id) === Number(button.id);
                                } else {
                                    return false;
                                }
                            });
                } else if (dragged.style.rotate === "180deg") {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                                        && Number(currentButton.id) === Number(button.id) - 1;
                                } else {
                                    return false;
                                }
                            });
                    nextNextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                                        && Number(currentButton.id) === Number(button.id) - 2;
                                } else {
                                    return false;
                                }
                            });
                } else if (dragged.style.rotate === "270deg") {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id) - 1
                                        && Number(currentButton.id) === Number(button.id);
                                } else {
                                    return false;
                                }
                            });
                    nextNextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id) - 2
                                        && Number(currentButton.id) === Number(button.id);
                                } else {
                                    return false;
                                }
                            });
                } else {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                                        && Number(currentButton.id) === Number(button.id) + 1;
                                } else {
                                    return false;
                                }
                            });
                    nextNextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null) {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                                        && Number(currentButton.id) === Number(button.id) + 2;
                                } else {
                                    return false;
                                }
                            });
                }
                if (button.className === "column") {
                    currentDragOver = [button, nextButton, nextNextButton];
                }
            } else if (dragged.classList[1] === "battleship") {
                let nextButton;
                if (dragged.style.rotate === "90deg") {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null && currentButton.className === "column") {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id) + 1
                                        && Number(currentButton.id) === Number(button.id)
                                } else {
                                    return false;
                                }
                            });
                } else if (dragged.style.rotate === "180deg") {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null && currentButton.className === "column") {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                                        && Number(currentButton.id) === Number(button.id) - 1
                                } else {
                                    return false;
                                }
                            });
                } else if (dragged.style.rotate === "270deg") {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null && currentButton.className === "column") {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id) - 1
                                        && Number(currentButton.id) === Number(button.id)
                                } else {
                                    return false;
                                }
                            });
                } else {
                    nextButton =
                        buttons.find(
                            (currentButton) => {
                                if (currentButton !== null && currentButton.className === "column") {
                                    return Number(currentButton.parentElement.id) === Number(button.parentElement.id)
                                        && Number(currentButton.id) === Number(button.id) + 1
                                } else {
                                    return false;
                                }
                            });
                }
                if (button.className === "column") {
                    currentDragOver = [button, nextButton];
                }
            } else if (dragged.classList[1] === "boat") {
                if (button.className === "column") {
                    currentDragOver = [button];
                }
            }
        });
    })
}

function styleShip(width, height, ship) {
    ship.style.height = (height - 40) + "px";
    if (ship.classList[1] === "cruiser") {
        ship.style.width = (width * 3) + 50 + "px";
    } else if (ship.classList[1] === "battleship") {
        ship.style.width = (width * 2) + 80 + "px";
    } else if (ship.classList[1] === "boat") {
        ship.style.width = width + 80 + "px";
    }
    ship.style.rotate = "0deg";
}

function dragStart(ship) {
    dragged = ship;
}

function dragOver(height, width, ship) {;
    if (dragged.classList[1] === "cruiser") {
        let xAxis = [];
        let yAxis = [];
        xAxis.push(currentDragOver[0].id, currentDragOver[1].id, currentDragOver[2].id);
        yAxis.push(currentDragOver[0].parentElement.id,
            currentDragOver[1].parentElement.id, currentDragOver[2].parentElement.id);
        let xAxisWithoutDuplicates = xAxis.filter((item, index) => xAxis.indexOf(item) === index);
        let yAxisWithoutDuplicates = yAxis.filter((item, index) => yAxis.indexOf(item) === index);
        let parentElement0 = currentDragOver[0].parentElement;
        let parentElement1 = currentDragOver[1].parentElement;
        let parentElement2 = currentDragOver[2].parentElement;
        let cloneNode = ship.cloneNode();
        cloneNode.style.margin = "20px 30px 20px 30px";
        if(Number(ship.style.rotate.split("d")[0]) === 270) {
            let overlayImage = document.createElement("img");
            overlayImage.setAttribute("src", "../images/cruiser.png");
            overlayImage.style.position = "absolute";
            overlayImage.style.zIndex = "10";
            overlayImage.style.objectFit = "cover";
            overlayImage.style.pointerEvents = "none";
            overlayImage.style.transform = "rotate(270deg)";
            overlayImage.style.display = "block";
            overlayImage.style.border = "2px solid black";
            overlayImage.style.borderRadius = "20px";
            overlayImage.style.left = (currentDragOver[0].getBoundingClientRect().left - gridBox.getBoundingClientRect().left - 255) + "px";
            overlayImage.style.top = (currentDragOver[0].getBoundingClientRect().top - gridBox.getBoundingClientRect().top - 25) + "px";
            overlayImage.style.width = (currentDragOver[0].scrollWidth * 5 - 15) + "px";
            overlayImage.style.height = (currentDragOver[0].getBoundingClientRect().bottom - currentDragOver[2].top) + "px";
            gridBox.appendChild(overlayImage);
            currentDragOver[0].style.cursor = "default";
            currentDragOver[1].style.cursor = "default";
            currentDragOver[2].style.cursor = "default";
        }else if(Number(ship.style.rotate.split("d")[0]) === 90) {
            let overlayImage = document.createElement("img");
            overlayImage.setAttribute("src", "../images/cruiser.png");
            overlayImage.style.position = "absolute";
            overlayImage.style.zIndex = "10";
            overlayImage.style.objectFit = "cover";
            overlayImage.style.pointerEvents = "none";
            overlayImage.style.transform = "rotate(90deg)";
            overlayImage.style.display = "block";
            overlayImage.style.border = "2px solid black";
            overlayImage.style.borderRadius = "20px";
            overlayImage.style.left = (currentDragOver[2].getBoundingClientRect().left - gridBox.getBoundingClientRect().left - 255) + "px";
            overlayImage.style.top = (currentDragOver[2].getBoundingClientRect().top - gridBox.getBoundingClientRect().top - 25) + "px";
            overlayImage.style.width = (currentDragOver[0].scrollWidth * 5 - 15) + "px";
            overlayImage.style.height = (currentDragOver[0].getBoundingClientRect().bottom - currentDragOver[2].top) + "px";
            gridBox.appendChild(overlayImage);
            currentDragOver[0].style.cursor = "default";
            currentDragOver[1].style.cursor = "default";
            currentDragOver[2].style.cursor = "default";
        }else {
            parentElement0.replaceChild(cloneNode, currentDragOver[0]);
            parentElement1.removeChild(currentDragOver[1]);
            parentElement2.removeChild(currentDragOver[2]);
        }
        buttons.splice(buttons.findIndex((button) => {
            return button === currentDragOver[0]
        }), 1);
        buttons.splice(buttons.findIndex((button) => {
            return button === currentDragOver[1]
        }), 1);
        buttons.splice(buttons.findIndex((button) => {
            return button === currentDragOver[2]
        }), 1);
        addEntry(xAxisWithoutDuplicates.map(Number), yAxisWithoutDuplicates.map(Number), 3, ship);
    } else if (dragged.classList[1] === "battleship") {
        let xAxis = [];
        let yAxis = [];
        xAxis.push(currentDragOver[0].id, currentDragOver[1].id);
        yAxis.push(currentDragOver[0].parentElement.id,
            currentDragOver[1].parentElement.id);
        let xAxisWithoutDuplicates = xAxis.filter((item, index) => xAxis.indexOf(item) === index);
        let yAxisWithoutDuplicates = yAxis.filter((item, index) => yAxis.indexOf(item) === index);
        let cloneNode = ship.cloneNode();
        cloneNode.style.margin = "20px 30px 20px 30px";
        if(Number(ship.style.rotate.split("d")[0]) === 270) {
            let overlayImage = document.createElement("img");
            overlayImage.setAttribute("src", "../images/battleship.png");
            overlayImage.style.position = "absolute";
            overlayImage.style.zIndex = "10";
            overlayImage.style.objectFit = "cover";
            overlayImage.style.pointerEvents = "none";
            overlayImage.style.transform = "rotate(270deg)";
            overlayImage.style.display = "block";
            overlayImage.style.border = "2px solid black";
            overlayImage.style.borderRadius = "20px";
            overlayImage.style.left = (currentDragOver[0].getBoundingClientRect().left - gridBox.getBoundingClientRect().left - 145) + "px";
            overlayImage.style.top = (currentDragOver[0].getBoundingClientRect().top - gridBox.getBoundingClientRect().top + 90) + "px";
            overlayImage.style.width = (currentDragOver[0].scrollWidth * 3 + 35) + "px";
            overlayImage.style.height = (currentDragOver[0].scrollHeight) + "px";
            gridBox.appendChild(overlayImage);
            currentDragOver[0].style.cursor = "default";
            currentDragOver[1].style.cursor = "default";
        }else if(Number(ship.style.rotate.split("d")[0]) === 90) {
            let overlayImage = document.createElement("img");
            overlayImage.setAttribute("src", "../images/battleship.png");
            overlayImage.style.position = "absolute";
            overlayImage.style.zIndex = "10";
            overlayImage.style.objectFit = "cover";
            overlayImage.style.pointerEvents = "none";
            overlayImage.style.transform = "rotate(90deg)";
            overlayImage.style.display = "block";
            overlayImage.style.border = "2px solid black";
            overlayImage.style.borderRadius = "20px";
            overlayImage.style.left = (currentDragOver[1].getBoundingClientRect().left - gridBox.getBoundingClientRect().left - 145) + "px";
            overlayImage.style.top = (currentDragOver[1].getBoundingClientRect().top - gridBox.getBoundingClientRect().top + 90) + "px";
            overlayImage.style.width = (currentDragOver[0].scrollWidth * 3 + 35) + "px";
            overlayImage.style.height = (currentDragOver[0].scrollHeight) + "px";
            gridBox.appendChild(overlayImage);
            currentDragOver[0].style.cursor = "default";
            currentDragOver[1].style.cursor = "default";
        }else {
            currentDragOver[0].replaceWith(cloneNode);
            currentDragOver[1].remove();
        }
        buttons.splice(buttons.findIndex((button) => {
            return button === currentDragOver[0]
        }), 1);
        buttons.splice(buttons.findIndex((button) => {
            return button === currentDragOver[1]
        }), 1);
        addEntry(xAxisWithoutDuplicates.map(Number), yAxisWithoutDuplicates.map(Number), 2, ship);
    } else if(dragged.classList[1] === "boat"){
        let cloneNode = ship.cloneNode();
        cloneNode.style.margin = "20px 30px 20px 30px";
        addEntry([Number(currentDragOver[0].id)], [Number(currentDragOver[0].parentElement.id)], 1, ship);
        currentDragOver[0].replaceWith(cloneNode);
        buttons.splice(buttons.findIndex((button) => {
            return button === currentDragOver[0]
        }), 1);
    }
}

function onClick(e) {
    if(e.target.style.rotate === "360deg") {
        e.target.style.rotate = "0deg";
    }
    e.target.style.rotate = Number(e.target.style.rotate.split("d")[0]) + 90 + "deg";
}

function addEntry(xAxisWithoutDuplicates, yAxisWithoutDuplicates, type, ship) {
    let rotation = Number(ship.style.rotate.split("d")[0]);
    if (turn === "player1") {
        if (rotation === 90) {
            grid1.push({type: type, direction: "down", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        } else if (rotation === 180) {
            grid1.push({type: type, direction: "left", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        } else if (rotation === 270) {
            grid1.push({type: type, direction: "up", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        } else {
            grid1.push({type: type, direction: "right", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }
    } else {
        if (rotation === 90) {
            grid2.push({type: type, direction: "down", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        } else if (rotation === 180) {
            grid2.push({type: type, direction: "left", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        } else if (rotation === 270) {
            grid2.push({type: type, direction: "up", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        } else {
            grid2.push({type: type, direction: "right", x: xAxisWithoutDuplicates, y: yAxisWithoutDuplicates});
        }
    }
}

next.addEventListener("click", () => {
    if(turn === "player1" && games === "pve") {
        let data = { gridX: gridX,
            gridY: gridY,
            player1GridRandom: player1GridRandom,
            player2GridRandom: player2GridRandom,
            gameType: gameType,
            grid1: grid1,
            grid2: grid2,
            player1Wins: player1Wins,
            player2Wins: player2Wins,
            cpuWins: cpuWins,
            player1WinRatio: player1WinRatio,
            player2WinRatio: player2WinRatio,
            cpuWinRatio: cpuWinRatio,
            gamesPlayed: gamesPlayed,
            games: games};
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(data));
        window.location.href = "../pages/game.html";
    }
    if (turn === "player1" && !player2GridRandom && grid2.length === 0) {
        turn = "player2";
        gridBox.innerHTML = "";
        buttons = [];
        for (let i = 0; i < gridX; i++) {
            const row = document.createElement('div');
            row.setAttribute("class", "row");
            row.setAttribute("id", i);
            for (let j = 0; j < gridY; j++) {
                const button = document.createElement('div');
                button.setAttribute("class", "column");
                button.setAttribute("id", j);
                button.innerHTML = "?";
                row.appendChild(button);
                buttons.push(button);
            }
            gridBox.appendChild(row);
        }
        generateButtonListeners();
        turnLabel.innerHTML = "Turn: Player 2";
    }
    if (turn === "player2" && !player1GridRandom && data.grid1.length === 0) {
        turn = "player1";
        gridBox.innerHTML = "";
        buttons = [];
        for (let i = 0; i < gridX; i++) {
            const row = document.createElement('div');
            row.setAttribute("class", "row");
            row.setAttribute("id", i);
            for (let j = 0; j < gridY; j++) {
                const button = document.createElement('div');
                button.setAttribute("class", "column");
                button.setAttribute("id", j);
                button.innerHTML = "?";
                row.appendChild(button);
                buttons.push(button);
            }
            gridBox.appendChild(row);
            turnLabel.innerHTML = "Turn: Player 1";
        }
    }
    if (turn === "player1" && !player1GridRandom && player2GridRandom) {
        let data = { gridX: gridX,
            gridY: gridY,
            player1GridRandom: player1GridRandom,
            player2GridRandom: player2GridRandom,
            gameType: gameType,
            grid1: grid1,
            grid2: grid2,
            player1Wins: player1Wins,
            player2Wins: player2Wins,
            cpuWins: cpuWins,
            player1WinRatio: player1WinRatio,
            player2WinRatio: player2WinRatio,
            cpuWinRatio: cpuWinRatio,
            gamesPlayed: gamesPlayed,
            games: games};
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(data));
        window.location.href = "../pages/game.html";
    }
    if(turn === "player2" && grid1.length > 0 && grid2.length > 0) {
        let data = { gridX: gridX,
            gridY: gridY,
            player1GridRandom: player1GridRandom,
            player2GridRandom: player2GridRandom,
            gameType: gameType,
            grid1: grid1,
            grid2: grid2,
            player1Wins: player1Wins,
            player2Wins: player2Wins,
            player1Ships: grid1.length,
            player2Ships: grid2.length,
            cpuWins: cpuWins,
            player1WinRatio: player1WinRatio,
            player2WinRatio: player2WinRatio,
            cpuWinRatio: cpuWinRatio,
            gamesPlayed: gamesPlayed,
            games: games};
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(data));
        window.location.href = "../pages/game.html";
    }
})