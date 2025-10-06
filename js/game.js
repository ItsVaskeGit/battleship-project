let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let buttons = [];

gridX = 5;
gridY = 5;

let player1Ships = 0;
let player2Ships = 0;
let cpuShips = 0;
let turn = 'player1';


//Set the initial turn label
turnLabel.innerHTML = "Turn: Player 1";

// This is used to really initialize grid array that is later going to be used for the game.
// It's for a grid for player 1
for(let i = 0; i < gridX; i++) {
    let sampleArray = []
    for(let j = 0; j < gridY; j++) {
        sampleArray[j] = 0;
    }
    grid1[i] = sampleArray;
}

// This one is the grid for player2 (whether it's cpu or player2)
for(let i = 0; i < gridX; i++) {
    let sampleArray = []
    for(let j = 0; j < gridY; j++) {
        sampleArray[j] = 0;
    }
    grid2[i] = sampleArray;
}

// This is used to append all the rows and columns inside HTML according to the grid size
for(let i = 0; i < gridX; i++) {
    const row = document.createElement('div');
    row.setAttribute("class", "row");
    row.setAttribute("id", i);
    for(let j = 0; j < gridY; j++) {
        const button = document.createElement('div');
        button.setAttribute("class", "column");
        button.setAttribute("id", j);
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
    // TODO Shooting logic
    let x = button.parentElement.id;
    let y = button.id;

    if(turn === "player1") {
        let row = grid1[x];
        if(row[y] === 0) {
            button.style.backgroundImage = "url(../images/splash.gif)";
            button.style.backgroundSize = "cover";
            setTimeout(() => {continueCode(button)}, 500);
        }else if(row[y] === 1) {
            button.style.backgroundImage = "url(../images/detonation.gif)";
            button.style.backgroundSize = "cover";
            setTimeout(() => {continueCode(button)}, 500);
        }
    }
}

// This function determines if the game is finished
function checkWinner() {
    if(gameType === "pve") {
        if(player1Ships === 0 || cpuShips === 0) {
            finishGame();
        }
    }else {
        if(player1Ships === 0 || player2Ships === 0) {
            finishGame();
        }
    }
}

// This function is used to generate random placed ships on the grid
// It is used to fill the grid in if the player requested random grid and(or) if the computer is the other player
function randomizeGrid() {

    let fullGridSize = gridX * gridY;
    let numberOfShips = Math.round(fullGridSize / 4);

    for(let i =  0; i < numberOfShips; i++) {
        let randomX = Math.floor(Math.random() * (gridX + 1));
        let randomY = Math.floor(Math.random() * (gridY + 1));
        let randomShipType = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        let randomDirection = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        let randomDirectionUpDown = Math.floor(Math.random() * (2 - 1 + 1) + 1);

        if(grid2[randomX][randomY] === 0) {
            if(randomShipType === 3) {
                if(randomDirection === 1) {
                    if (randomDirectionUpDown === 1) {
                        if(grid2[randomX - 1][randomY] === 0 && grid2[randomX - 2][randomY] === 0) {
                              grid1[randomX][randomY] = 1;
                              grid1[randomX - 1][randomY] = 1;
                              grid1[randomX - 2][randomY] = 2;
                        }
                    }else {
                        if(grid1[randomX + 1][randomY] === 0 && grid1[randomX + 2][randomY] === 0) {
                            grid1[randomX][randomY] = 1;
                            grid1[randomX + 1][randomY] = 1;
                            grid1[randomX + 2][randomY] = 2;
                        }
                    }
                }else {
                    if(grid1[randomX][randomY - 1] === 0 && grid1[randomX][randomY - 2] === 0) {
                        grid1[randomX][randomY] = 1;
                        grid1[randomX][randomY - 1] = 1;
                        grid1[randomX][randomY - 2] = 2;
                    }
                }
            }
        }
    }

    console.log(grid1)
    if(player1GridRandom) {

    }
}

// This function is used if the other player is cpu, to make a random shot at the grid
function randomShot() {
    let randomX = Math.round(Math.random() * 10) + 1;
    let randomY = Math.round(Math.random() * 10) + 1;
    takeAShot(randomX, randomY);
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
    window.location.replace("../pages/scoreboard.html")
}

const continueCode = () => {
    checkWinner();
    switchTurns();
    if(gameType === 'pve') randomShot();
    return 0;
}