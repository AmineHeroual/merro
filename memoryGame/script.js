// Grab a couple of things

const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
const playerName = document.getElementById("player");
let playerLives = 6;

// link text

playerLivesCount.textContent = playerLives;

// Generate the data

const getData = () => [
  { imgScr: "./img/1.jpg", name: "image1" },
  { imgScr: "./img/2.jpg", name: "image2" },
  { imgScr: "./img/3.jpg", name: "image3" },
  { imgScr: "./img/4.jpg", name: "image4" },
  { imgScr: "./img/5.jpg", name: "image5" },
  { imgScr: "./img/6.jpg", name: "image6" },
  { imgScr: "./img/7.jpg", name: "image7" },
  { imgScr: "./img/8.jpg", name: "image8" },
  { imgScr: "./img/9.jpg", name: "image9" },
  { imgScr: "./img/10.jpg", name: "image10" },
  { imgScr: "./img/11.jpg", name: "image11" },
  { imgScr: "./img/12.jpg", name: "image12" },
  { imgScr: "./img/1.jpg", name: "image1" },
  { imgScr: "./img/2.jpg", name: "image2" },
  { imgScr: "./img/3.jpg", name: "image3" },
  { imgScr: "./img/4.jpg", name: "image4" },
  { imgScr: "./img/5.jpg", name: "image5" },
  { imgScr: "./img/6.jpg", name: "image6" },
  { imgScr: "./img/7.jpg", name: "image7" },
  { imgScr: "./img/8.jpg", name: "image8" },
  { imgScr: "./img/9.jpg", name: "image9" },
  { imgScr: "./img/10.jpg", name: "image10" },
  { imgScr: "./img/11.jpg", name: "image11" },
  { imgScr: "./img/12.jpg", name: "image12" },
];

// Randomize

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);

  return cardData;
};

// Card Generator function

const cardGenerator = () => {
  const cardData = randomize();

  let player = prompt("Enter Your Name: ");
  if (player === "") {
    player = "Anonymous";
  }

  playerName.textContent = player;

  // Generate HTML
  //   const cards = document.querySelectorAll(".card");
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    // Attach the info to the card

    face.src = item.imgScr;
    card.setAttribute("name", item.name);
    // Attach the cards to the section;

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

// check Cards

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //   logic

  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute("name") ===
      flippedCard[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
      playerLives++;
      playerLivesCount.textContent = playerLives;
    } else {
      console.log("wrong");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });

      playerLives--;
      playerLivesCount.textContent = playerLives;

      if (playerLives <= 0) {
        restart("... Try again");
        document.getElementById("faild").play();
      }
    }
  }

  //   Run a check to see if we won the Game.
  if (toggleCard.length === 24) {
    restart("... Bravo you win");
    document.getElementById("success").play();
  }
  //   console.log(toggleCard.length);
};

// Restart

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  section.style.setProperty("grid-gap", "0");

  //   alert("you lose...");
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // Randomize

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgScr;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
      section.style.setProperty("grid-gap", "1rem");
    }, 1000);
  });

  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => {
    window.alert(text);
  }, 100);
};

cardGenerator();
