const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');
const scaleInput = document.getElementById('scale');
const drawBtn = document.getElementById('draw-btn');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

function perlinNoise(x, y) {
    const p = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [p[i], p[r]] = [p[r], p[i]];
    }
    const perm = p.concat(p);

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    }

    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = perm[X] + Y;
    const B = perm[X + 1] + Y;

    return lerp(v, lerp(u, grad(perm[A], x, y), grad(perm[B], x - 1, y)),
                    lerp(u, grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1)));
}

function generateNoise() {
    const scale = parseFloat(scaleInput.value);
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const value = perlinNoise(x / scale, y / scale) * 0.5 + 0.5;
            const color = Math.floor(value * 255);
            const index = (y * canvas.width + x) * 4;
            data[index] = color;       // Red
            data[index + 1] = color;   // Green
            data[index + 2] = color;   // Blue
            data[index + 3] = 255;     // Alpha
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

// Generate button click event
drawBtn.addEventListener('click', generateNoise);
