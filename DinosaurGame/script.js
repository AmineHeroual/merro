// board
let board;
let boardWidth = 850;
let boardHeight = 350;
let context;

// dino
let dinowith = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

// Dino Object
let dino = {
  x: dinoX,
  y: dinoY,
  width: dinowith,
  height: dinoHeight,
};

// cactus

let cacutsArr = [];

let cactus1W = 34; // 34 origin value
let cactus2W = 59; // 69 origin value
let cactus3W = 82; // 102 orgin value
let cactusH = 70;
let cactusX = 700;

let cactusY = boardHeight - cactusH;

let cactus1Img;
let cactus2Img;
let cactus3Img;

// cloud
let cloudW = 82; // 102 orgin value
let cloudH = 70;
let cloudX = 700;

let cloudY = boardHeight - cloudH;

let cloudImg;

// physics

let velocityX = -8;
let velocityY = 0;
let gravity = 1.6;

let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d"); //used for drawing on the board.

  //   draw initial dino;
  //   context.fillStyle = "green";
  //   context.fillRect(dino.x, dino.y, dino.width, dino.height);

  dinoImg = new Image();
  dinoImg.src = "./img/dino.png";
  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  cactus1Img = new Image();
  cactus2Img = new Image();
  cactus3Img = new Image();

  cactus1Img.src = "./img/cactus1.png";
  cactus2Img.src = "./img/cactus2.png";
  cactus3Img.src = "./img/cactus3.png";

  requestAnimationFrame(update);
  setInterval(placeCactus, 1000); // 1s

  document.addEventListener("keydown", moveDino);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  //   dino
  velocityY += gravity;
  dino.y = Math.min(dino.y + velocityY, dinoY); //applay gravity to current dino y
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

  //   cactus
  for (let i = 0; i < cacutsArr.length; i++) {
    let cactus = cacutsArr[i];
    cactus.x += velocityX;
    context.drawImage(
      cactus.img,
      cactus.x,
      cactus.y,
      cactus.width,
      cactus.height
    );

    if (detectCollision(dino, cactus)) {
      gameOver = true;
      dinoImg.src = "./img/dino-dead.png";
      dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
      };
    }
  }

  //   score

  context.fillStyle = "black";
  context.font = "20px courier";
  score++;
  context.fillText(score, 5, 20);
}

function moveDino(e) {
  if (gameOver) {
    return;
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
    // jump
    velocityY = -30;
    dinoImg.src = "./img/dino.png";
  } else if (e.code == "ArrowDown" && dino.y == dinoY) {
    // duck

    let dinowith = 58;
    let dinoHeight = 54;
    let dinoX = 10;
    let dinoY = boardHeight - dinoHeight;

    dinoImg.src = "./img/dino-duck2.png";
  }
}

function placeCactus() {
  if (gameOver) {
    return;
  }
  // place cactus

  let cactus = {
    img: null,
    x: cactusX,
    y: cactusY,
    width: null,
    height: cactusH,
  };

  let cloud = {
    img: null,
    x: cloudX,
    y: cloudY,
    width: null,
    height: cloudH,
  };

  let placeCactusChance = Math.random(); //0...0.9999

  if (placeCactusChance > 0.9) {
    cactus.img = cactus3Img;
    cactus.width = cactus3W;
    cacutsArr.push(cactus);
  } else if (placeCactusChance > 0.6) {
    cactus.img = cactus2Img;
    cactus.width = cactus2W;
    cacutsArr.push(cactus);
  } else if (placeCactusChance > 0.4) {
    cactus.img = cactus1Img;
    cactus.width = cactus1W;
    cacutsArr.push(cactus);
  }

  if (cacutsArr.length > 5) {
    cacutsArr.shift(); //remove the first element from the array
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
