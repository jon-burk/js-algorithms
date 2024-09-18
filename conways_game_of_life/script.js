const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const randomBtn = document.getElementById('random-btn');

const cellSize = 10;
const rows = 60;
const cols = 80;
let grid = [];
let interval;
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

// Initialize grid
function initGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(false));
}

// Draw grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ddd';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = grid[y][x] ? 'black' : 'white';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Update grid based on rules
function updateGrid() {
    const newGrid = grid.map(row => row.slice());

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const neighbors = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            let aliveNeighbors = 0;
            for (const [dy, dx] of neighbors) {
                const ny = y + dy;
                const nx = x + dx;
                if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
                    aliveNeighbors += grid[ny][nx] ? 1 : 0;
                }
            }

            if (grid[y][x]) {
                newGrid[y][x] = aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                newGrid[y][x] = aliveNeighbors === 3;
            }
        }
    }

    grid = newGrid;
    drawGrid();
}

// Start the simulation
function startSimulation() {
    interval = setInterval(updateGrid, 100);
	drawGrid();
}

// Stop the simulation
function stopSimulation() {
    clearInterval(interval);
}

// Clear the grid
function clearGrid() {
    initGrid();
    drawGrid();
}

// Randomize the grid
function randomizeGrid() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid[y][x] = Math.random() > 0.7;
        }
    }
    drawGrid();
}

// Event listeners
startBtn.addEventListener('click', startSimulation);
stopBtn.addEventListener('click', stopSimulation);
clearBtn.addEventListener('click', clearGrid);
randomBtn.addEventListener('click', randomizeGrid);

// Initialize and draw initial grid
initGrid();
drawGrid();
