/// <reference path="P5Resources/p5.d.ts" />

let sims = []

function setup() {
  createCanvas(800, 800)
  const gamesLength = 2; // *actual amount of games is squared
  const unit = createVector(width / gamesLength, height / gamesLength)

  for (let x = 0; x < gamesLength; x++) {
    let layer = []
    for (let y = 0; y < gamesLength; y++) {
      let b = new Bound(x * unit.x, y * unit.y, unit.x, unit.y)
      layer.push(new PongSimulation(b))
      layer[layer.length - 1].AI.randomizeWeights()
      layer[layer.length - 1].AI.randomizeBias()
    }
    sims.push(layer)
  }
}

function draw() {
  background(0, 50)

  sims.forEach(x => { x.forEach(y => { y.update(); y.show() }) }) //update and show
}

function keyInput() {
  if (keyIsDown(87)) {
    pongSimulation.leftUP()
  }
  if (keyIsDown(83)) {
    pongSimulation.leftDOWN()
  }
  if (keyIsDown(UP_ARROW)) {
    pongSimulation.rightUP()
  }
  if (keyIsDown(DOWN_ARROW)) {
    pongSimulation.rightDOWN()
  }
}