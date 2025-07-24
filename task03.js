const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // cols
  [0, 4, 8], [2, 4, 6]              // diagonals
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin()) {
        status.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell !== "")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  });
});

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
  status.textContent = `Player ${currentPlayer}'s turn`;
}