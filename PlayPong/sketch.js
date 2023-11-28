let game = new PongSimulation(new Bound(0, 0, 800, 800))
let gameMode = 0
let gameSpeed = 4

function setup() {
  createCanvas(800, 800);
  setMode(gameMode)
}


function draw() {
  background(0);
  for (let i = 0; i < gameSpeed; i++) {
    game.update()
    userInput()
  }
  game.show()
}

function userInput() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    game.rightUP()
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    game.rightDOWN()
  }
}

function keyPressed() {
  if (keyCode == 32) {
    gameMode = (gameMode + 1) % 4
    setMode(gameMode)
  }
}

function setMode(gameMode) {
  switch (gameMode) {
    // Fitness: 5,000
    case 0:
      console.log("AI #1")
      game = new PongSimulation(new Bound(0, 0, 800, 800))
      game.AI = new NeuralNetwork([5, 3, 1, 0], new Bound(game.bound.x + (game.bound.width / 6), game.bound.y + (game.bound.height / 2), (game.bound.width / 3) * 2, (game.bound.height / 8) * 3))
      game.AI.layers[0][0].bais = 0.07897114949706685; game.AI.layers[0][0].weights = [0.261, 0.637]
      game.AI.layers[0][1].bais = -0.1537201448990837; game.AI.layers[0][1].weights = [-1.742, -2.269]
      game.AI.layers[0][2].bais = 0.2245187726768334; game.AI.layers[0][2].weights = [-0.934, -0.26]
      game.AI.layers[0][3].bais = -0.5284921759556136; game.AI.layers[0][3].weights = [-1.356, -0.656]
      game.AI.layers[0][4].bais = 0.22358187867652646; game.AI.layers[0][4].weights = [-1.14, 2.327]
      game.AI.layers[1][0].bais = -0.6653102039192267; game.AI.layers[1][0].weights = [-0.006]
      game.AI.layers[1][1].bais = 0.42002164456692714; game.AI.layers[1][1].weights = [0.701]
      game.AI.layers[2][0].bais = -0.14475832664390786; game.AI.layers[2][0].weights = []
      break;

    // Fitness: 7,000
    case 1:
      console.log("AI #2")
      game = new PongSimulation(new Bound(0, 0, 800, 800))
      game.AI = new NeuralNetwork([5, 3, 1, 0], new Bound(game.bound.x + (game.bound.width / 6), game.bound.y + (game.bound.height / 2), (game.bound.width / 3) * 2, (game.bound.height / 8) * 3))
      game.AI.layers[0][0].bais = -0.6303457064701461; game.AI.layers[0][0].weights = [-0.8090803189418303, 0.5173703158753404]
      game.AI.layers[0][1].bais = -0.006901703158052719; game.AI.layers[0][1].weights = [1.4782510403183182, -1.1405918395951467]
      game.AI.layers[0][2].bais = -0.3489382607251812; game.AI.layers[0][2].weights = [0.5562892425002546, -0.43479787790773994]
      game.AI.layers[0][3].bais = 0.22187831320534146; game.AI.layers[0][3].weights = [0.7910228898362346, -0.17405204612521485]
      game.AI.layers[0][4].bais = 0.5466228395106698; game.AI.layers[0][4].weights = [-0.181533319309084, 0.3819058179116648]
      game.AI.layers[1][0].bais = -0.8296960924493233; game.AI.layers[1][0].weights = [-0.2376224496051187]
      game.AI.layers[1][1].bais = 0.34701652435823194; game.AI.layers[1][1].weights = [0.6795938284434859]
      game.AI.layers[2][0].bais = 0.161427704837233; game.AI.layers[2][0].weights = []
      break;

    // Fitness: 36,200
    case 2:
      console.log("AI #3")
      game = new PongSimulation(new Bound(0, 0, 800, 800))
      game.AI = new NeuralNetwork([5, 3, 1, 0], new Bound(game.bound.x + (game.bound.width / 6), game.bound.y + (game.bound.height / 2), (game.bound.width / 3) * 2, (game.bound.height / 8) * 3))
      game.AI.layers[0][0].bais = -1.088321072268987; game.AI.layers[0][0].weights = [-0.46742210618744506, -0.20753093608639528]
      game.AI.layers[0][1].bais = 0.16163975867332714; game.AI.layers[0][1].weights = [1.0589438459537412, -1.036651137951425]
      game.AI.layers[0][2].bais = -0.3489382607251812; game.AI.layers[0][2].weights = [1.0636679299803675, -0.3016384227325448]
      game.AI.layers[0][3].bais = -0.25728302700684513; game.AI.layers[0][3].weights = [0.3284077529106073, -0.2025978354030069]
      game.AI.layers[0][4].bais = 0.08255977005705706; game.AI.layers[0][4].weights = [0.5432693362616878, 0.745459653918574]
      game.AI.layers[1][0].bais = -0.4645285207721084; game.AI.layers[1][0].weights = [-0.47903089068020854]
      game.AI.layers[1][1].bais = 0.34701652435823194; game.AI.layers[1][1].weights = [0.7175345909633672]
      game.AI.layers[2][0].bais = 0.161427704837233; game.AI.layers[2][0].weights = []
      break;

    // Fitness: 1,000,000
    case 3:
      console.log("AI #4")
      game = new PongSimulation(new Bound(0, 0, 800, 800))
      game.AI = new NeuralNetwork([5, 5, 3, 1, 0], new Bound(game.bound.x + (game.bound.width / 6), game.bound.y + (game.bound.height / 2), (game.bound.width / 3) * 2, (game.bound.height / 8) * 3))
      game.AI.layers[0][0].bais = -0.3507276638882457; game.AI.layers[0][0].weights = [-1.261, -0.184, 0.517, 2.423, 0.033]
      game.AI.layers[0][1].bais = -1.296245203257045; game.AI.layers[0][1].weights = [-1.43, -1.489, -0.044, -2.254, -0.162]
      game.AI.layers[0][2].bais = -1.5531516286011433; game.AI.layers[0][2].weights = [0.012, -0.24, 0.36, 0.102, -0.57]
      game.AI.layers[0][3].bais = 0.4065779089241546; game.AI.layers[0][3].weights = [-1.056, -0.8, -0.709, -0.319, -0.103]
      game.AI.layers[0][4].bais = 0.38291041687511096; game.AI.layers[0][4].weights = [-0.57, 0.936, 0.561, 1.73, 1.06]
      game.AI.layers[1][0].bais = -0.18919624442423388; game.AI.layers[1][0].weights = [-1.245, 0.287, 0.015]
      game.AI.layers[1][1].bais = -0.3277847763712014; game.AI.layers[1][1].weights = [-1.646, -0.132, -0.069]
      game.AI.layers[1][2].bais = -1.9608607077102775; game.AI.layers[1][2].weights = [-0.998, 0.014, 1.509]
      game.AI.layers[1][3].bais = 0.4813632942260133; game.AI.layers[1][3].weights = [-0.203, 2.225, -0.118]
      game.AI.layers[1][4].bais = -1.494057620784282; game.AI.layers[1][4].weights = [0.504, 1.036, 0.546]
      game.AI.layers[2][0].bais = -1.401639557396023; game.AI.layers[2][0].weights = [0.068]
      game.AI.layers[2][1].bais = -0.1600951071774266; game.AI.layers[2][1].weights = [2.212]
      game.AI.layers[2][2].bais = -1.1223319279386643; game.AI.layers[2][2].weights = [1.196]
      game.AI.layers[3][0].bais = -0.6139662238748353; game.AI.layers[3][0].weights = []
      break;
    default:
      break;
  }

  game.fitness = gameMode
}