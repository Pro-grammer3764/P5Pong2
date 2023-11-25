class NeuralNetwork {
    constructor(layerSizes, bound) {
        this.bound = bound
        this.layers = []
        for (let x = 0; x < layerSizes.length - 1; x++) {
            const layer = []
            for (let y = 0; y < layerSizes[x]; y++) {
                layer.push(new Neuron(layerSizes[x + 1]))
            }
            this.layers.push(layer);
        }

        this.layerSizes = layerSizes.slice(0, -1)
    }

    printNetwork() {
        for (let x = 0; x < this.layers.length; x++) {
            let line = "Layer: " + x + "\n"
            for (let y = 0; y < this.layers[x].length; y++) {
                line += "Neuron: " + y + " - "
                line += "Value: " + this.layers[x][y].value + ", "
                line += "Bais: " + this.layers[x][y].bais

                if (this.layers[x][y].weights) {
                    line += ", "
                    line += "Weights: " + this.layers[x][y].weights.toLocaleString()
                }

                line += "\n"
            }
            console.log(line)
        }
    }

    setInputs(inputArray) {
        if (inputArray.length == this.layerSizes[0]) {
            for (let y = 0; y < this.layers[0].length; y++) {
                this.layers[0][y].value = inputArray[y]
            }
        } else {
            console.error("Error: input size does not match network layer[0]")
        }
    }

    drawnNetwork() {
        this.bound.show()
        push()
        let margin = this.bound.width / 12
        let radius = this.bound.width / 17
        translate(this.bound.x + margin + radius, this.bound.y)
        let unitX = ((this.bound.width) - (2 * (margin + radius))) / (this.layerSizes.length - 1)
        let Xpos = 0
        for (let x = 0; x < this.layerSizes.length; x++) {
            // repeat for every layer
            let Ypos = 0
            for (let y = 0; y < this.layerSizes[x]; y++) {
                // repeat for every neuron in layer
                let unitY = this.bound.height / (this.layerSizes[x] + 1) // establish spacing based on amount of neurons
                Ypos += unitY

                // draw connections if the weights are non-zero
                if (this.layers[x][y].weights) {
                    for (let n = 0; n < this.layers[x][y].weights.length; n++) {
                        push()
                        let value = this.layers[x][y].weights[n]

                        strokeWeight(value * radius / 10)
                        if (value < 0) {
                            stroke(abs(value) * 255, 0, 0)
                        } else {
                            stroke(0, abs(value) * 255, 0)
                        }

                        translate(Xpos, Ypos)
                        line(0, 0, unitX, ((n + 1) * (this.bound.height / (this.layerSizes[x + 1] + 1))) - Ypos)
                        pop()
                    }
                }

                // draw neuron
                push()
                stroke(0, 0, abs(this.layers[x][y].bais) * 255)
                strokeWeight(2)
                fill(abs(this.layers[x][y].value) * 255)
                ellipse(Xpos, Ypos, radius, radius)
                pop()
            }
            Xpos += unitX
        }
        pop()
    }

    forwardPropogate() {
        for (let x = 1; x < this.layers.length; x++) {
            for (let y = 0; y < this.layers[x].length; y++) {
                let sum = 0
                for (let n = 0; n < this.layers[x - 1].length; n++) {
                    sum += this.layers[x - 1][n].value * this.layers[x - 1][n].weights[y]
                }
                sum += this.layers[x][y].bais
                this.layers[x][y].value = this.activationFunction(sum)
            }
        }
    }

    returnOutput() {
        return this.layers[this.layers.length - 1][0].value
    }

    randomizeWeights() {
        this.layers.forEach(x => {
            x.forEach(y => {
                for (let n = 0; n < y.weights.length; n++) {
                    y.weights[n] = randomGaussian()
                }
            })
        })
    }

    randomizeBias() {
        this.layers.forEach(x => {
            x.forEach(y => {
                y.bais = random(-1, 1)
            })
        })
    }

    mutate() {
        let mutationRate = 0.1

        this.layers.forEach(x => {
            for (let y = 0; y < x.length; y++) {
                if (random() < mutationRate) {
                    x[y].bais = random(-1, 1)
                }
            }
        })

        this.layers.forEach(x => {
            x.forEach(y => {
                for (let n = 0; n < y.weights.length; n++) {
                    if (random() < mutationRate) {
                        y.weights[n] = randomGaussian()
                    }
                }
            })
        })
    }

    activationFunction = (x) => {
        return max(0, x) // ReLu
    }

    sigmoid = (x) => {
        return 1 / (1 + (pow(Math.E, -x)))
    }
}