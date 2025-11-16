document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const boards = [];
  let score = 0;

  const candyColors = [
    "url(images/blue-candy.png)",
    "url(images/green-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/red-candy.png)",
    "url(images/yellow-candy.png)",
  ];

  // create the game board

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const board = document.createElement("div");
      board.setAttribute("draggable", true);
      board.setAttribute("id", i);
      let randomNumber = Math.floor(Math.random() * candyColors.length);
      let randomColor = candyColors[randomNumber];
      board.style.backgroundImage = randomColor;
      grid.appendChild(board);
      boards.push(board);
    }
  }

  createBoard();

  // drag the candies

  let colorBeingDragged;
  let colorBeingReplaced;
  let boardIdBeingDragged;
  let boardIdBeingReplaced;

  boards.forEach((board) => board.addEventListener("dragstart", dragStart));
  boards.forEach((board) => board.addEventListener("dragend", dragEnd));
  boards.forEach((board) => board.addEventListener("dragover", dragOver));
  boards.forEach((board) => board.addEventListener("dragenter", dragEnter));
  boards.forEach((board) => board.addEventListener("dragleave", dragLeave));
  boards.forEach((board) => board.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    boardIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    boardIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    boards[boardIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    console.log(this.id, "drop");
  }

  function dragEnd() {
    console.log(this.id, "dragend");

    // what is a valid move
    let validMoves = [
      boardIdBeingDragged - 1,
      boardIdBeingDragged - width,
      boardIdBeingDragged + 1,
      boardIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(boardIdBeingReplaced);

    if (boardIdBeingReplaced && validMove) {
      boardIdBeingReplaced = null;
    } else if (boardIdBeingReplaced && !validMove) {
      boards[boardIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      boards[boardIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else
      boards[boardIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }

  // drop candies once some have been cleared
  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (boards[i + width].style.backgroundImage === "") {
        boards[i + width].style.backgroundImage =
          boards[i].style.backgroundImage;
        boards[i].style.backgroundImage = "";
        // const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        // const isFirstRow = firstRow.includes(i);
        // if (isFirstRow && boards[i].style.backgroundImage === "") {
        //   let randomNumber = Math.floor(Math.random() * candyColors.length);
        //   let randomColor = candyColors[randomNumber];
        //   boards[i].style.backgroundImage = randomColor;
        // }
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        let randomColor = candyColors[randomNumber];
        boards[i].style.backgroundImage = randomColor;
        if (boards[i].style.backgroundImage === "") {
          boards[i].style.backgroundImage = randomColor;
        }
      }
    }
  }

  // check for matches
  // check for row of four

  function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = boards[i].style.backgroundImage;
      const isBlank = boards[i].style.backgroundImage === "";

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];

      if (notValid.includes[i]) continue;
      if (
        rowOfFour.every(
          (index) =>
            boards[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          boards[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkRowForFour();

  // check for column of Four

  function checkColumnForFour() {
    for (let i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = boards[i].style.backgroundImage;
      const isBlank = boards[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            boards[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          boards[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkColumnForFour();

  // check for matches

  // check for row of three

  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = boards[i].style.backgroundImage;
      const isBlank = boards[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

      if (notValid.includes[i]) continue;
      if (
        rowOfThree.every(
          (index) =>
            boards[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          boards[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkRowForThree();

  // check for column of three

  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = boards[i].style.backgroundImage;
      const isBlank = boards[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            boards[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          boards[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkColumnForThree();

  window.setInterval(function () {
    moveDown();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
});
