// Set up the canvas and context
const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Julia set parameters
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

// Function to draw the Julia set
function drawJuliaSet(cRe, cIm) {
    const width = canvas.width;
    const height = canvas.height;
    const maxIterations = 300;
    const magnificationFactor = zoom * 250;
    const moveX = width / 2 + offsetX;
    const moveY = height / 2 + offsetY;

    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx = 1.5 * (x - moveX) / magnificationFactor;
            let zy = (y - moveY) / magnificationFactor;

            let iteration = 0;
            while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
                let tmp = zx * zx - zy * zy + cRe;
                zy = 2.0 * zx * zy + cIm;
                zx = tmp;
                iteration++;
            }

            // Color based on iteration
            const hue = 360 * iteration / maxIterations;
            const lightness = iteration === maxIterations ? 0 : 50 + (iteration % 50);

            ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

// Click event to explore different Julia sets
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Map click coordinates to complex plane
    const cRe = (x - canvas.width / 2) / (canvas.width * 0.4);
    const cIm = (y - canvas.height / 2) / (canvas.height * 0.4);
    
    drawJuliaSet(cRe, cIm);
});

// Initial render with default values
drawJuliaSet(-0.7, 0.27015);

// Adjust canvas size when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawJuliaSet(-0.7, 0.27015);  // Reset to default view after resize
});
