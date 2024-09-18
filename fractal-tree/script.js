// Get canvas element and set up context
const canvas = document.getElementById('fractalTreeCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to draw fractal tree
function drawTree(startX, startY, length, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();

    // Starting position and angle
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    // Draw branches recursively
    if (length < 10) {
        ctx.restore();
        return;
    }

    // Left branch
    drawTree(0, -length, length * 0.7, angle - (10 + Math.random() * 20), branchWidth * 0.7, color1, color2);

    // Right branch
    drawTree(0, -length, length * 0.7, angle + (10 + Math.random() * 20), branchWidth * 0.7, color1, color2);

    ctx.restore();
}

// Initial drawing of the fractal tree
function generateTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let centerX = canvas.width / 2;
    let centerY = canvas.height * 0.8; // Move the tree up (90% of canvas height)
    let trunkHeight = 150; // Length of the initial trunk
    let trunkWidth = 10;   // Width of the initial trunk
    drawTree(centerX, centerY, trunkHeight, 0, trunkWidth, '#66ff99', '#004d00');
}

// Redraw fractal tree when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateTree();
});

// Generate fractal tree on load
generateTree();
