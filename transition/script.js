const start = document.getElementById("start");
const stop = document.getElementById("stop");
const blobs = document.querySelectorAll(".blob");

// store IDs of all active intervals as they are set
let intervalIDs = [];

const clearAllIntervals = () => {
  while (intervalIDs.length > 0) {
    window.clearInterval(intervalIDs[intervalIDs.length - 1]);
    intervalIDs.pop();
  }
}

const wave = (blob) => {
  blob.classList.toggle("up");
};

start.addEventListener("click", () => {
  clearAllIntervals();

  blobs.forEach((blob, index) => {
    blob.classList.remove("up");
    window.setTimeout(() => {  // delay each wave by 0.5s more than the last
      intervalIDs.push(
        window.setInterval(() => wave(blob), 2000)  // call wave() every 2s
      );
    }, index * 500)
  });
});

stop.addEventListener("click", () => clearAllIntervals());