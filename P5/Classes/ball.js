class Ball {
  constructor(pos, vel) {
    this.pos = pos
    this.vel = vel
    this.speed = 5
    this.randomVel()
    this.color = 256
    this.radius = 5
    this.debug = false
  }

  show() {
    push()
    translate(this.pos.x, this.pos.y)
    stroke(this.color)
    strokeWeight(1)
    noFill()
    ellipse(0, 0, this.radius * 2)
    if (this.debug) {
      rotate(this.vel.heading())
      stroke(this.color, 50)
      line(0, 0, this.radius + 5, 0)
    }
    pop()
  }

  randomVel() {
    this.vel = p5.Vector.random2D().mult(this.speed)
  }
}
