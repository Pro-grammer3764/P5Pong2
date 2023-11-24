/// <reference path="P5Resources/p5.d.ts" />


function setup() {
  createCanvas(400, 400)

  pongSimulation = new PongSimulation(new Bound(0, 0, 400, 400))
  pongSimulation.AI.randomizeWeights()
  pongSimulation.AI.randomizeBias()
}

function draw() {
  background(0, 50)
  // keyInput();

  pongSimulation.update()
  pongSimulation.show()
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