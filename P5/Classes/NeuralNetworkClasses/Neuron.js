class Neuron {
    constructor(bais, weights, value, isEndNode) {
        if (bais) { this.bais = bais } else { this.bais = 0 }
        if (value) { this.value = value } else { this.value = 0 }
        if (isEndNode == false) { this.weights = weights }
    }
}