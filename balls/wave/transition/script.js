const start = document.getElementById("start");
const stop = document.getElementById("stop");
const balls = document.querySelectorAll(".ball");

// store IDs of all active intervals as they are set
let intervalIDs = [];

const clearAllIntervals = () => {
  while (intervalIDs.length > 0) {
    window.clearInterval(intervalIDs[intervalIDs.length - 1]);
    intervalIDs.pop();
  }
}

const wave = (ball) => {
  ball.classList.toggle("up");
};

start.addEventListener("click", () => {
  clearAllIntervals();

  balls.forEach((ball, index) => {
    ball.classList.remove("up");
    window.setTimeout(() => {  // delay each wave by 0.5s more than the last
      intervalIDs.push(
        window.setInterval(() => wave(ball), 2000)  // call wave() every 2s
      );
    }, index * 500)
  });
});

stop.addEventListener("click", () => clearAllIntervals());