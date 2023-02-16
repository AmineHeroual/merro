const colorCode = document.querySelector(".colorCode");
const btn = document.querySelector("button");
const simple = document.getElementById("simple");
const hex = document.getElementById("hex");

let mode = hex;

simple.addEventListener("click", (e) => {
  mode = simple;
});

hex.addEventListener("click", (e) => {
  mode = hex;
});

btn.addEventListener("click", (e) => {
  let color =
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
  console.log(color);

  document.body.style.background = color;

  if (mode === hex) {
    colorCode.textContent = color;
  } else {
    colorCode.textContent = document.body.style.background;
  }
});
