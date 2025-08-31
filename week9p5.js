let spacing = 5;     
let t = 0;           
let flowing = true;  
let paletteA = [];
let paletteB = [];
let driftSpeed = 0.001; // how fast colors drift

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  initPalettes();
}

function draw() {
  background(0);

  // animate only if flowing and mouse is inside canvas
  if (flowing && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    t += 0.01; 
  }

  // 🔹 1. Higher meltStrength max → longer drips
  let meltStrength = map(mouseY, 0, height, 50, 500);

  // drifting factor for color blending
  let driftAmt = (sin(millis() * driftSpeed) + 1) / 2;

  for (let y = 0; y < height; y += spacing) {
    beginShape();

    // pick colors from both palettes and blend
    let c1a = paletteA[int(map(y, 0, height, 0, paletteA.length - 1))];
    let c2a = paletteA[min(int(map(y, 0, height, 0, paletteA.length - 1)) + 1, paletteA.length - 1)];
    let ca = lerpColor(c1a, c2a, map(y % (height / paletteA.length), 0, height / paletteA.length, 0, 1));

    let c1b = paletteB[int(map(y, 0, height, 0, paletteB.length - 1))];
    let c2b = paletteB[min(int(map(y, 0, height, 0, paletteB.length - 1)) + 1, paletteB.length - 1)];
    let cb = lerpColor(c1b, c2b, map(y % (height / paletteB.length), 0, height / paletteB.length, 0, 1));

    fill(lerpColor(ca, cb, driftAmt));

    for (let x = 0; x <= width; x += spacing) {
      // 🔹 2. smoother noise scale for stretched paint
      let yOffset = noise(x * 0.001, y * 0.003, t) * meltStrength;
      vertex(x, y + yOffset);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

function mousePressed() {
  flowing = !flowing; // click = freeze/unfreeze
}

function keyPressed() {
  if (key === ' ') {
    initPalettes(); // new drifting palettes
  }
}

// --- create two palettes for drifting colors ---
function initPalettes() {
  paletteA = [];
  paletteB = [];
  for (let i = 0; i < 5; i++) {
    paletteA.push(color(random(255), random(255), random(255)));
    paletteB.push(color(random(255), random(255), random(255)));
  }
}




