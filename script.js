/*BUSCAMINAS*/
let numFilas;
let numColumnas;
let bombas;
let clickMax;
/*Normal
const numFilas=7;
const numColumnas=7;
const bombas=14;*/

/*Dificil
const numFilas=10;
const numColumnas=10;
const bombas=20;*/

let posicionesTablero = [];
let tablero = document.querySelector("#tablero");

function generarTablero() {
  posicionesTablero = [];

  tablero.innerHTML = "";
  for (let i = 0; i < numFilas; i++) {
    const columnas = [];
    for (let c = 0; c < numColumnas; c++) {
      columnas.push(0);
    }
    posicionesTablero.push(columnas);
  }
}

function pintarTablero() {
  for (let i = 0; i < numFilas; i++) {
    let nuevafila = document.createElement("tr");
    tablero.appendChild(nuevafila);
    for (let c = 0; c < numColumnas; c++) {
      let nuevaColumna = document.createElement("td");
      if (posicionesTablero[i][c] == 0) {
        nuevaColumna.classList.add("vacio");
      }
      if (posicionesTablero[i][c] == 1) {
        nuevaColumna.classList.add("bomba");
      }

      nuevafila.appendChild(nuevaColumna);
    }
  }
}

function colocarBombas() {
  bombascolocadas = 0;
  do {
    let x = Math.floor(Math.random() * (numFilas - 0) + 0);
    let y = Math.floor(Math.random() * (numColumnas - 0) + 0);
    if (posicionesTablero[x][y] == 0) {
      posicionesTablero[x][y] = 1;
      bombascolocadas++;
    }
  } while (bombascolocadas < bombas);
}

document.querySelector("#facil").addEventListener("click", function () {
  numFilas = 5;
  numColumnas = 5;
  bombas = 10;
  clickMax = 14;
  generarTablero();
  colocarBombas();
  pintarTablero();
  clickbombas();
  selectstd();
});

document.querySelector("#normal").addEventListener("click", function () {
  numFilas = 7;
  numColumnas = 7;
  bombas = 14;
  clickMax = 34;
  generarTablero();
  colocarBombas();
  pintarTablero();
  clickbombas();
  selectstd();
  tablero.style.marginTop = "150px";
});

document.querySelector("#dificil").addEventListener("click", function () {
  numFilas = 10;
  numColumnas = 10;
  bombas = 20;
  clickMax = 79;
  generarTablero();
  colocarBombas();
  pintarTablero();
  clickbombas();
  selectstd();
  tablero.style.fontSize = "0.8em";
  let columnacambiar = document.querySelectorAll("#tablero td");
  for (const columna of columnacambiar) {
    columna.style.width = "25px";
    columna.style.height = "25px";
  }
});

function detectarBombaCercana(posicionX, posicionY) {
  var numBombas = 0;

  for (let y = posicionY - 1; y <= posicionY + 1; y++) {
    for (let x = posicionX - 1; x <= posicionX + 1; x++) {
      if (y == posicionY && x == posicionX && posicionesTablero[y][x] === 1) {
        return;
      }

      try {
        if (posicionesTablero[y][x] === 1) {
          numBombas++;
        }
      } catch {
        continue;
      }
    }
  }
  let casilla = tablero.childNodes[posicionY].childNodes[posicionX];
  console.log(casilla);
  let textoCasilla = document.createElement("p");
  textoCasilla.textContent = numBombas;

  casilla.appendChild(textoCasilla);
}

function clickbombas() {
  tablero.addEventListener("click", ({ target }) => {
    if (!target.matches("td")) return;
    filaTablero = target.parentNode.rowIndex;
    columnaTablero = target.cellIndex;
    detectarBombaCercana(columnaTablero, filaTablero);
  });
}

function selectstd() {
  let posiciones = document.querySelectorAll("td");
  let clicks = 0;
  for (let posicion of posiciones) {
    posicion.addEventListener("click", function () {
      console.log(posicion);

      if (clicks < clickMax) {
        if (posicion.className == "vacio") {
          console.log("No hay bomba");
          posicion.classList.add("sinBomba");
          clicks++;
        }
        if (posicion.className == "bomba") {
          console.log("Hay bomba");
          alert("Game Over");
          location.reload();
        }
      } else {
        posicion.classList.add("sinBomba");
        setTimeout(() => {
          alert("Ha ganado el juego");
          location.reload();
        }, "350");
      }
    });
  }
}
