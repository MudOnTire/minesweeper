const grid = document.querySelector('.grid');
let width = 10;
let bombAmount = 20;
let squares = [];
let isGameOver = false;

//create board
function createBoard() {
  // get shuffled game array with random bombs
  const bombArray = Array(bombAmount).fill('bomb');
  const emptyArray = Array(width * width - bombAmount).fill('valid');
  const shuffledArray = emptyArray.concat(bombArray).sort(() => Math.random() - 0.5);

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('id', i);
    // square.innerHTML = i;
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square);
    squares.push(square);
    square.addEventListener('click', function (e) {
      click(square);
    });
  }

  // add numbers
  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const isLeftEdge = i % 10 === 0;
    const isRightEdge = (i % 10 === width - 1);

    if (squares[i].classList.contains('valid')) {
      // left
      if (!isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
      // right
      if (!isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
      // top
      if (i > 9 && squares[i - 10].classList.contains('bomb')) total++;
      // bottom
      if (i < 90 && squares[i + 10].classList.contains('bomb')) total++;
      // top left
      if (i > 10 && !isLeftEdge && squares[i - 11].classList.contains('bomb')) total++;
      // top right
      if (i > 9 && !isRightEdge && squares[i - 9].classList.contains('bomb')) total++;
      // bottom left
      if (i < 90 && !isLeftEdge && squares[i + 9].classList.contains('bomb')) total++;
      // bottom right
      if (i < 89 && !isRightEdge && squares[i + 11].classList.contains('bomb')) total++;
      squares[i].setAttribute('data', total);
    }

  }

}

createBoard();

// click on square actions
function click(square) {
  let currentId = parseInt(square.id);
  if (isGameOver) return;
  if (square.classList.contains('checked') || square.classList.contains('flag')) return;
  if (square.classList.contains('bomb')) {
    console.log('Game Over');
  } else {
    let total = square.getAttribute('data');
    if (total !== '0') {
      square.classList.add('checked');
      square.innerHTML = total;
      return;
    }
    checkSquare(square, currentId);
  }
  square.classList.add('checked');
}

// check neighboring squares once square is clicked
function checkSquare(square, currentId) {
  const isLeftEdge = (currentId % width === 0);
  const isRightEdge = (currentId % width === width - 1);

  setTimeout(() => {
    if (!isLeftEdge) {
      const newId = squares[currentId - 1].id
    }
  }, 10);
}