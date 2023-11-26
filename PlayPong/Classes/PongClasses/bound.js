class Bound {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = [255, 255, 255]
  }

  show(isFilled) {
    push()
    if (!isFilled) { noFill() } else { fill(this.color) }
    stroke(this.color)
    strokeWeight(2)
    rect(this.x, this.y, this.width, this.height)
    pop()
  }
}
