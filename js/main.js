let block = document.getElementById("block");
let hole = document.getElementById("hole");
let character = document.getElementById("character");
let playBtn = document.querySelector("#playBtn");
let gameInterval = false; // 게임 루프의 setInterval 반환값을 저장할 변수
let gameOver = false; // 게임 종료 상태를 나타내는 변수
let jumping = 0;
let counter = 0;
let score = 0;
let time = 0;
let timeInterval;
let scoreInterval;

function increaseScore() {
  score++;
  // console.log(score);
}
function increaseTime() {
  time++;
  console.log(time);
}

hole.addEventListener("animationiteration", () => {
  let random = -(Math.random() * 300 + 200);
  hole.style.top = random + "px";
  counter++;
});

playBtn.addEventListener("click", function () {
  if (!gameInterval) {
    gameOver = false;
    block.classList.add("animateBlock");
    hole.classList.add("animateHole");
    gameInterval = setInterval(startGame, 10);
    scoreInterval = setInterval(increaseScore, 1000);
    timeInterval = setInterval(increaseTime, 1000);
  }
});

function startGame() {
  if (gameOver) {
    return;
  }

  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) {
      jump();
    }
  });

  if (jumping == 0) {
    character.style.top = characterTop + 2 + "px";
  }

  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  let cTop = -(700 - characterTop);

  if (characterTop < 100 || characterTop > 700 || (blockLeft < 50 && blockLeft > -50 && (cTop < holeTop || cTop > holeTop + 150))) {
    block.classList.remove("animateBlock");
    hole.classList.remove("animateHole");
    character.style.top = 300 + "px";
    character.style.left = 250 + "px";
    counter = 0;
    window.clearInterval(gameInterval);
    gameInterval = false;
    gameOver = true;
    clearInterval(scoreInterval);
    clearInterval(timeInterval);
    score = 0;
    time = 0;
  }
}

function jump() {
  if (gameOver) {
    return;
  }
  if (jumping == 0) {
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function () {
      let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
      if (characterTop > 6 && jumpCount < 15) {
        character.style.top = characterTop - 5 + "px";
      }
      if (jumpCount > 20) {
        clearInterval(jumpInterval);
        jumping = 0;
        jumpCount = 0;
      }
      jumpCount++;
    }, 10);
  }
}
