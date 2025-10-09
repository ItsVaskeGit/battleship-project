let gridInputs = document.querySelectorAll(".grid");
let startButtons = document.querySelectorAll(".start-button");
let randomize = document.querySelector(".randomize");
let gridX = document.querySelector("#grid-x");
let gridY = document.querySelector("#grid-x");
let player1Randomized = document.querySelector("#player1-randomize");
let player2Randomized = document.querySelector("#player2-randomize");

let data = { gridX: 0,
    gridY: 0,
    player1GridRandom: false,
    player2GridRandom: false,
    grid1: [],
    grid2: [],
    player1Wins: 0,
    player2Wins: 0,
    cpuWins: 0,
    player1WinRatio: 0,
    player2WinRatio: 0,
    cpuWinRatio: 0,
    gamesPlayed: 0,
    games: []};

randomize.addEventListener("click", () => {
   let random = Math.round(Math.random() * 10) -1;
   gridInputs.forEach((input) => {
       input.value = random;
   });
});

startButtons.forEach((button) => {
    button.addEventListener("click", () => {
        data.gridX = gridX.value;
        data.gridY = gridY.value;
        let fetchedData = JSON.parse(localStorage.getItem("data"));
        if(fetchedData !== null) {
            data.player1Wins = fetchedData.player1Wins;
            data.player2Wins = fetchedData.player2Wins;
            data.cpuWins = fetchedData.cpuWins;
            data.player1WinRatio = fetchedData.player1WinRatio;
            data.player2WinRatio = fetchedData.player2WinRatio;
            data.cpuWinRatio = fetchedData.cpuWinRatio;
            data.gamesPlayed = fetchedData.gamesPlayed;
            data.games = fetchedData.games;
            localStorage.removeItem("data");
            localStorage.setItem("data", JSON.stringify(data));
        }else {
            localStorage.setItem("data", JSON.stringify(data));
        }
        if(button.id === "pvp") {
            data.gameType = "pvp";
            if(data.player1GridRandom && data.player2GridRandom) {
                window.location.href = "/pages/game.html";
            }else {
                window.location.href = "/pages/customization.html";
            }
        }
        if(button.id === "pve") {
            data.gameType = "pve";
            if(data.player1GridRandom) {
                window.location.href = "/pages/game.html";
            }else {
                window.location.href = "/pages/customization.html";
            }
        }
    });
});

player1Randomized.addEventListener("click", () => {
    if(data.player1GridRandom) {
        data.player1GridRandom = false;
        player1Randomized.style.backgroundColor = "lightgray";
    }else {
        data.player1GridRandom = true;
        player1Randomized.style.backgroundColor = "aqua";
    }
});

player2Randomized.addEventListener("click", () => {
    if(data.player2GridRandom) {
        data.player2GridRandom = false;
        player2Randomized.style.backgroundColor = "lightgray";
    }else {
        data.player2GridRandom = true;
        player2Randomized.style.backgroundColor = "aqua";
    }
});