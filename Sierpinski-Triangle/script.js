// Get canvas element and set up the context
const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to draw a triangle
function drawTriangle(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size / 2, y - size * Math.sin(Math.PI / 3));
    ctx.closePath();
    ctx.strokeStyle = '#66ff99';
    ctx.stroke();
}

// Recursive function for Sierpinski Triangle
function sierpinski(x, y, size, depth) {
    if (depth === 0) {
        drawTriangle(x, y, size);
    } else {
        let newSize = size / 2;
        sierpinski(x, y, newSize, depth - 1);
        sierpinski(x + newSize, y, newSize, depth - 1);
        sierpinski(x + newSize / 2, y - newSize * Math.sin(Math.PI / 3), newSize, depth - 1);
    }
}

// Initial drawing of the Sierpinski triangle
function generateSierpinski() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let size = canvas.width * 0.4; // Set the size to 80% of the canvas width
    let depth = 5; // Depth of recursion
    let x = (canvas.width - size) / 2;
    let y = canvas.height * 0.8;
    sierpinski(x, y, size, depth);
}

// Redraw fractal when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateSierpinski();
});

// Generate fractal on load
generateSierpinski();
