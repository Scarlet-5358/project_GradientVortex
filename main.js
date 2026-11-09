// ==================== Parameters ====================

// Colors

const BLACK = "rgb(0,0,0)";
const BLUE = "rgb(0,0,255)";
const GREEN = "rgb(0,255,0)";
const RED = "rgb(255,0,0)";
// RGB for Math
const BLUE_RGB = [0, 0, 255];
const GREEN_RGB = [0, 255, 0];
const RED_RGB = [255, 0, 0];

// canvas settings
const canvas_width = 800;
const canvas_height = 600;


// square settings
const square_size_max = 400;
const square_size_min = 50;
const square_color_max = BLUE_RGB;
const square_color_min = RED_RGB;
const square_count = 24;
let square_angles = new Array(square_count).fill(0);    // Array for angles
const square_speed_max = 2.4;
const square_speed_min = 0.6;

// ==================== Initialization ====================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.translate(canvas_width / 2, canvas_height / 2); // set center

// ==================== Time ====================

let lastTime = 0;

// ==================== Drawing ====================

// clear Background with target color
function clearBackground(color) {
    ctx.fillStyle = color;
    ctx.fillRect(-canvas_width / 2, -canvas_height / 2, 
        canvas_width, canvas_height);
}

function drawSquare(ctx, size, color, angle) {
    ctx.save();
    ctx.rotate(angle);  // rotate angle
    ctx.strokeStyle = color;
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// caculate Linear Interpolation(Math)
function lerp(start, end, t) {
    return start + (end - start) * t;
}



function draw(deltaTime) {
    for(let i = 0; i < square_count; ++i) {
        const t = i / (square_count - 1);
        // caculate size
        const size = lerp(square_size_max, square_size_min, t);
        // caculate color
        const r = lerp(square_color_max[0], square_color_min[0], t);
        const g = lerp(square_color_max[1], square_color_min[1], t);
        const b = lerp(square_color_max[2], square_color_min[2], t);
        const color = `rgb(${r}, ${g}, ${b})`;
        const speed = lerp(square_speed_max, square_speed_min, t);
        // update angle
        square_angles[i] += speed * deltaTime;
        // draw Rectangle
        drawSquare(ctx, size, color, square_angles[i]);
    }

}

// ==================== Main ====================

function animation(timestamp) {   // declare main function
    //debugger;
    // update current frame
    const deltaTime = (timestamp - lastTime) / 1000;;
    lastTime = timestamp;

    // Begin drawing
    clearBackground(BLACK);
    draw(deltaTime);
    // End drawing

    // while(!close) [cycle]
    window.requestAnimationFrame(animation);
}

// use of function
// requestAnimationFrame(CallBack);     // get frame
window.requestAnimationFrame(animation);