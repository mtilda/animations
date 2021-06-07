const start = document.getElementById("start");
const blobs = document.querySelectorAll(".blob");

const wave = (timestamp) => {
  blobs.forEach((blob, index) => {
    blob.style.transform = `translateY(${100 * Math.cos(Math.PI/2 * (timestamp / 1000 - index/2))}px)`;
  });

  window.requestAnimationFrame(wave);
};

const waveAnimationRequest = null;
start.addEventListener("click", () => {
  window.cancelAnimationFrame(waveAnimationRequest);
  waveAnimationRequest = window.requestAnimationFrame(wave);
});
