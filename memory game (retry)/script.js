
const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "grey",
    "cyan",
    "lightblue",
    "lime"
  ];
  
  
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let matches = 0;
  let score = 0;
  
  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("flip")) return;

    this.classList.add("flip");

    // Set the background color to match the color class or a random color
    this.style.backgroundColor = this.classList[1] || getRandomColor();

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}


  
function getRandomColor() {
    // Generate a random index for colors array
    const randomIndex = Math.floor(Math.random() * colors.length);
    // Get the color at the random index
    return colors[randomIndex];
}

  
function checkForMatch() {
    let isMatch = firstCard.style.backgroundColor === secondCard.style.backgroundColor;

    if (isMatch) {
        updateScore();
        disableCards();
    } else {
        unflipCards();
    }

    if (isMatch) {
        matches++;
        if (matches === colors.length / 2) {
            endGame();
        }
    }
}


function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.style.backgroundColor = "black";
        secondCard.style.backgroundColor = "black";
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
}


  
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  
    resetBoard();
  }
  
  
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    setTimeout(() => {
        lockBoard = false;
    }, 1000);
}

  
function updateScore() {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
}

  
  function startGame() {
    resetBoard();
    matches = 0;
    score = 0;
    document.getElementById("score").innerText = `Score: 0`;
  
    const shuffledColors = shuffle(colors.concat(colors));
    createDivsForColors(shuffledColors);
  }
  
  function endGame() {
    alert(`Congratulations! You've matched all pairs with a score of ${score}.`);
  }
  
  function createDivsForColors(colorArray) {
    const gameContainer = document.getElementById("game-container");
  
    // Clear existing cards
    gameContainer.innerHTML = '';
  
    colorArray.forEach(color => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add(color); // Add color class to the card
      card.addEventListener("click", flipCard);
      gameContainer.appendChild(card);
    });
  }
  
  
  
  
  
  function shuffle(array) {
    let counter = array.length;
  
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
  
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }
  
  // Add event listeners for start and restart buttons
  document.getElementById("start-button").addEventListener("click", startGame);
  document.getElementById("restart-button").addEventListener("click", startGame);
  
  // Initial game setup
  startGame();
  