class PongPaddle {
  constructor(bound) {
    this.bound = bound
    this.velocity = 0
    this.paddleSpeed = this.bound.height / 16;
    this.friction = 0.6;
    this.color = [255, 255, 255]
  }

  show() {
    this.bound.color = this.color
    this.bound.show(true)
  }
}
