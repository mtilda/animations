const blobs = document.querySelectorAll(".blob");

const wave = (blob) => {
  // toggle "up" class
  if (blob.classList.contains("up")) {
    blob.classList.remove("up");
  } else {
    blob.classList.add("up");
  }
};

blobs.forEach((blob, index) => {
  window.setTimeout(() => {  // delay each wave by 0.5s more than the last
    window.setInterval(() => wave(blob), 2000)  // call wave() every 2s
  }, index * 500)
});
