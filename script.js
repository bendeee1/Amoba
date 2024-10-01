const boardSize = 10;
let currentPlayer = "X";
let board = Array(boardSize).fill().map(() => Array(boardSize).fill("")); 

function createGame() {
    const body = document.body;

    const title = document.createElement('h1');
    title.textContent = "10x10 amoba";
    body.appendChild(title);

    const gameBoard = document.createElement('div');
    gameBoard.id = "game-board";
    body.appendChild(gameBoard);

    const statusText = document.createElement('p');
    statusText.id = "status";
    body.appendChild(statusText);
    
    const restartButton = document.createElement('button');
    restartButton.id = "restart-btn";
    restartButton.textContent = "Új játék";
    restartButton.addEventListener("click", resetGame);
    body.appendChild(restartButton);
    
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
    
    statusText.textContent = `Játékos: ${currentPlayer}`;
}

function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin(row, col)) {
            document.getElementById("status").textContent = `${currentPlayer} nyert!`;
            document.getElementById("restart-btn").style.display = "block"; 
            removeEventListeners();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").textContent = `Játékos: ${currentPlayer}`;
        }
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || 
           checkDirection(row, col, 0, 1) || 
           checkDirection(row, col, 1, 1) || 
           checkDirection(row, col, 1, -1);  
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countInDirection(row, col, rowDir, colDir);
    count += countInDirection(row, col, -rowDir, -colDir);
    return count >= 5; 
}

function countInDirection(row, col, rowDir, colDir) {
    let r = parseInt(row) + rowDir;
    let c = parseInt(col) + colDir;
    let count = 0;

    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }

    return count;
}

function removeEventListeners() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.removeEventListener("click", handleCellClick);
    });
}

function resetGame() {

    board = Array(boardSize).fill().map(() => Array(boardSize).fill(""));
    currentPlayer = "X";
    
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleCellClick); 
    });
    
    document.getElementById("status").textContent = `Játékos: ${currentPlayer}`;
    document.getElementById("restart-btn").style.display = "none"; 
}

createGame();
