const start = document.getElementById("start");
const stop = document.getElementById("stop");
const blobs = document.querySelectorAll(".blob");

let lastIntervalID = 0;

const clearAllIntervals = () => {
  for (let i = 1; i <= lastIntervalID; i++)
    window.clearInterval(i);
}

const wave = (blob) => {
  // toggle "up" class
  if (blob.classList.contains("up")) {
    blob.classList.remove("up");
  } else {
    blob.classList.add("up");
  }
};

start.addEventListener("click", () => {
  clearAllIntervals();

  blobs.forEach((blob, index) => {
    blob.classList.remove("up");
    window.setTimeout(() => {  // delay each wave by 0.5s more than the last
      lastIntervalID = window.setInterval(() => wave(blob), 2000);  // call wave() every 2s
    }, index * 500)
  });
});

stop.addEventListener("click", () => clearAllIntervals());