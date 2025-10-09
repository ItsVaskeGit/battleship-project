let gridInputs = document.querySelectorAll(".grid");
let startButtons = document.querySelectorAll(".start-button");
let randomize = document.querySelector(".randomize");
let player1Randomized = document.querySelector("#player1-randomize");
let player2Randomized = document.querySelector("#player2-randomize");

randomize.addEventListener("click", () => {
   let random = Math.round(Math.random() * 10) -1;
   gridInputs.forEach((input) => {
       input.value = random;
   });
});

startButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(button.id === "pvp") {
            gameType = "pvp";
            if(player1GridRandom && player2GridRandom) {
                window.location.href = "/pages/game.html";
            }else {
                window.location.href = "/pages/customization.html";
            }
        }else {
            gameType = "pve";
            if(player1GridRandom) {
                window.location.href = "/pages/game.html";
            }else {
                window.location.href = "/pages/customization.html";
            }
        }
        gridInputs.forEach((input) => {
            if(input.id === "grid-x") {
                gridX = input.value;
            }else {
                gridY = input.value;
            }
        });
    });
});

player1Randomized.addEventListener("click", () => {
    if(player1GridRandom) {
        player1GridRandom = false;
        player1Randomized.style.backgroundColor = "lightgray";
    }else {
        player1GridRandom = true;
        player1Randomized.style.backgroundColor = "aqua";
    }
});

player2Randomized.addEventListener("click", () => {
    if(player2GridRandom) {
        player2GridRandom = false;
        player2Randomized.style.backgroundColor = "lightgray";
    }else {
        player2GridRandom = true;
        player2Randomized.style.backgroundColor = "aqua";
    }
});