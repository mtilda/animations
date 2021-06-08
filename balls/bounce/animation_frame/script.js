const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const ballDivs = document.querySelectorAll('.ball');
const ballContainerDiv = document.querySelectorAll('.ball');

class Ball {
  constructor(node, radius) {
    this.node = node;
    this.width = radius * 2;
    this.height = radius * 2;
    this.node.style.width = this.width + 'px';
    this.node.style.height = this.height + 'px';
    this.node.style.position = 'absolute';

    this.positionX = 0;
    this.positionY = 0;
    this.velocityX = 2 * (Math.random() - 0.5);
    this.velocityY = 2 * (Math.random() - 0.5);
  }

  update() {
    this.node.style.transform = `translate(
      ${this.positionX}px,
      ${this.positionY}px
    )`
  }
  
  step() {
    this.positionX += this.velocityX;
    this.positionY += this.velocityY;
    this.update();
  }
}

const balls = [];

ballDivs.forEach((ballDiv) => {
  balls.push(new Ball(ballDiv, 32, 32));
});

console.log(balls)

let animationRequestID = null;

const step = () => {
  balls.forEach((ball) => ball.step());
  console.log(balls[0].positionX);
  animationRequestID = window.requestAnimationFrame(step);
}

startButton.addEventListener('click', () => {
  window.cancelAnimationFrame(animationRequestID);
  animationRequestID = window.requestAnimationFrame(step);
});

stopButton.addEventListener('click', () => {
  window.cancelAnimationFrame(animationRequestID);
});