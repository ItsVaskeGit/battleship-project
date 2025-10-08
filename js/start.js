let gridInputs = document.querySelectorAll(".grid");
let startButtons = document.querySelectorAll(".start-button");
let randomize = document.querySelector(".randomize");

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
            if(player1GridRandom || player2GridRandom) {
                window.location.href = "/pages/customization.html";
            }else {
                window.location.href = "/pages/game.html";
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