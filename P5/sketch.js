/// <reference path="P5Resources/p5.d.ts" />

let pongSimulation = new PongSimulation(new Bound(10, 10, 380, 380))
let paddleSpeed = 10;

function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(0, 100)

  if (keyIsDown(87)) {
    pongSimulation.left.velocity = -paddleSpeed
  }
  if (keyIsDown(83)) {
    pongSimulation.left.velocity = paddleSpeed
  }
  if (keyIsDown(UP_ARROW)) {
    pongSimulation.right.velocity = -paddleSpeed
  }
  if (keyIsDown(DOWN_ARROW)) {
    pongSimulation.right.velocity = paddleSpeed
  }

  pongSimulation.update()
  pongSimulation.show()
}
