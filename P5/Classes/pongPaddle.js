class PongPaddle {
  constructor(bound) {
    this.bound = bound
    this.velocity = 0
    this.paddleSpeed = 10;
    this.friction = 0.6;
  }

  show() {
    this.bound.show()
  }
}
