const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const ballDivs = document.querySelectorAll('.ball');
const ballContainerDiv = document.querySelector('.ball-container');

class Box {
  constructor(node, width, height, balls = []) {
    this.node = node;
    this.width = width;
    this.height = height;

    this.node.style.width = width + 16 + 'px';
    this.node.style.height = height + 16 + 'px';
    this.node.style.border = '8px solid black';
    this.node.style.borderRadius = '8px';
  }
}

class Ball {
  constructor(node, radius, box) {
    this.node = node;
    this.radius = radius;
    this.radius = radius;
    this.box = box;

    this.node.style.width = 2 * this.radius + 'px';
    this.node.style.height = 2 * this.radius + 'px';
    this.node.style.position = 'absolute';

    this.positionX = 0;
    this.positionY = 0;
    this.velocityX = 8 * (Math.random() - 0.5);
    this.velocityY = 8 * (Math.random() - 0.5);
  }

  fall() {
    if (this.positionY > -this.box.height/2 + this.radius + 10) {
      this.velocityY -= 0.02;
    }
  }

  bounceX() {
    this.velocityX = -0.8 * this.velocityX;
  }

  bounceY() {
    if (this.velocityY >= 0 || this.velocityY < -0.5) {
      this.velocityY = -0.9 * this.velocityY;
    } else {
      this.velocityY = 0;
      this.positionY = -this.box.height/2 + this.radius;
    };
  }

  boxBounce() {
    let newX = this.positionX + this.velocityX;
    let newY = this.positionY + this.velocityY;

    if (newX < -this.box.width/2 + this.radius) {
      this.bounceX();
    } else if (newX > this.box.width/2 - this.radius) {
      this.bounceX();
    }

    if (newY < -this.box.height/2 + this.radius) {
      this.bounceY();
    } else if (newY > this.box.height/2 - this.radius) {
      this.bounceY();
    }
  }

  update() {
    this.node.style.transform = `translate(
      ${-this.positionX}px,
      ${-this.positionY}px
    )`
  }
  
  step() {
    this.fall();
    this.boxBounce();

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    this.update();
  }
}

const box = new Box(ballContainerDiv, 800, 500);
const balls = [];

ballDivs.forEach((ballDiv) => {
  balls.push(new Ball(ballDiv, 32, box));
});

let animationRequestID = null;

const step = () => {
  balls.forEach((ball) => ball.step());
  animationRequestID = window.requestAnimationFrame(step);
}

startButton.addEventListener('click', () => {
  window.cancelAnimationFrame(animationRequestID);
  animationRequestID = window.requestAnimationFrame(step);
});

stopButton.addEventListener('click', () => {
  window.cancelAnimationFrame(animationRequestID);
});