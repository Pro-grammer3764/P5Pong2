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
    push()
    translate(this.pos.x, this.pos.y)
    stroke(this.color)
    strokeWeight(1)
    noFill()
    ellipse(0, 0, this.radius * 2)
    rotate(this.vel.heading())
    line(0, 0, 20, 0)
    pop()
  }

  randomVel() {
    this.vel = p5.Vector.random2D().mult(this.speed)
  }
}
