const Gameboard = (function () {
  const gameboard = [];

  const choiceInput = (player, input) => {
    const duplicate = gameboard.some((array) => array.position === input);
    if (duplicate) {
      console.log("no repeats");
      return;
    }
    displayInput(player, input);
    gameboard.push({
      name: player.name,
      position: input,
      marker: player.marker,
    });
    decideResult(player, input);
  };

  const displayInput = (player, input) => {
    console.log({ name: player.name, position: input });
  };

  const decideResult = (player) => {
    let markerArray = gameboard.map(
      (array) => `${array.marker}${array.position}`
    );

    markerArray = [...new Set(markerArray)];
    console.log(markerArray);

    if (markerArray.length === 9) {
      displayResult("tie");
    }

    const winningCombos = [
      ["X1", "X2", "X3"],
      ["X4", "X5", "X6"],
      ["X7", "X8", "X9"],
      ["X1", "X4", "X7"],
      ["X2", "X5", "X8"],
      ["X3", "X6", "X9"],
      ["X1", "X5", "X9"],
      ["X3", "X5", "X7"],

      ["O1", "O2", "O3"],
      ["O4", "O5", "O6"],
      ["O7", "O8", "O9"],
      ["O1", "O4", "O7"],
      ["O2", "O5", "O8"],
      ["O3", "O6", "O9"],
      ["O1", "O5", "O9"],
      ["O3", "O5", "O7"],
    ];

    for (const combo of winningCombos) {
      if (combo.every((num) => markerArray.includes(num))) {
        displayResult("win", player);
      }
    }
  };

  const displayResult = (result, player) => {
    if (result === "win") {
      console.log("The winner " + "is" + " " + player.name);
    } else {
      console.log("It is a tie");
    }
  };

  return { choiceInput };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const turnController = (function () {
  const box = document.querySelectorAll(".box");
  let turn = "X";
  const changeTurn = function () {
    turn = turn === "X" ? "O" : "X";
  };

  const getTurn = function () {
    return turn;
  };

  box.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.classList.contains("clicked")) {
        return;
      } else if (getTurn() === "X") {
        element.style.backgroundColor = "red";
        element.classList.add("clicked");
        alert(`${element.id}`);
      } else if (getTurn() === "O") {
        element.style.backgroundColor = "green";
        element.classList.add("clicked");
        alert(`${element.id}`);
      }
      changeTurn();
    });
  });
})();

const playerOne = createPlayer("dom", "X");
const playerTwo = createPlayer("ryan", "O");

Gameboard.choiceInput(playerTwo, 1);
Gameboard.choiceInput(playerOne, 2);

const inputOne = document.querySelector("#playerOne");
const inputTwo = document.querySelector("#playerTwo");

const form = document.querySelectorAll("form");

form.forEach((element) => {
  element.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

function myFunction() {
  const placeholderOne = document.forms["playerOne"]["playerOne"].value;
  console.log(placeholderOne);
}

function myFunctionTwo() {
  const placeholderTwo = document.forms["playerTwo"]["playerTwo"].value;
  console.log(placeholderTwo);
}
inputOne.addEventListener("change", myFunction);
inputTwo.addEventListener("change", myFunctionTwo);
