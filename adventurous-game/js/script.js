const gameTitle = "Adventurous Game";
const instructions = "Use arrow keys to move. Collect treasures and avoid traps!";
let playerPosition = { x: 0, y: 0 };
let treasures = [];
let traps = [];
const gridSize = 5;
let gameStarted = false;

function initializeGame() {
    createGrid();
    placeTreasures();
    placeTraps();
    updateDisplay();
}

function createGrid() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = ""; // Clear the grid
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = j;
            cell.dataset.y = i;
            gameArea.appendChild(cell);
        }
    }
}

function placeTreasures() {
    treasures = [];
    for (let i = 0; i < 3; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        treasures.push({ x, y });
    }
}

function placeTraps() {
    traps = [];
    for (let i = 0; i < 2; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        traps.push({ x, y });
    }
}

function updateDisplay() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("player", "treasure", "trap");
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        if (x === playerPosition.x && y === playerPosition.y) {
            cell.classList.add("player");
        }
        if (treasures.some(t => t.x === x && t.y === y)) {
            cell.classList.add("treasure");
        }
        if (traps.some(t => t.x === x && t.y === y)) {
            cell.classList.add("trap");
        }
    });
}

function movePlayer(dx, dy) {
    if (!gameStarted) {
        alert("Please start the game first!");
        return;
    }
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        checkGameState();
        updateDisplay();
    }
}

function checkGameState() {
    if (treasures.some(t => t.x === playerPosition.x && t.y === playerPosition.y)) {
        treasures = treasures.filter(t => !(t.x === playerPosition.x && t.y === playerPosition.y));
        alert("You collected a treasure!");
    }
    if (traps.some(t => t.x === playerPosition.x && t.y === playerPosition.y)) {
        alert("You hit a trap! Game Over.");
        resetGame();
    }
}

function resetGame() {
    playerPosition = { x: 0, y: 0 };
    treasures = [];
    traps = [];
    gameStarted = false;
    document.getElementById("start-button").innerText = "Start Game";
    initializeGame();
}

document.getElementById("start-button").addEventListener("click", () => {
    if (!gameStarted) {
        resetGame();
        gameStarted = true;
        document.getElementById("start-button").innerText = "Game Started!";
    }
});

document.addEventListener("keydown", (event) => {
    if (!gameStarted) return; // Ignore key presses if the game hasn't started
    switch (event.key) {
        case "ArrowUp":
            movePlayer(0, -1);
            break;
        case "ArrowDown":
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
            movePlayer(1, 0);
            break;
    }
});

window.onload = initializeGame;