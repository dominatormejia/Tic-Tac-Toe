const Gameboard = (function () {
  let gameboard = [];

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
    const announcement = document.querySelector(".announcements");

    if (result === "win") {
      console.log("The winner " + "is" + " " + player.name);
      announcement.textContent = `The winner is ${player.name}`;
      announcement.style.color = "green";
    } else {
      console.log("It is a tie");
      announcement.textContent = "It is a tie";
    }
  };
  const clearFunc = function () {
    gameboard = [];
  };
  return { choiceInput, clearFunc };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const displayBoard = (function () {
  const inputOne = document.querySelector("#playerOne");
  const inputTwo = document.querySelector("#playerTwo");
  const formOne = document.forms["playerOne"];
  const formTwo = document.forms["playerTwo"];
  const form = document.querySelectorAll("form");
  const box = document.querySelectorAll(".box");
  const button = document.querySelector("button");
  const announcement = document.querySelector(".announcements");

  let turn = "X";
  let playerOne = null;
  let playerTwo = null;

  const changeTurn = function () {
    turn = turn === "X" ? "O" : "X";
  };

  const getTurn = function () {
    return turn;
  };

  const reset = function () {
    turn = "X";
    playerOne = null;
    playerTwo = null;
    inputOne.value = "";
    inputTwo.value = "";
    announcement.textContent = "Enter Player Names and Start Playing";
    announcement.style.color = "black";

    box.forEach((element) => {
      const createdDivs = element.querySelectorAll(".created");

      createdDivs.forEach((div) => {
        element.removeChild(div);
      });

      element.classList.remove("clicked");
    });
  };

  form.forEach((element) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });
  inputOne.addEventListener("change", () => {
    const name = formOne["playerOne"].value;
    playerOne = createPlayer(name, "X");
    console.log(playerOne);
  });

  inputTwo.addEventListener("change", () => {
    const name = formTwo["playerTwo"].value;
    playerTwo = createPlayer(name, "O");
    console.log(playerTwo);
  });

  box.forEach((element) => {
    element.addEventListener("click", () => {
      if (
        announcement.textContent != "Enter Player Names and Start Playing" &&
        announcement.textContent != "Please input names"
      ) {
        return;
      } else if (element.classList.contains("clicked")) {
        return;
      } else if (playerOne === null || playerTwo === null) {
        console.log("Please input names");
        announcement.textContent = "Please input names";
        announcement.style.color = "red";
        return;
      } else if (getTurn() === "X") {
        const createDiv = document.createElement("div");
        createDiv.textContent = "X";
        createDiv.style.color = "green";
        createDiv.classList.add("created");
        element.appendChild(createDiv);
        element.classList.add("clicked");
        Gameboard.choiceInput(playerOne, element.id);
        console.log(element.id);
      } else if (getTurn() === "O") {
        const createDiv = document.createElement("div");
        createDiv.textContent = "O";
        createDiv.style.color = "red";
        createDiv.classList.add("created");
        element.appendChild(createDiv);
        element.classList.add("clicked");
        Gameboard.choiceInput(playerTwo, element.id);
        console.log(element.id);
      }
      changeTurn();
    });
  });

  button.addEventListener("click", () => {
    if (button.textContent === "Start Game") {
      button.textContent = "Restart";
      formOne.classList.remove("hidden");
      formTwo.classList.remove("hidden");
      announcement.classList.remove("hidden");
    } else {
      button.textContent = "Start Game";
      formOne.classList.add("hidden");
      formTwo.classList.add("hidden");
      announcement.classList.add("hidden");
      Gameboard.clearFunc();
      reset();
    }
  });
})();
