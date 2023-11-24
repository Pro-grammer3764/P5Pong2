class PongSimulation {
  constructor(bound) {
    //pong game
    this.bound = bound
    this.margin = this.bound.width / 100
    this.paddleWidth = this.bound.width / 50
    this.paddleHeight = this.bound.height / 5
    this.score = [0, 0]
    this.left = new PongPaddle(new Bound(this.bound.x + this.margin, this.bound.y + this.bound.height / 2 - this.paddleHeight / 2, this.paddleWidth, this.paddleHeight))
    this.right = new PongPaddle(new Bound(this.bound.x + this.bound.width - (this.margin + this.paddleWidth), this.bound.y + this.bound.height / 2 - this.paddleHeight / 2, this.paddleWidth, this.paddleHeight))
    this.ball = new Ball(new p5.Vector(this.bound.x + this.bound.width / 2, this.bound.y + this.bound.height / 2), new p5.Vector)

    //AI
    this.state = [0, 0, 0, 0, 0]
    this.AI = new NeuralNetwork([5, 3, 2, 0], new Bound(
      this.bound.x + (this.bound.width / 6),
      this.bound.y + (this.bound.height / 2),
      (this.bound.width / 3) * 2,
      (this.bound.height / 8) * 3
    ))
  }

  show() {
    this.bound.show(false) //nofill
    this.left.show(true) //fill
    this.right.show(true) //fill
    this.ball.show()

    //show scores
    push()
    textAlign(CENTER, CENTER)
    textSize(this.bound.width / 15)
    fill(255)

    text(this.score[0], this.bound.x + this.bound.width * 0.25, this.bound.y + this.bound.height / 8)
    text(this.score[1], this.bound.x + this.bound.width * 0.75, this.bound.y + this.bound.height / 8)
    pop()

    //center line
    push()
    stroke(256, 50)
    translate(this.bound.x + this.bound.width / 2, this.bound.y)
    line(0, 0, 0, this.bound.height / 2)
    line(0, (this.bound.height / 8) * 7, 0, this.bound.height)
    pop()

    //Neural Network
    push()
    this.AI.drawnNetwork()
    pop()
  }

  update() {
    this.updatePaddlePositions()
    this.updateBallPosition()
    this.setState()
    this.AI.setInputs(this.state)
  }

  updatePaddlePositions() {
    // left paddle
    this.left.velocity *= this.left.friction;
    this.left.bound.y += this.left.velocity;

    if (this.left.bound.y + this.left.bound.height > this.bound.y + this.bound.height) {
      this.left.bound.y = this.bound.y + this.bound.height - this.left.bound.height
    } else if (this.left.bound.y < this.bound.y) {
      this.left.bound.y = this.bound.y
    }

    // right paddle
    this.right.velocity *= this.right.friction;
    this.right.bound.y += this.right.velocity;

    if (this.right.bound.y + this.right.bound.height > this.bound.y + this.bound.height) {
      this.right.bound.y = this.bound.y + this.bound.height - this.right.bound.height
    } else if (this.right.bound.y < this.bound.y) {
      this.right.bound.y = this.bound.y
    }
  }

  updateBallPosition() {
    this.ball.pos.add(this.ball.vel)

    //wall collision
    if (this.ball.pos.x + this.ball.radius > this.bound.x + this.bound.width) {
      this.score[0]++
      this.resetBall()
    } else if (this.ball.pos.x - this.ball.radius < this.bound.x) {
      this.score[1]++
      this.resetBall()
    } else if (this.ball.pos.y + this.ball.radius > this.bound.y + this.bound.height) {
      this.reflectHotizontal()
      this.ball.pos.y = this.bound.y + this.bound.height - this.ball.radius
    } else if (this.ball.pos.y - this.ball.radius < this.bound.y) {
      this.reflectHotizontal()
      this.ball.pos.y = this.bound.y + this.ball.radius
    }

    //paddle collision
    if (this.ball.vel.x < 0) {
      //left paddle
      if (this.ball.pos.y > this.left.bound.y &&
        this.ball.pos.y < this.left.bound.y + this.left.bound.height &&
        this.ball.pos.x - this.ball.radius < this.left.bound.x + this.left.bound.width) {

        this.reflectVertical()
        this.ball.pos.x = this.left.bound.x + this.left.bound.width + this.ball.radius
      }
    } else {
      //right paddle
      if (this.ball.pos.y > this.right.bound.y &&
        this.ball.pos.y < this.right.bound.y + this.right.bound.height &&
        this.ball.pos.x + this.ball.radius > this.right.bound.x) {

        this.reflectVertical()
        this.ball.pos.x = this.right.bound.x - this.ball.radius
      }
    }

    if (abs(this.ball.vel.y / this.ball.vel.x) > 2) {
      this.ball.vel.x *= 2
    }
  }

  setState() {
    this.state[0] = map(this.ball.pos.x, this.bound.x + this.ball.radius, this.bound.x + this.bound.width - this.ball.radius, 0, 1)
    this.state[1] = map(this.ball.pos.y, this.bound.y + this.ball.radius, this.bound.y + this.bound.height - this.ball.radius, 0, 1)
    let normalizedVel = this.ball.vel.copy();
    this.state[2] = normalizedVel.normalize().x
    this.state[3] = normalizedVel.normalize().y
    this.state[4] = map(this.left.bound.y, this.bound.y, this.bound.y + this.bound.height - this.paddleHeight, 0, 1)
  }

  resetBall() {
    this.ball.pos.x = this.bound.x + this.bound.width / 2
    this.ball.pos.y = this.bound.y + this.bound.height / 2
    this.ball.randomVel()
    this.left.bound.y = this.bound.y + this.bound.height / 2 - this.paddleHeight / 2
    this.right.bound.y = this.bound.y + this.bound.height / 2 - this.paddleHeight / 2
  }

  reflectHotizontal() {
    this.ball.vel.reflect(new p5.Vector(0, 1))
  }

  reflectVertical() {
    this.ball.vel.reflect(new p5.Vector(1, random(-0.2, 0.2))) //randomly offset ~ ±20°
  }

  leftUP() {
    this.left.velocity = this.left.paddleSpeed * -1
  }

  leftDOWN() {
    this.left.velocity = this.left.paddleSpeed
  }

  rightUP() {
    this.right.velocity = this.right.paddleSpeed * -1
  }

  rightDOWN() {
    this.right.velocity = this.right.paddleSpeed
  }
}
