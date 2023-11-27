class Neuron {
    constructor(nextLayerLength) {
        this.bais = 0
        this.value = 0
        this.weights = new Array(nextLayerLength).fill(0.5)
    }
}