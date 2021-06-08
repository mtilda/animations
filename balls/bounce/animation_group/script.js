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

class AnimationGroup {
  constructor(animatables) {
    this.animatables = animatables;
    this.animationRequestID = null;
  }

  step() {
    let someAreAnimated = false;
    this.animatables.forEach((a) => {
      if (a.idleFrames < a.maxIdleFrames) {
        a.step();
        someAreAnimated = true;
        a.node.style.filter = 'brightness(100%)';
      } else {
        a.node.style.filter = 'brightness(60%)';
      }
    });

    if (someAreAnimated) {
      this.animationRequestID = window.requestAnimationFrame(this.step.bind(this));
    }
  }

  start() {
    this.animationRequestID = window.requestAnimationFrame(this.step.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.animationRequestID);
    this.animationRequestID = null;
  }
}

class Animatable {
  constructor() {
    this.maxIdleFrames = 4;
    this.idleFrames = 0;
  }

  step() {
    throw new Error('Animatables must have a method \'step\'');
  }
}

class Ball extends Animatable {
  constructor(node, radius, borderBox) {
    super();
    this.node   = node;
    this.radius = radius;
    this.radius = radius;
    borderBox   = borderBox;

    this.node.style.width     = 2 * this.radius + 'px';
    this.node.style.height    = 2 * this.radius + 'px';
    this.node.style.position  = 'absolute';

    this.topLimit     = borderBox.height/2 - this.radius;
    this.bottomLimit  = -this.topLimit;
    this.rightLimit   = borderBox.width/2 - this.radius;
    this.leftLimit    = -this.rightLimit;

    this.positionX = 0;
    this.positionY = 0;
    this.velocityX = 8 * (Math.random() - 0.5);
    this.velocityY = 8 * (Math.random() - 0.5);

    this.gravitationalAcceleration  = -0.02;
    this.bounceFrictionCoeff        = 0.9;
    this.slidingFrictionCoeff       = 0.99;
    this.dragCoeff                  = 0.999;
    this.minVelocity                = 0.001;
  }

  applyGravity() {
    if (this.positionY > -borderBox.height/2 + this.radius + 10) {
      this.velocityY += this.gravitationalAcceleration;
    }
  }

  bounceX(limit) {
    if (Math.abs(this.velocityX) > 0.5) {
      this.velocityX *= -this.bounceFrictionCoeff;
    } else {
      this.velocityX = 0;
      this.positionX = limit;
    };
  }

  bounceY(limit) {
    if (Math.abs(this.velocityY) > 0.5) {
      this.velocityY *= -this.bounceFrictionCoeff;
    } else {
      this.velocityY = 0;
      this.positionY = limit;
    };
  }
  
  applyBoxBounce() {
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

  applyBoxFriction() {
    if (this.velocityY === 0 && (this.positionY <= this.bottomLimit || this.positionY >= this.topLimit)) {
      this.velocityX *= this.slidingFrictionCoeff;
    }

    if (this.velocityX === 0 && (this.positionX <= this.leftLimit || this.positionX >= this.rightLimit)) {
      this.velocityY *= this.slidingFrictionCoeff;
    }
  }

  applyDrag() {
    this.velocityX *= this.dragCoeff;
    this.velocityY *= this.dragCoeff;
  }

  applyVelocityZeroing() {
    let isStopped = true;

    if (Math.abs(this.velocityX) < this.minVelocity) {
      this.velocityX = 0;
    } else {
      isStopped = false;
    }

    if (Math.abs(this.velocityY) < this.minVelocity) {
      this.velocityY = 0;
    } else {
      isStopped = false;
    }

    // if motion stops, mark as idle
    if (isStopped) {
      this.idleFrames++;
    } else {
      this.idleFrames = 0;
    }
  }

  update() {
    this.node.style.transform = `translate(
      ${-this.positionX}px,
      ${-this.positionY}px
    )`
  }
  
  step() {
    this.applyGravity();
    this.applyBoxBounce();
    this.applyBoxFriction();
    this.applyDrag();
    this.applyVelocityZeroing();

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    this.update();
  }
}

class BorderBox {
  constructor(node, width, height) {
    this.node = node;
    this.width = width;
    this.height = height;

    this.node.style.width = width + 16 + 'px';
    this.node.style.height = height + 16 + 'px';
    this.node.style.border = '8px solid black';
    this.node.style.borderRadius = '8px';
  }
}

/*================================
        GLOBAL VARIABLES
================================*/

const borderBox = new BorderBox(ballContainerDiv, 800, 500);
const balls = [];
ballDivs.forEach((ballDiv) => {
  balls.push(new Ball(ballDiv, 32, borderBox));
});

const ballAnimationGroup = new AnimationGroup(balls);

/*================================
        GLOBAL FUNCTIONS
================================*/

const startAnimation = () => {
  ballAnimationGroup.start();
}

const stopAnimation = () => {
  ballAnimationGroup.stop();
}

/*================================
        DOM EVENTS
================================*/

startButton.addEventListener('click', startAnimation);

stopButton.addEventListener('click', stopAnimation);