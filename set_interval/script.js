const start = document.getElementById("start");
const stop = document.getElementById("stop");
const blobs = document.querySelectorAll(".blob");

let waveIntervalID = null;

const wave = (timestamp) => {
  blobs.forEach((blob, index) => {
    blob.style.transform = `translateY(${100 * Math.cos(Math.PI/2 * (timestamp / 1000 - index/2))}px)`;
  });
};

start.addEventListener("click", () => {
  window.clearInterval(waveIntervalID);
  waveIntervalID = window.setInterval(() => wave(Date.now()), 16);
});

stop.addEventListener("click", () => {
  window.clearInterval(waveIntervalID);
});