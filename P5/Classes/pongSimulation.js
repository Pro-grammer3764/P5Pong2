class PongSimulation {
  constructor(bound) {
    this.bound = bound
    this.margin = this.bound.width / 100
    this.paddleWidth = this.bound.width / 50
    this.paddleHeight = this.bound.height / 5
    this.score = [0, 0]

    this.left = new PongPaddle(
      new Bound(
        this.bound.x + this.margin,
        this.bound.y + this.bound.height / 2 - this.paddleHeight / 2,
        this.paddleWidth,
        this.paddleHeight
      )
    )

    this.right = new PongPaddle(
      new Bound(
        this.bound.x + this.bound.width - (this.margin + this.paddleWidth),
        this.bound.y + this.bound.height / 2 - this.paddleHeight / 2,
        this.paddleWidth,
        this.paddleHeight
      )
    )

    this.ball = new Ball(
      new p5.Vector(this.bound.x + this.bound.width / 2, this.bound.y + this.bound.height / 2), new p5.Vector)
  }

  show() {
    this.bound.show()
    this.left.show()
    this.right.show()
    this.ball.show()

    //show scores
    push()
    textAlign(CENTER, CENTER)
    strokeWeight(1)
    stroke(256)
    fill(256)
    text(this.score[0], this.bound.x + this.bound.width * 0.25, this.bound.y + this.bound.height / 8)
    text(this.score[1], this.bound.x + this.bound.width * 0.75, this.bound.y + this.bound.height / 8)
    pop()

  }

  update() {
    //handle ball update and physics
    //handle paddle positions

    this.updatePaddlePositions()
    this.updateBallPosition()
  }

  updatePaddlePositions() {
    // left paddle
    let friction = 0.6;

    this.left.velocity *= friction;
    this.left.bound.y += this.left.velocity;

    if (this.left.bound.y + this.left.bound.height > this.bound.y + this.bound.height) {
      this.left.bound.y = this.bound.y + this.bound.height - this.left.bound.height
    } else if (this.left.bound.y < this.bound.y) {
      this.left.bound.y = this.bound.y
    }

    // right paddle
    this.right.velocity *= friction;
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
      //reset
      // this.ball.vel.reflect(new p5.Vector(1, 0))
      // this.ball.pos.x = this.bound.x + this.bound.width - this.ball.radius
      this.score[0]++;
      this.resetBall()
    } else if (this.ball.pos.x - this.ball.radius < this.bound.x) {
      //reset
      // this.ball.vel.reflect(new p5.Vector(1, 0))
      // this.ball.pos.x = this.bound.x + this.ball.radius
      this.score[1]++;
      this.resetBall()
    } else if (this.ball.pos.y + this.ball.radius > this.bound.y + this.bound.height) {
      this.ball.vel.reflect(new p5.Vector(0, 1))
      this.ball.pos.y = this.bound.y + this.bound.height - this.ball.radius
    } else if (this.ball.pos.y - this.ball.radius < this.bound.y) {
      this.ball.vel.reflect(new p5.Vector(0, 1))
      this.ball.pos.y = this.bound.y + this.ball.radius
    }

    //paddle collision
    if (this.ball.vel.x < 0) {
      //left paddle
      if (this.ball.pos.y > this.left.bound.y &&
        this.ball.pos.y < this.left.bound.y + this.left.bound.height &&
        this.ball.pos.x - this.ball.radius < this.left.bound.x + this.left.bound.width) {

        this.ball.vel.reflect(new p5.Vector(1, 0))
        this.ball.vel.x *= random(0.5, 2)
        this.ball.vel.setMag(this.ball.speed)
        this.ball.pos.x = this.left.bound.x + this.left.bound.width + this.ball.radius
      }
    } else {
      //right paddle
      if (this.ball.pos.y > this.right.bound.y &&
        this.ball.pos.y < this.right.bound.y + this.right.bound.height &&
        this.ball.pos.x + this.ball.radius > this.right.bound.x) {

        this.ball.vel.reflect(new p5.Vector(1, 0))
        this.ball.vel.x *= random(0.5, 2)
        this.ball.vel.setMag(this.ball.speed)
        this.ball.pos.x = this.right.bound.x - this.ball.radius
      }
    }
  }

  resetBall() {
    this.ball.pos.x = this.bound.x + this.bound.width / 2
    this.ball.pos.y = this.bound.y + this.bound.height / 2
    this.ball.randomVel()
    this.left.bound.y = this.bound.y + this.bound.height / 2 - this.paddleHeight / 2
    this.right.bound.y = this.bound.y + this.bound.height / 2 - this.paddleHeight / 2
  }
}
