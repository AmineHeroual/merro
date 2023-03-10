window.addEventListener("DOMContentLoaded", () => {
  VANTA.BIRDS({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    backgroundColor: 0x72f25,
    birdSize: 0.5,
    backgroundAlpha: 0.0,
  });
});

setTimeout(() => {
  const main = document.querySelector("main");
  main.style.opacity = 1;
  main.style.filter = "blur(0px)";
}, 1000);
