let game = new PongSimulation(new Bound(0, 0, 400, 400))

function setup() {
  createCanvas(400, 400);

  game.AI.layers[0][0].bais = -0.10187023259883832; game.AI.layers[0][0].weights = [1.274, 1.059]
  game.AI.layers[0][1].bais = 0.23417340387867203; game.AI.layers[0][1].weights = [-0.775, -1.49]
  game.AI.layers[0][2].bais = 0.045901373422487554; game.AI.layers[0][2].weights = [-1.049, 0.363]
  game.AI.layers[0][3].bais = -0.9989459764761704; game.AI.layers[0][3].weights = [-1.248, 0.653]
  game.AI.layers[0][4].bais = -0.6230089671076287; game.AI.layers[0][4].weights = [-1.608, 0.41]

  game.AI.layers[1][0].bais = -0.15421258704957364; game.AI.layers[1][0].weights = [1.527]
  game.AI.layers[1][1].bais = 0.7582164172199946; game.AI.layers[1][1].weights = [1.108]

  game.AI.layers[2][0].bais = 0.3203972965777444; game.AI.layers[2][0].weights = []
}

function draw() {
  background(0);
  game.update()
  game.show()
  userInput()
}

function userInput() {
  if (keyIsDown(UP_ARROW)) {
    game.rightUP()
  } else if (keyIsDown(DOWN_ARROW)) {
    game.rightDOWN()
  }
}
