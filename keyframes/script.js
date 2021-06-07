const start = document.getElementById("start");
const stop = document.getElementById("stop");
const bobContainer = document.querySelector(".blob-container");

const startAnimation = () => {
  bobContainer.classList.add("wave");
}

const stopAnimation = () => {
  bobContainer.classList.remove("wave");
}

start.addEventListener("click", startAnimation);
stop.addEventListener("click", stopAnimation);