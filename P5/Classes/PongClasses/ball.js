class Ball {
  constructor(pos, vel, radius) {
    this.pos = pos
    this.vel = vel
    this.randomVel()
    this.radius = radius
    this.speed = radius / 2
    this.color = [255, 255, 255]
    this.debug = false
  }

  show() {
    push()
    translate(this.pos.x, this.pos.y)
    stroke(this.color)
    fill(this.color)
    strokeWeight(1)
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
