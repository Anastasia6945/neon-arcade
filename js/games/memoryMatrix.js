const levelDisplay = document.getElementById("levelDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");

let score = 0;

const matrix = document.getElementById("matrix");
const startBtn = document.getElementById("startGame");

let level = 1;
let pattern = [];
let playerInput = [];
let clickable = false;

function createGrid(size = 4) {
  matrix.innerHTML = "";
  matrix.style.gridTemplateColumns = `repeat(${size}, 80px)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", () => handleClick(i, cell));
    matrix.appendChild(cell);
  }
}

function generatePattern(count) {
  pattern = [];
  while (pattern.length < count) {
    const rand = Math.floor(Math.random() * 16);
    if (!pattern.includes(rand)) pattern.push(rand);
  }
}

function showPattern() {
  clickable = false;
  pattern.forEach((index, i) => {
    setTimeout(() => {
      matrix.children[index].classList.add("active");
      setTimeout(() => {
        matrix.children[index].classList.remove("active");
        if (i === pattern.length - 1) clickable = true;
      }, 600);
    }, i * 800);
  });
}

function handleClick(index, cell) {
  if (!clickable) return;

  playerInput.push(index);
  cell.classList.add("active");

  setTimeout(() => cell.classList.remove("active"), 300);

  checkProgress();
}

function checkProgress() {
  const current = playerInput.length - 1;
  if (playerInput[current] !== pattern[current]) {
    alert("Wrong! Try again.");
    resetGame();
    return;
  }

  if (playerInput.length === pattern.length) {
    alert("Level complete!");
    level++;
    resetGame();
  }
}

function resetGame() {
  playerInput = [];
  startBtn.disabled = false;
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  createGrid();
  generatePattern(level + 2);
  showPattern();
});
