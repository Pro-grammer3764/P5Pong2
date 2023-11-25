/// <reference path="P5Resources/p5.d.ts" />

let sims = []
const gamesLength = 4; // *actual amount of games is gamesLength ^ 2

function setup() {
  createCanvas(800, 800)
  const gamesSize = ceil(pow(gamesLength, 0.5))
  const unit = createVector(width / gamesSize, height / gamesSize)

  for (let i = 0; i < gamesLength; i++) {
    let x = i % gamesSize
    let y = floor(i / gamesSize)
    let b = new Bound(x * unit.x, y * unit.y, unit.x, unit.y)
    sims.push(new PongSimulation(b, i))
  }
}

function draw() {
  background(0, 50)
  sims.forEach(i => { i.update(); i.show() })//update and show
  keyInput()
}

function indexGames() {
  let sorted = sims.toSorted((a, b) => { return b.fitness - a.fitness })
  for (let i = 0; i < sorted.length; i++) {
    sorted[i].scoreIndex = i
  }
  print(sorted)
}

function keyInput() {
  if (keyIsDown(UP_ARROW)) {
    indexGames()
  }
  if (keyIsDown(DOWN_ARROW)) {
    noLoop()
  }
}