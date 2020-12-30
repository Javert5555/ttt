let gameArea = document.getElementById("gameArea");
let cell = document.getElementsByClassName("cell");
let currentPlayer = document.getElementById("curPlyr");

let symbol = "x";
let stat = {
    "x": 0,
    "o": 0,
    "d": 0
}

let winCond = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9],
]

for (let i = 1; i <= 9; i++) {
    gameArea.innerHTML += "<div class = 'cell' id = '"+ i +"'></div>";
}

for (let element of cell) {
element.addEventListener('click', drawSymbol, false);
}

function drawSymbol () {

    let data = [];

    if (!this.innerHTML) {
        this.innerHTML = symbol;
    }
    else {
        alert("ячейка занята");
        return;
    }

    for (let i in cell) {
        if (cell[i].innerHTML == symbol) {
            data.push(parseInt(cell[i].getAttribute('id')));
        }
    }
    
    console.log(data);

    if (checkWinCond(data)) {
        stat[symbol] += 1;
        newGame(`Winner: ${symbol}`);
    }
    else {
        let draw = true;
        for (let i in cell) {
            if (cell[i].innerHTML == "") draw = false;
        }

        if (draw) {
            stat["d"] += 1;
            newGame("ничья");
        }
    }
    
    symbol = symbol == "x" ? "o" : "x";
    currentPlayer.innerHTML = symbol.toUpperCase();

}

function checkWinCond (cond) {
    for (let i in winCond) {
        let win = true;

        for (let j in winCond[i]) {
            let id = winCond[i][j];
            let index = cond.indexOf(id);

            if (index == -1) {
                win = false;
            }
        }

        if (win) return win;
    }
    return false;
}

function newGame (text) {
    alert (text);
    console.log(stat)
    for (let element of cell) {
        element.innerHTML = "";
    }
    updateStat();
}

function updateStat () {
    let resX = document.getElementById("sX");
    let resO = document.getElementById("sO");
    let resD = document.getElementById("sD");

    resX.innerHTML = stat["x"];
    resO.innerHTML = stat["o"];
    resD.innerHTML = stat["d"];
}