let simpleStats = document.querySelectorAll(".simple-stat");
let detailedStats = document.querySelector(".detailed-stats");
let newGame = document.querySelector(".new-game");

let data = JSON.parse(localStorage.getItem("data"));

let player1Wins = data.player1Wins;
let player2Wins = data.player2Wins;
let cpuWins =  data.cpuWins;
let player1WinRatio = data.player1WinRatio;
let player2WinRatio = data.player2WinRatio;
let cpuWinRatio = data.cpuWinRatio;
let gamesPlayed = data.gamesPlayed;
let games = data.games;

simpleStats.forEach((stat) => {
    switch(stat.id) {
        case 'player1-wins':
            stat.innerHTML += " " + player1Wins;
            break;
        case 'player2-wins':
            stat.innerHTML += " " + player2Wins;
            break;
        case 'cpu-wins':
            stat.innerHTML += " " + cpuWins;
            break;
        case 'player1-win-ratio':
            stat.innerHTML += " " + player1WinRatio;
            break;
        case 'player2-win-ratio':
            stat.innerHTML += " " + player2WinRatio;
            break;
        case 'cpu-win-ratio':
            stat.innerHTML += " " + cpuWinRatio;
            break;
        case 'games-played':
            stat.innerHTML += " " + gamesPlayed;
            break;
    }
});

let gameNum = 1;

games.forEach((game) => {
    detailedStats.innerHTML += "" +
        "<div class=\"row\">\n" +
        "        <div class=\"column\">"+ gameNum + "</div>\n" +
        "        <div class=\"column\">" + game.winner +"</div>\n" +
        "        <div class=\"column\">" + game.type + " </div>\n" +
        "        <div class=\"column\">" + game.player1Ships + " </div>\n" +
        "        <div class=\"column\">" + game.player2Ships +"</div>\n" +
        "        <div class=\"column\">" + game.cpuShips + "</div>\n" +
        "</div>";
    gameNum++;
});

newGame.addEventListener("click", () => {
    window.location.replace("../index.html")
});