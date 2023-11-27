/// <reference path="P5Resources/p5.d.ts" />

let sims = []
const gamesLength = 49 // *actual amount of games is gamesLength ^ 2
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
    // sims[i].AI.randomizeWeights()
    // sims[i].AI.randomizeBias()
  }
}

function draw() {
  background(0, 50)
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

  geneticAlgorithm2()
}

function geneticAlgorithm2() {
  let sorted = sims.toSorted((a, b) => { return b.fitness - a.fitness })
  topScore = sorted[0].fitness
  bottomScore = sorted[sorted.length - 1].fitness

  for (let i = 0; i < sorted.length; i++) {
    sorted[i].scoreIndex = i
  }

  sorted.forEach((sim, i) => {
    if (i > sorted.length * 0.8) {
      // set worst 20% to random in hopes of finding a better combo
      // hopefully this will constantly cycle the agents and give more options
      sim.AI.randomizeWeights()
      sim.AI.randomizeBias()
    } else if (i > sorted.length * 0.5) {
      // worst 50% copy from top 25%
      let randomIndex = floor(random(0, round(sorted.length / 4)))
      sim.AI.copyFrom(sorted[randomIndex].AI)
    }

    // mutate the best AI less than the worst
    // since the worst agents have their AI replaced with top scoring AI's the next generatino will contain a set of stable AI agents and mutated ones
    // if a mutation is succesful it becomes stable and will be a condidate to clone and test with further generatinos
    sim.AI.mutate(map(i, 0, sorted.length, 0, 0.25))

    sim.score = [0, 0]
    sim.scoreIndex = i
    sim.fitness = 0
    sim.completed = false
  })

  generationCount++
  let generationTime = frameCount - deltaTime
  deltaTime = frameCount
  console.log("Best Fitness: " + topScore + ", Worst Fitness: " + bottomScore)
  console.log("Generation: " + generationCount + ", Delta Franes: " + generationTime)
  console.log("Best AI: ")
  console.log(sorted[0].AI.layers)
}

function geneticAlgorithm() {
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

    if (random(0, 1) > 0.5 && i > sims.length / 3) {
      sims[i].AI.mutate()       // mutate 50% of the bottom 66% of AI's
    }
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

// sims[i].score = [0, 0]
// sims[i].scoreIndex = 0
// sims[i].fitness = 0
// sims[i].completed = false