const blobs = document.querySelectorAll(".blob");

const wave = (blob) => {
  blob.isUp = !blob.isUp;  // toggle isUp
  blob.style.transform = `translateY(${blob.isUp ? 100 : -100}px)`;
};

blobs.forEach((blob, index) => {
  window.setTimeout(() => {  // delay each wave by 0.5s more than the last
    window.setInterval(() => wave(blob), 2000)  // call wave() every 2s (breaks when window is hidden)
  }, index * 500)
});
