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

const dom = createPlayer("dom", "X");
const ryan = createPlayer("ryan", "O");

Gameboard.choiceInput(ryan, 1);
Gameboard.choiceInput(dom, 2);
Gameboard.choiceInput(ryan, 3);
Gameboard.choiceInput(dom, 5);
Gameboard.choiceInput(dom, 6);
Gameboard.choiceInput(dom, 9);
Gameboard.choiceInput(ryan, 4);
Gameboard.choiceInput(dom, 7);
Gameboard.choiceInput(ryan, 8);
