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
        for (let y = 0; y < this.layers[0].length; y++) {
            this.layers[0][y].value = inputArray[y]
        }
    }

    drawnNetwork() {
        push()
        let margin = 50
        let radius = 10
        translate(this.bound.x + margin + radius, this.bound.y)
        let unitX = ((this.bound.width) - (2 * (margin + radius))) / (this.layerSizes.length - 1)
        let Xpos = 0
        for (let x = 0; x < this.layerSizes.length; x++) {
            //repeat for every layer
            let Ypos = 0
            for (let y = 0; y < this.layerSizes[x]; y++) {
                //repeat for every neuron in layer
                let unitY = this.bound.height / (this.layerSizes[x] + 1)
                Ypos += unitY

                if (this.layers[x][y].weights) {
                    //draw lines
                    console.log("draw connections")
                    for (let n = 0; n < this.layers[x][y].weights.length; n++) {
                        push()
                        line(0, 0, unitX, this.bound.height / (this.layerSizes[x + 1] + 1))
                        pop()
                    }
                }
                ellipse(Xpos, Ypos, radius, radius)
            }

            Xpos += unitX
        }
        pop()
    }
}