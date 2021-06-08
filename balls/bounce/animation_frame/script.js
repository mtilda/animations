const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const ballDivs = document.querySelectorAll('.ball');
const ballContainerDiv = document.querySelector('.ball-container');

class Box {
  constructor(node, width, height, balls = []) {
    this.node = node;
    this.width = width;
    this.height = height;

    this.node.style.width = width + 'px';
    this.node.style.height = height + 'px';
    this.node.style.border = '8px solid black'
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
    this.velocityX = 2 * (Math.random() - 0.5);
    this.velocityY = 2 * (Math.random() - 0.5);
  }

  fall() {
    if (this.positionY > -this.box.height/2 + this.radius + 10) {
      this.velocityY -= 0.02;
    }
  }

  boxBounce() {
    let newX = this.positionX + this.velocityX;
    let newY = this.positionY + this.velocityY;

    if (newX < -this.box.width/2 + this.radius) {
      this.velocityX = -this.velocityX;
    } else if (newX > this.box.width/2 - this.radius) {
      this.velocityX = -this.velocityX;
    }

    if (newY < -this.box.height/2 + this.radius) {
      this.velocityY = -this.velocityY;
    } else if (newY > this.box.height/2 - this.radius) {
      this.velocityY = -this.velocityY;
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

console.log(balls);
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