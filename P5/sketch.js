/// <reference path="P5Resources/p5.d.ts" />

let pongSimulation = new PongSimulation(new Bound(10, 10, 380, 380))

function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(0, 100)

  if (keyIsDown(87)) {
    pongSimulation.left.velocity = -5;
  }
  if (keyIsDown(83)) {
    pongSimulation.left.velocity = 5;
  }
  if (keyIsDown(UP_ARROW)) {
    pongSimulation.right.velocity = -5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    pongSimulation.right.velocity = 5;
  }

  pongSimulation.update()
  pongSimulation.show()
}
