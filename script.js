const board = document.getElementById("board");
const statusText = document.getElementById("turn");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Create the game board
function createBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    });
}

// Handle player clicks
function handleCellClick(e) {
    const index = e.target.dataset.index;

    // If cell is already filled or game is over, ignore
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        highlightWinningCells();
    } else if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check if current player has won
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Highlight winning cells
function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            combination.forEach(index => {
                board.children[index].classList.add("winning-cell");
            });
        }
    });
}

// Reset the game
resetBtn.addEventListener("click", () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    createBoard();
});

// Initialize game
createBoard();