document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const boards = [];

  const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

  // create the game board

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const board = document.createElement("div");
      board.setAttribute("draggable", true);
      board.setAttribute("id", i);
      let randomNumber = Math.floor(Math.random() * candyColors.length);
      let randomColor = candyColors[randomNumber];
      board.style.backgroundColor = randomColor;
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
    colorBeingDragged = this.style.backgroundColor;
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
    colorBeingReplaced = this.style.backgroundColor;
    boardIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    boards[boardIdBeingDragged].style.backgroundColor = colorBeingReplaced;
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
      boards[boardIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      boards[boardIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else
      boards[boardIdBeingDragged].style.backgroundColor = colorBeingDragged;

  }
});
