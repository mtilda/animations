/*================================
        DOM NODE SELECTORS
================================*/

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const ballDivs = document.querySelectorAll('.ball');
const ballContainerDiv = document.querySelector('.ball-container');

/*================================
        CLASSES
================================*/

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

    this.topLimit     = this.box.height/2 - this.radius;
    this.bottomLimit  = -this.topLimit;
    this.rightLimit   = this.box.width/2 - this.radius;
    this.leftLimit    = -this.rightLimit;
  }

  fall() {
    if (this.positionY > -this.box.height/2 + this.radius + 10) {
      this.velocityY -= 0.02;
    }
  }

  bounceX(limit) {
    if (Math.abs(this.velocityX) > 0.5) {
      this.velocityX = -0.9 * this.velocityX;
    } else {
      this.velocityX = 0;
      this.positionX = limit;
    };
  }

  bounceY(limit) {
    if (Math.abs(this.velocityY) > 0.5) {
      this.velocityY = -0.9 * this.velocityY;
    } else {
      this.velocityY = 0;
      this.positionY = limit;
    };
  }
  
  boxBounce() {
    let newX = this.positionX + this.velocityX;
    let newY = this.positionY + this.velocityY;
    
    if (newX < this.leftLimit) {
      this.bounceX(this.leftLimit);
    } else if (newX > this.rightLimit) {
      this.bounceX(this.rightLimit);
    }
    
    if (newY < this.bottomLimit) {
      this.bounceY(this.bottomLimit);
    } else if (newY > this.topLimit) {
      this.bounceY(this.topLimit);
    }
  }

  boxFriction() {
    if (this.velocityY === 0 && (this.positionY <= this.bottomLimit || this.positionY >= this.topLimit)) {
      this.velocityX *= 0.995;
    }

    if (this.velocityX === 0 && (this.positionX <= this.leftLimit || this.positionX >= this.rightLimit)) {
      this.velocityY *= 0.995;
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
    this.boxFriction();

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    this.update();
  }
}

/*================================
        GLOBAL VARIABLES
================================*/

const box = new Box(ballContainerDiv, 800, 500);
const balls = [];

ballDivs.forEach((ballDiv) => {
  balls.push(new Ball(ballDiv, 32, box));
});

let animationRequestID = null;

/*================================
        GLOBAL FUNCTIONS
================================*/

const step = () => {
  balls.forEach((ball) => ball.step());
  animationRequestID = window.requestAnimationFrame(step);
}

/*================================
        DOM EVENTS
================================*/

startButton.addEventListener('click', () => {
  window.cancelAnimationFrame(animationRequestID);
  animationRequestID = window.requestAnimationFrame(step);
});

stopButton.addEventListener('click', () => {
  window.cancelAnimationFrame(animationRequestID);
});