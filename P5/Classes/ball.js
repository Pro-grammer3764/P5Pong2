class Ball {
  constructor(pos, vel) {
    this.pos = pos
    this.vel = vel
    this.speed = 5
    this.randomVel()
    this.color = 256
    this.radius = 5
  }

  show() {
    stroke(this.color)
    strokeWeight(1)
    noFill()
    ellipse(this.pos.x, this.pos.y, this.radius * 2)
  }

  randomVel() {
    this.vel = p5.Vector.random2D().mult(this.speed)
  }
}
