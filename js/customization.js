let gridBox = document.querySelector(".grid-box");
let turnLabel = document.querySelector("#turn");
let buttons = [];
let turn = 'player1';

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
