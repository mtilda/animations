const start = document.getElementById("start");
const stop = document.getElementById("stop");
const blobs = document.querySelectorAll(".blob");

let waveAnimationRequestID = null;

const wave = (timestamp) => {
  blobs.forEach((blob, index) => {
    blob.style.transform = `translateY(${100 * Math.cos(Math.PI/2 * (timestamp / 1000 - index/2))}px)`;
  });

  waveAnimationRequestID = window.requestAnimationFrame(wave);
};

start.addEventListener("click", () => {
  window.cancelAnimationFrame(waveAnimationRequestID);
  waveAnimationRequestID = window.requestAnimationFrame(wave);
});

stop.addEventListener("click", () => {
  window.cancelAnimationFrame(waveAnimationRequestID);
});