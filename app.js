document.addEventListener("DOMContentLoaded", () => {
  //Create initial variables
  const playerRed = "Red";
  const playerYellow = "Yellow";
  let currColumns = [];

  //Set player red to start the game as a default
  let currPlayer = playerRed;

  //Boolean variable for over/in progress
  let gameOver = false;

  //Create board array
  const gameBoard = [];
  const rows = 6;
  const columns = 7;

  //Initiate the game
  window.onload = () => {
    initiateGame();
  };

  function initiateGame() {
    //Set the initial column index values
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    //Create rows and columns
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
        row.push(" ");

        //Create tiles
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", setPiece);
        document.getElementById("board").append(tile);
      }
      gameBoard.push(row);
    }
  }

  //Function to create a piece
  function setPiece() {
    //Check to see if game over
    if (gameOver) {
      return;
    }

    //Retrieve piece coordinates
    let coordinates = this.id.split("-");
    let rowNum = parseInt(coordinates[0]);
    let colNum = parseInt(coordinates[1]);

    rowNum = currColumns[colNum];
    if (rowNum < 0) {
      return;
    }

    //Update board variable - i.e. who is this being clicked by?
    gameBoard[rowNum][colNum] = currPlayer;
    let currTile = document.getElementById(
      rowNum.toString() + "-" + colNum.toString()
    );
    if (currPlayer == playerRed) {
      currTile.classList.add("red-piece");
      currPlayer = playerYellow;
    } else {
      currTile.classList.add("yellow-piece");
      currPlayer = playerRed;
    }

    //Update the row height for the column
    rowNum -= 1;

    //Update the column
    currColumns[colNum] = rowNum;

    //Add a function to check winner - is called every time a tile is clicked
    checkWinner();
  }

  //CheckWinner function
  function checkWinner() {
    //These loops use 'sliding window' techniques to check for groups of four
    //Horizontally check for Connect 4 in each row
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (gameBoard[r][c] != " ") {
          if (
            gameBoard[r][c] == gameBoard[r][c + 1] &&
            gameBoard[r][c + 1] == gameBoard[r][c + 2] &&
            gameBoard[r][c + 2] == gameBoard[r][c + 3]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }

    //Check vertically for Connect 4 in each column
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 3; r++) {
        if (gameBoard[r][c] !== " ") {
          if (
            gameBoard[r][c] == gameBoard[r + 1][c] &&
            gameBoard[r + 1][c] == gameBoard[r + 2][c] &&
            gameBoard[r + 2][c] == gameBoard[r + 3][c]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }

    //Check the anti-diagonal direction
    for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (gameBoard[r][c] != " ") {
          if (
            gameBoard[r][c] == board[r + 1][c + 1] &&
            board[r + 1][c + 1] == board[r + 2][c + 2] &&
            board[r + 2][c + 2] == board[r + 3][c + 3]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }

    //Check the diagonal direction
    for (let r = 3; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (gameBoard[r][c] != " ") {
          if (
            gameBoard[r][c] == gameBoard[r - 1][c + 1] &&
            gameBoard[r - 1][c + 1] == gameBoard[r - 2][c + 2] &&
            gameBoard[r - 2][c + 2] == gameBoard[r - 3][c + 3]
          ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  //Set winner function to show winning player
  const setWinner = (r, c) => {
    let winner = document.getElementById("winner");
    if (gameBoard[r][c] == playerRed) {
      winner.innerText = "Red Wins! 🥇";
    } else {
      winner.innerText = "Yellow Wins! 🥇";
    }
    gameOver = true;
  };
});
