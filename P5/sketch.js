/// <reference path="P5Resources/p5.d.ts" />

let sims = []
const gamesLength = 100 // *actual amount of games is gamesLength ^ 2
let generationCount = 0
let deltaTime = 0

function setup() {
  frameRate(60)

  createCanvas(800, 800)
  const gamesSize = ceil(pow(gamesLength, 0.5))
  const unit = createVector(width / gamesSize, height / gamesSize)

  for (let i = 0; i < gamesLength; i++) {
    let x = i % gamesSize
    let y = floor(i / gamesSize)
    let b = new Bound(x * unit.x, y * unit.y, unit.x - 2, unit.y - 2)
    sims.push(new PongSimulation(b, i))
    sims[i].AI.randomizeWeights()
    sims[i].AI.randomizeBias()
  }
}

function draw() {
  background(0)
  if (frameCount % 60 == 0) { indexGames() }

  sims.forEach(i => {
    i.update()
    i.show()
  })

  checkCompleted()
}

function checkCompleted() {
  for (let i = 0; i < sims.length; i++) {
    if (sims[i].completed == false) {
      return false
    }
  }

  geneticAlgorithm() // once completed do the genentic algorithm
}

function geneticAlgorithm() {
  // current genetic algorithm behavior:
  // worst 50% of AI's copy from two random AI's
  // this creates a population which is theoretically consited of only the best 50% of agents
  // mutate all
  indexGames()

  let topScore = "Best Score: "
  let bottomScore = "Worst Score: "

  let bestAIindex = -1
  for (let i = 0; i < sims.length; i++) {
    if (sims[i].scoreIndex == 0) {
      bestAIindex = i
      topScore += sims[i].fitness
    } else if (sims[i].scoreIndex == sims.length - 1) {
      bottomScore += sims[i].fitness
    }
  }

  for (let i = 0; i < sims.length; i++) {
    if (sims[i].scoreIndex > sims.length / 2) {
      sims[i].AI.copyFromCrossover(sims[floor(random(0, sims.length))].AI, sims[floor(random(0, sims.length))].AI)
    }

    sims[i].AI.mutate()         // mutate all AI's
    sims[i].score = [0, 0]      // reset scores
    sims[i].scoreIndex = 0      // reset score index
    sims[i].fitness = 0         // reset fitness
    sims[i].completed = false   // unpause simulation
  }

  print("Generation: " + generationCount + ", Time Ellapsed: " + (frameCount - deltaTime))
  print(topScore + "\n" + bottomScore)
  print(sims[bestAIindex].AI.printNetwork())
  generationCount++
  deltaTime = frameCount
}

function indexGames() {
  let sorted = sims.toSorted((a, b) => { return b.fitness - a.fitness })
  for (let i = 0; i < sorted.length; i++) {
    sorted[i].scoreIndex = i
    sorted[i].scoreIndexColor = [map(i, 0, sorted.length - 1, 0, 128), map(i, 0, sorted.length - 1, 200, 0), 0]
  }
  sorted[0].scoreIndexColor = [255, 50, 255]
}