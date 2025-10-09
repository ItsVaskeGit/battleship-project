let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let player1Label = document.querySelector("#player-1");
let player2Label = document.querySelector("#player-2")
let buttons = [];

let player1Ships = 0;
let player2Ships = 0;
let turn = 'player1';

//Set the initial turn label
turnLabel.innerHTML = "Turn: Player 1";

// This is used to append all the rows and columns inside HTML according to the grid size
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

// This adds a function of shooting the selected target
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        takeAShot(button);
    });
});

if(gameType === "pve") randomizeGrid();

// This function shoots at the selected target and checks the rest of the flow of the game
function takeAShot(button) {
    let x = button.id;
    let y = button.parentElement.id;

    if(turn === "player1") {
        if(grid2.findIndex(ship => { return ship.x.includes(Number(x))
            && ship.y.includes(Number(y))}) === -1) {
            button.style.backgroundImage = "url(../images/splash.gif)";
            button.style.backgroundSize = "cover";
            setTimeout(() => {continueCode(button)}, 500);
        }else {
            let shipData = grid2.find( ship => { return ship.x.includes(Number(x)) && ship.y.includes(Number(y)) });
            grid2.splice(shipData.index, 1);
            button.style.backgroundImage = "url(../images/detonation.gif)";
            button.style.backgroundSize = "cover";
            player2Ships--;
            player2Label.innerHTML = "Player 2 : " + player2Ships;
            setTimeout(() => {continueCode(button)}, 500);
        }
    }else if(turn === "player2") {
        if(grid1.findIndex(ship => { return ship.x.includes(Number(x)) && ship.y.includes(Number(y))}) === -1) {
            button.style.backgroundImage = "url(../images/splash.gif)";
            button.style.backgroundSize = "cover";
            setTimeout(() => {continueCode(button)}, 500);
        }else {
            let shipData = grid1.find( ship => { return ship.x.includes(Number(x)) && ship.y.includes(Number(y)) });
            grid1.splice(shipData.index, 1);
            button.style.backgroundImage = "url(../images/detonation.gif)";
            button.style.backgroundSize = "cover";
            player1Ships--;
            player1Label.innerHTML = "Player 1 : " + player2Ships;
            setTimeout(() => {continueCode(button)}, 500);
        }
    }else if(turn === "cpu") {
        if(grid1.findIndex(ship => { return ship.x.includes(Number(x)) && ship.y.includes(Number(y))}) === -1) {
            setTimeout(() => {continueCode(button)}, 500);
        }else {
            let shipData = grid1.find( ship => { return ship.x.includes(Number(x)) && ship.y.includes(Number(y)) });
            grid1.splice(shipData.index, 1);
            player1Ships--;
            player1Label.innerHTML = "Player 1 : " + player2Ships;
            setTimeout(() => {continueCode(button)}, 500);
        }
    }
}

// This function determines if the game is finished
function checkWinner() {
    if(player1Ships === 0 || player2Ships === 0) {
        if(gameType === 'pve' && player1Ships === 0) {
            games.push({winner: 'CPU', type: 'PvE', player1Ships: player1Ships, player2Ships: '0', cpuShips: player2Ships});
            cpuWins++;
        }else if(player1Ships === 0 && gameType === 'pvp') {
            games.push({winner: 'Player 2', type: 'PvP', player1Ships: player1Ships, player2Ships: player2Ships, cpuShips: '0'})
            player2Wins++;
        }else if(player2Ships === 0 && gameType === 'pve') {
            games.push({winner: 'Player 1', type: 'PvE', player1Ships: player1Ships, player2Ships: '0', cpuShips: player2Ships})
            player1Wins++;
        }else if(player1Ships === 0 && gameType === 'pvp') {
            games.push({winner: 'Player 2', type: 'PvP', player1Ships: player1Ships, player2Ships: player2Ships, cpuShips: '0'})
            player2Wins++
        }
        finishGame()
    }
}

// This function is used to generate random placed ships on the grid
// It is used to fill the grid in if the player requested random grid and(or) if the computer is the other player
function randomizeGrid() {

    let fullGridSize = gridX * gridY;
    let numberOfShips = Math.round(fullGridSize / 2);

    for(let i =  0; i < numberOfShips; i++) {
        let randomX = Math.floor(Math.random() * gridX);
        let randomY = Math.floor(Math.random() * gridY);
        let randomShipType = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        let randomDirection = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        let randomDirectionUpDown = Math.floor(Math.random() * (2 - 1 + 1) + 1);

        let check0 = [randomX, randomX - 1, randomX - 2];
        let check1 = [randomX, randomX + 1, randomX + 2];
        let check2 = [randomX, randomX + 1];
        let check3 = [randomY, randomY - 1];

        if (gameType === "pve" || player2GridRandom) {
            if (grid2.findIndex((ship) => {
                return ship.x === [randomX] && ship.y === [randomY]
            }) === -1) {
                if (randomShipType === 3) {
                    if (randomDirection === 1) {
                        if (randomDirectionUpDown === 1) {
                            if (randomX === 0) {
                                randomX += 2;
                            } else if (randomX === 1) {
                                randomX += 1;
                            } else if (randomX === gridX) {
                                randomX -= 2;
                            } else if (randomX === (gridX - 1)) {
                                randomX -= 1;
                            } else if (randomX === (gridX - 2)) {
                                randomX -= 1;
                            }
                            if (grid2.length === 0) {
                                grid2.push({
                                    type: 3,
                                    direction: "up",
                                    x: [randomX],
                                    y: [randomY, randomY + 1, randomY + 2]
                                });
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return check0.some(some => ship.y.includes(some))
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return ship.x.includes(randomX)
                                }) === -1) {
                                grid2.push({
                                    type: 3,
                                    direction: "down",
                                    x: [randomX],
                                    y: [randomY, randomY - 1, randomY - 2]
                                });
                                player2Ships += 1;
                            }
                        } else {
                            if (grid2.length === 0) {
                                grid2.push({
                                    type: 3,
                                    direction: "up",
                                    x: [randomX],
                                    y: [randomY, randomY + 1, randomY + 2]
                                });
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return check1.some(some => ship.y.includes(some))
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return ship.x.includes(randomX)
                                }) === -1) {
                                grid2.push({
                                    type: 3,
                                    direction: "up",
                                    x: [randomX],
                                    y: [randomY, randomY + 1, randomY + 2]
                                });
                                player2Ships += 1;
                            }
                        }
                    } else {
                        if (randomDirectionUpDown === 1) {
                            if (randomY === 0) {
                                randomY += 2;
                            } else if (randomY === 1) {
                                randomY += 1;
                            } else if (randomY === gridY) {
                                randomY -= 2;
                            } else if (randomY === (gridY - 1)) {
                                randomY -= 1;
                            }
                            if (grid2.length === 0) {
                                grid2.push({
                                    type: 3,
                                    direction: "left",
                                    x: [randomX, randomX - 1, randomX - 2],
                                    y: [randomY]
                                });
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return check0.some(some => ship.x.includes(some))
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return ship.y.includes(randomY)
                                }) === -1) {
                                grid2.push({
                                    type: 3,
                                    direction: "left",
                                    x: [randomX, randomX - 1, randomX - 2],
                                    y: [randomY]
                                });
                                player2Ships += 1;
                            }
                        } else {
                            if (grid2.length === 0) {
                                grid2.push({
                                    type: 3,
                                    direction: "right",
                                    x: [randomX, randomX + 1, randomX + 2],
                                    y: [randomY]
                                });
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return check1.some(every => ship.x.includes(every))
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return ship.y.includes(randomY)
                                }) === -1) {
                                grid2.push({
                                    type: 3,
                                    direction: "right",
                                    x: [randomX, randomX + 1, randomX + 2],
                                    y: [randomY]
                                });
                                player2Ships += 1;
                            }
                        }
                    }
                } else if (randomShipType === 2) {
                    if (randomDirection === 1) {
                        if (randomX === 0) {
                            randomX += 1;
                        }
                        if (randomDirectionUpDown === 1) {
                            if (grid2.length === 0) {
                                grid2.push({type: 2, direction: "down", x: [randomX], y: [randomY, randomY - 1]});
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return ship.x.includes(randomX)
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return check3.some(some => ship.y.includes(some))
                                }) === -1) {
                                grid2.push({type: 2, direction: "down", x: [randomX], y: [randomY, randomY - 1]});
                                player2Ships += 1;
                            }
                        } else {
                            if (grid2.length === 0) {
                                grid2.push({type: 2, direction: "up", x: [randomX], y: [randomY, randomY + 1]});
                                player2Ships += 1;
                            } else if (grid1.findIndex((ship) => {
                                    return ship.x.includes(randomX)
                                }) === -1 &&
                                grid2.findIndex(ship => {
                                    return check2.some(some => ship.y.includes(some))
                                }) === -1) {
                                grid2.push({type: 2, direction: "up", x: [randomX], y: [randomY, randomY + 1]});
                                player2Ships += 1;
                            }
                        }
                    } else {
                        if (randomDirectionUpDown === 1) {
                            if (randomY === 0) {
                                randomY += 1;
                            }
                            if (grid2.length === 0) {
                                grid2.push({type: 2, direction: "left", x: [randomX], y: [randomY, randomY - 1]});
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return ship.x.includes(randomX)
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return check3.some(some => ship.y.includes(some))
                                })) {
                                grid2.push({type: 2, direction: "left", x: [randomX], y: [randomY, randomY - 1]});
                                player2Ships += 1;
                            }
                        } else {
                            if (grid2.length === 0) {
                                grid2.push({type: 2, direction: "right", x: [randomX], y: [randomY, randomY + 1]});
                                player2Ships += 1;
                            } else if (grid2.findIndex((ship) => {
                                    return ship.x.includes(randomX)
                                }) === -1 &&
                                grid2.findIndex((ship) => {
                                    return check2.some(some => ship.x.includes(some))
                                }) === -1) {
                                grid2.push({type: 2, direction: "right", x: [randomX], y: [randomY, randomY + 1]});
                                player2Ships += 1;
                            }
                        }
                    }
                } else {
                    if (grid2.length === 0) {
                        grid2.push({type: 1, direction: "neutral", x: [randomX], y: [randomY]});
                        player2Ships += 1;
                    } else if (grid2.findIndex((ship) => {
                            return ship.x.includes(randomX)
                        }) === -1 &&
                        grid2.findIndex((ship) => {
                            return ship.y.includes(randomY)
                        }) === -1) {
                        grid2.push({type: 1, direction: "neutral", x: [randomX], y: [randomY]});
                        player2Ships += 1;
                    }
                }
            }
        }
    }

    if(player1GridRandom) {
        for(let i =  0; i < numberOfShips; i++) {
            let randomX = Math.floor(Math.random() * gridX);
            let randomY = Math.floor(Math.random() * gridY);
            let randomShipType = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            let randomDirection = Math.floor(Math.random() * (2 - 1 + 1) + 1);
            let randomDirectionUpDown = Math.floor(Math.random() * (2 - 1 + 1) + 1);

            let check0 = [randomX, randomX - 1, randomX - 2];
            let check1 = [randomX, randomX + 1, randomX + 2];
            let check2 = [randomX, randomX + 1];
            let check3 = [randomY, randomY - 1];

            if(grid1.findIndex((ship) => { return ship.x === [randomX] && ship.y === [randomY]}) === -1) {
                if(randomShipType === 3) {
                    if(randomDirection === 1) {
                        if (randomDirectionUpDown === 1) {
                            if(randomX === 0) {
                                randomX += 2;
                            }else if(randomX === 1) {
                                randomX += 1;
                            }else if(randomX === gridX) {
                                randomX -= 2;
                            }else if(randomX === (gridX - 1)) {
                                randomX -= 1;
                            }else if(randomX === (gridX - 2)) {
                                randomX -= 1;
                            }
                            if(grid1.length === 0) {
                                grid1.push({type: 2, direction: "up", x: [randomX], y: [randomY, randomY + 1, randomY + 2]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return check0.some(some => ship.y.includes(some)) }) === -1 &&
                                grid1.findIndex((ship) => { return ship.x.includes(randomX) }) === -1) {
                                grid1.push({type: 2, direction: "down", x: [randomX], y: [randomY, randomY - 1, randomY - 2]});
                                player1Ships += 1;
                            }
                        }else {
                            if(grid1.length === 0) {
                                grid1.push({type: 2, direction: "up", x: [randomX], y: [randomY, randomY + 1, randomY + 2]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return check1.some(some => ship.y.includes(some)) }) === -1 &&
                                grid1.findIndex((ship) => { return ship.x.includes(randomX) }) === -1) {
                                grid1.push({type: 2, direction: "up", x: [randomX], y: [randomY, randomY + 1, randomY + 2]});
                                player1Ships += 1;
                            }
                        }
                    }else {
                        if (randomDirectionUpDown === 1) {
                            if(randomY === 0) {
                                randomY += 2;
                            }else if(randomY === 1) {
                                randomY += 1;
                            }else if(randomY === gridY) {
                                randomY -= 2;
                            }else if(randomY === (gridY - 1)) {
                                randomY -= 1;
                            }
                            if(grid1.length === 0) {
                                grid1.push({type: 2, direction: "left", x: [randomX, randomX - 1, randomX - 2], y: [randomY]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return check0.some(some => ship.x.includes(some)) }) === -1 &&
                                grid1.findIndex((ship) => { return ship.y.includes(randomY) }) === -1) {
                                grid1.push({type: 2, direction: "left", x: [randomX, randomX - 1, randomX - 2], y: [randomY]});
                                player1Ships += 1;
                            }
                        }else {
                            if(grid1.length === 0) {
                                grid1.push({type: 2, direction: "right", x: [randomX, randomX + 1, randomX + 2], y: [randomY]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return check1.some(every => ship.x.includes(every)) }) === -1 &&
                                grid1.findIndex((ship) => { return ship.y.includes(randomY) }) === -1) {
                                grid1.push({type: 2, direction: "right", x: [randomX, randomX + 1, randomX + 2], y: [randomY]});
                                player1Ships += 1;
                            }
                        }
                    }
                }else if(randomShipType === 2) {
                    if(randomDirection === 1) {
                        if(randomX === 0) {
                            randomX += 1;
                        }
                        if (randomDirectionUpDown === 1) {
                            if(grid1.length === 0) {
                                grid1.push({type: 1, direction: "down", x: [randomX], y: [randomY, randomY - 1]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return ship.x.includes(randomX) }) === -1 &&
                                grid1.findIndex((ship) => { return check3.some(some => ship.y.includes(some))}) === -1) {
                                grid1.push({type: 1, direction: "down", x: [randomX], y: [randomY, randomY - 1]});
                                player1Ships += 1;
                            }
                        }else {
                            if(grid1.length === 0) {
                                grid1.push({type: 1, direction: "up", x: [randomX], y: [randomY, randomY + 1]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return ship.x.includes(randomX) }) === -1 &&
                                grid1.findIndex(ship => { return check2.some(some => ship.y.includes(some)) }) === -1) {
                                grid1.push({type: 1, direction: "up", x: [randomX], y: [randomY, randomY + 1]});
                                player1Ships += 1;
                            }
                        }
                    }else {
                        if (randomDirectionUpDown === 1) {
                            if(randomY === 0) {
                                randomY += 1;
                            }
                            if(grid1.length === 0) {
                                grid1.push({type: 1, direction: "left", x: [randomX], y: [randomY, randomY - 1]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return ship.x.includes(randomX)}) === -1 &&
                            grid1.findIndex((ship) => { return check3.some(some => ship.y.includes(some)) })) {
                                grid1.push({type: 1, direction: "left", x: [randomX], y: [randomY, randomY - 1]});
                                player1Ships += 1;
                            }
                        }else {
                            if(grid1.length === 0) {
                                grid1.push({type: 2, direction: "right", x: [randomX], y: [randomY, randomY + 1]});
                                player1Ships += 1;
                            }else if(grid1.findIndex((ship) => { return ship.x.includes(randomX)}) === -1 &&
                            grid1.findIndex((ship) => { return check2.some(some => ship.x.includes(some))}) === -1) {
                                grid1.push({type: 2, direction: "right", x: [randomX], y: [randomY, randomY + 1]});
                                player1Ships += 1;
                            }
                        }
                    }
                }else {
                    if(grid1.length === 0) {
                        grid1.push({type: 1, direction: "neutral", x: [randomX], y: [randomY]});
                        player1Ships += 1;
                    }else if(grid1.findIndex((ship) => { return ship.x.includes(randomX) }) === -1 &&
                    grid1.findIndex((ship) => { return ship.y.includes(randomY) }) === -1) {
                        grid1.push({type: 1, direction: "neutral", x: [randomX], y: [randomY]});
                        player1Ships += 1;
                    }
                }
            }
        }
    }

    player1Label.innerHTML = "Player 1 : " + player1Ships;
    player2Label.innerHTML = "Player 2 : " + player2Ships;
}

// This function is used if the other player is cpu, to make a random shot at the grid
function randomShot() {
    let randomX = Math.floor(Math.random() * (gridX + 1 - 1));
    let randomY = Math.floor(Math.random() * (gridY + 1 - 1));
    let button = null;
    buttons.forEach((currentButton) => {
        if(currentButton.parentElement.id === String(randomX) && currentButton.id === String(randomY)) {
            button = currentButton;
        }
    });
    takeAShot(button);
}

// This function determines all the possible conditions and switches turns.
function switchTurns() {
    if(turn === "player1" && gameType === "pve") {
        turn = "cpu";
        turnLabel.innerHTML = "Turn: CPU";
    }else if(turn === "player1" && gameType === "pvp") {
        turn = "player2";
        turnLabel.innerHTML = "Turn: Player 2";
    }else if(turn === "cpu" && gameType === "pve") {
        turn = "player1";
        turnLabel.innerHTML = "Turn: Player 1";
    }else if(turn === "player2" && gameType === "pvp") {
        turn = "player1";
        turnLabel.innerHTML = "Turn: Player 1";
    }
}

// This function is used to determine winner and to switch to the scoreboard page, where stats can be evaluated
function finishGame() {
    window.location.href = "../pages/scoreboard.html";
}

const continueCode = (button) => {
    checkWinner();
    switchTurns();
    button.style.backgroundColor = "lightgray";
    button.style.backgroundImage = "";
    if(gameType === 'pve' && turn === "cpu") randomShot();
    return 0;
}