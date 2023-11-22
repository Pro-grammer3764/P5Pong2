class Bound {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = 256
  }

  show() {
    noFill()
    stroke(this.color)
    strokeWeight(1)
    rect(this.x, this.y, this.width, this.height, 2)
  }
}
