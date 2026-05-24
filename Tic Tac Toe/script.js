const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let ai = "O";
let gameRunning = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

restartBtn.addEventListener("click", restartGame);

function playerMove() {
    const index = this.dataset.index;

    if(board[index] !== "" || !gameRunning){
        return;
    }

    makeMove(index, human);

    if(checkWinner(board, human)){
        statusText.textContent = "You Win!";
        gameRunning = false;
        return;
    }

    if(isDraw()){
        statusText.textContent = "It's a Draw!";
        gameRunning = false;
        return;
    }

    statusText.textContent = "AI Thinking...";

    setTimeout(() => {
        aiMove();
    }, 500);
}

function makeMove(index, player){
    board[index] = player;
    cells[index].textContent = player;
}

function aiMove(){
    let bestScore = -Infinity;
    let move;

    for(let i = 0; i < board.length; i++){

        if(board[i] === ""){
            board[i] = ai;

            let score = minimax(board, 0, false);

            board[i] = "";

            if(score > bestScore){
                bestScore = score;
                move = i;
            }
        }
    }

    makeMove(move, ai);

    if(checkWinner(board, ai)){
        statusText.textContent = "AI Wins!";
        gameRunning = false;
        return;
    }

    if(isDraw()){
        statusText.textContent = "It's a Draw!";
        gameRunning = false;
        return;
    }

    statusText.textContent = "Your Turn (X)";
}

function minimax(board, depth, isMaximizing){

    if(checkWinner(board, ai)){
        return 10 - depth;
    }

    if(checkWinner(board, human)){
        return depth - 10;
    }

    if(board.every(cell => cell !== "")){
        return 0;
    }

    if(isMaximizing){

        let bestScore = -Infinity;

        for(let i = 0; i < board.length; i++){

            if(board[i] === ""){
                board[i] = ai;

                let score = minimax(board, depth + 1, false);

                board[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for(let i = 0; i < board.length; i++){

            if(board[i] === ""){
                board[i] = human;

                let score = minimax(board, depth + 1, true);

                board[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function checkWinner(board, player){

    return winPatterns.some(pattern => {

        return pattern.every(index => {
            return board[index] === player;
        });

    });
}

function isDraw(){
    return board.every(cell => cell !== "");
}

function restartGame(){

    board = ["", "", "", "", "", "", "", "", ""];
    gameRunning = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Your Turn (X)";
}