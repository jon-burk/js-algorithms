const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generate-btn');

const cellSize = 20;
const rows = 30;
const cols = 40;
const maze = Array.from({ length: rows }, () => Array(cols).fill(0));
const directions = [
    [0, 2], // down
    [2, 0], // right
    [0, -2], // up
    [-2, 0] // left
];
let stack = [];
let current;

// Initialize canvas
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

// Draw maze
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'white';
            } else {
                ctx.fillStyle = 'black';
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Recursive backtracking algorithm
function generateMaze(x, y) {
    maze[y][x] = 1;
    const neighbors = [];

    directions.forEach(([dy, dx]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx > 0 && ny > 0 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === 0) {
            neighbors.push([nx, ny]);
        }
    });

    if (neighbors.length > 0) {
        stack.push([x, y]);
        const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
        maze[ny][nx] = 1;
        maze[y + (ny - y) / 2][x + (nx - x) / 2] = 1;
        generateMaze(nx, ny);
    } else if (stack.length > 0) {
        const [px, py] = stack.pop();
        generateMaze(px, py);
    }
}

// Generate button click event
generateBtn.addEventListener('click', () => {
    // Reset maze
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            maze[y][x] = 0;
        }
    }

    // Generate maze
    current = [1, 1];
    generateMaze(1, 1);
    drawMaze();
});
