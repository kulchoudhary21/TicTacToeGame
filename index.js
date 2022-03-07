let size;
function initial() {
  size = document.getElementById("grid-size").value;
  let content = "";
  let block = document.getElementById("block");
  for (let i = 0, k = 0; i < size; i++) {
    content += `<div class="row">`;
    for (let j = 0; j < size; j++) {
      content += ` <div class="col c1" id="box${k}"></div>`;
      k++;
    }
    content += `</div>`;
  }
  block.innerHTML = content;
}
var flag = 0,
  i = 0;
function start() {
  let msg = document.getElementById("msg");
  let p1 = document.getElementById("p1");
  let p2 = document.getElementById("p2");
  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;
  msg.innerHTML = "Ready to Start";
  p1.innerHTML = "Player1 : " + player1;
  p2.innerHTML = "Player2 : " + player2;
  let box = [],
    counter = 1,
    temp = [];
  for (let j = 0; j < size * size; j++)
    box.push(document.getElementById("box" + j));
  let arr = [];
  let game = new Array(size);
  for (let j = 0; j < size; j++) game[j] = new Array(size);

  for (let j = 0, l = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      game[j][k] = counter++;
      if (l % 2 == 0) arr.push("O");
      else arr.push("X");
      temp.push(0);
      l++;
    }
  }
  for (let j = 0; j < size * size; j++) {
    box[j].addEventListener("click", function () {
      if (flag == 0 && temp[j] == 0) {
        box[j].style.borderColor = "blue";
        if (i < size * size) {
          box[j].innerHTML = arr[i];
          game[parseInt(j / size)][parseInt(j % size)] = arr[i];
          i++;
          temp[j] = 1;
        }
        if (i > 1 && i < size * size + 1) check(game);
      }
    });
  }
}
const check = async (game) => {
  let win = false;
  for (let i = 0; i < size && !win; i++) {
    let row = game[i];
    const ele = game[i][0];
    const result = row.find((item) => item != ele);
    if (!result) win = ele;
  }
  for (let i = 0; i < size && !win; i++) {
    let col = [];
    for (let j = 0; j < size; j++) col.push(game[j][i]);
    const ele = game[0][i];
    const result = col.find((item) => item != ele);
    if (!result) win = ele;
  }

  for (let i = 0; i < size && !win; i++) {
    let arr1 = [];
    for (let j = 0; j < size; j++) arr1.push(game[j][j]);
    const ele = game[0][i];
    const result = arr1.find((item) => item != ele);
    if (!result) win = ele;
  }

  for (let i = 0; i < size && !win; i++) {
    let arr1 = [];
    for (let j = 0; j < size; j++) arr1.push(game[j][size - 1 - j]);
    const ele = game[0][i];
    const result = arr1.find((item) => item != ele);
    if (!result) win = ele;
  }
  if (win) {
    flag = 1;
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    let winner = player1;
    let looser = player2;
    if (win == "X") {
      winner = player2;
      looser = player1;
    }
    document.getElementById("win-msg").innerHTML = winner + " won the match !";
    const respons = await fetch("http://127.0.0.1:5000/result", {
      method: "POST",
      body: JSON.stringify({
        winner: winner,
        looser: looser,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (flag == 0 && i == size * size)
    document.getElementById("win-msg").innerHTML = "match tie !";
  let replay = document.getElementById("checkButton1");
  replay.innerHTML = "replay";
  replay.onclick = replayGame;
};
function checkOption() {
  initial();
  const name1 = document.getElementById("player1").value;
  const name2 = document.getElementById("player2").value;
  if (name1.length > 0 && name2.length > 0) start();
}
function replayGame() {
  window.location.reload();
}
function reset1() {
  window.location.reload();
}
