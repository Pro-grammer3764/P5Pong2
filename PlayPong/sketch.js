let game = new PongSimulation(new Bound(0, 0, 800, 800))
let gameMode = 0
let gameSpeed = 3

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
    gameMode = (gameMode + 1) % 5
    setMode(gameMode)
  }
}

function setMode(gameMode) {
  switch (gameMode) {
    // easy mode
    case 0:
      game.AI.layers[0][0].bais = 0.07897114949706685; game.AI.layers[0][0].weights = [0.261, 0.637]
      game.AI.layers[0][1].bais = -0.1537201448990837; game.AI.layers[0][1].weights = [-1.742, -2.269]
      game.AI.layers[0][2].bais = 0.2245187726768334; game.AI.layers[0][2].weights = [-0.934, -0.26]
      game.AI.layers[0][3].bais = -0.5284921759556136; game.AI.layers[0][3].weights = [-1.356, -0.656]
      game.AI.layers[0][4].bais = 0.22358187867652646; game.AI.layers[0][4].weights = [-1.14, 2.327]
      game.AI.layers[1][0].bais = -0.6653102039192267; game.AI.layers[1][0].weights = [-0.006]
      game.AI.layers[1][1].bais = 0.42002164456692714; game.AI.layers[1][1].weights = [0.701]
      game.AI.layers[2][0].bais = -0.14475832664390786; game.AI.layers[2][0].weights = []
      break;

    // unknown
    case 1:
      game.AI.layers[0][0].bais = 0.21060644566715303; game.AI.layers[0][0].weights = [-0.1376209662712895, 1.1403021154688586]
      game.AI.layers[0][1].bais = 0.04796941669458587; game.AI.layers[0][1].weights = [0.8266735579992279, -0.5787350044584632]
      game.AI.layers[0][2].bais = -0.3489382607251812; game.AI.layers[0][2].weights = [0.8878495807945945, -0.4675765937058072]
      game.AI.layers[0][3].bais = 0.22187831320534146; game.AI.layers[0][3].weights = [0.6092677891842582, -0.5773436406729042]
      game.AI.layers[0][4].bais = -0.3135344430306697; game.AI.layers[0][4].weights = [0.33454293722139705, 0.5]
      game.AI.layers[1][0].bais = -0.7506950277051574; game.AI.layers[0][0].weights = [0.1156932167685436]
      game.AI.layers[1][1].bais = 0.09284751953682857; game.AI.layers[0][1].weights = [0.08857408016023949]
      game.AI.layers[2][0].bais = -0.2222827106764517; game.AI.layers[0][0].weights = []
      break;

    // Fitness: 7000
    case 2:
      game.AI.layers[0][0].bais = -0.6303457064701461; game.AI.layers[0][0].weights = [-0.8090803189418303, 0.5173703158753404]
      game.AI.layers[0][1].bais = -0.006901703158052719; game.AI.layers[0][1].weights = [1.4782510403183182, -1.1405918395951467]
      game.AI.layers[0][2].bais = -0.3489382607251812; game.AI.layers[0][2].weights = [0.5562892425002546, -0.43479787790773994]
      game.AI.layers[0][3].bais = 0.22187831320534146; game.AI.layers[0][3].weights = [0.7910228898362346, -0.17405204612521485]
      game.AI.layers[0][4].bais = 0.5466228395106698; game.AI.layers[0][4].weights = [-0.181533319309084, 0.3819058179116648]
      game.AI.layers[1][0].bais = -0.8296960924493233; game.AI.layers[1][0].weights = [-0.2376224496051187]
      game.AI.layers[1][1].bais = 0.34701652435823194; game.AI.layers[1][1].weights = [0.6795938284434859]
      game.AI.layers[2][0].bais = 0.161427704837233; game.AI.layers[2][0].weights = []
      break;

    // Fitness: 13,700
    case 3:
      game.AI.layers[0][0].bais = -0.06648695721943843; game.AI.layers[0][0].weights = [-0.9168811332387203, 0.30996704208899106]
      game.AI.layers[0][1].bais = -0.1526087193214951; game.AI.layers[0][1].weights = [1.1659732474447233, -0.8117699023635003]
      game.AI.layers[0][2].bais = -0.3489382607251812; game.AI.layers[0][2].weights = [1.3488888876915501, 0.5886685617858254]
      game.AI.layers[0][3].bais = 0.12412365400741243; game.AI.layers[0][3].weights = [0.15552266875519405, -0.2025978354030069]
      game.AI.layers[0][4].bais = 0.2208287914101812; game.AI.layers[0][4].weights = [0.34231979106229615, 0.5216855825972762]
      game.AI.layers[1][0].bais = -0.4645285207721084; game.AI.layers[1][0].weights = [-0.4371709103612522]
      game.AI.layers[1][1].bais = 0.4795793869929377; game.AI.layers[1][1].weights = [0.9284091840507733]
      game.AI.layers[2][0].bais = 0.161427704837233; game.AI.layers[2][0].weights = []
      break;

    // Fitness: 36,200
    case 4:
      game.AI.layers[0][0].bais = -1.088321072268987; game.AI.layers[0][0].weights = [-0.46742210618744506, -0.20753093608639528]
      game.AI.layers[0][1].bais = 0.16163975867332714; game.AI.layers[0][1].weights = [1.0589438459537412, -1.036651137951425]
      game.AI.layers[0][2].bais = -0.3489382607251812; game.AI.layers[0][2].weights = [1.0636679299803675, -0.3016384227325448]
      game.AI.layers[0][3].bais = -0.25728302700684513; game.AI.layers[0][3].weights = [0.3284077529106073, -0.2025978354030069]
      game.AI.layers[0][4].bais = 0.08255977005705706; game.AI.layers[0][4].weights = [0.5432693362616878, 0.745459653918574]
      game.AI.layers[1][0].bais = -0.4645285207721084; game.AI.layers[1][0].weights = [-0.47903089068020854]
      game.AI.layers[1][1].bais = 0.34701652435823194; game.AI.layers[1][1].weights = [0.7175345909633672]
      game.AI.layers[2][0].bais = 0.161427704837233; game.AI.layers[2][0].weights = []
      break;
    default:
      break;
  }

  game.fitness = gameMode
}