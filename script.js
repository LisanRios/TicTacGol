// Variable global para almacenar los datos
let playersData = [];
let targetPlayer;
let attempts = 0;
const maxAttempts = 10;
const usedHints = new Set();
const score = { wins: 0, losses: 0, gamesPlayed: 0 };

// Cargar los datos del JSON cuando se inicia la página
fetch('players.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la carga del JSON: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    playersData = data;
    resetGame(); // Iniciar el juego una vez que tenemos los datos
  })
  .catch(error => console.error('Error cargando los datos:', error));

function resetGame() {
  // Seleccionar un jugador aleatorio del JSON
  targetPlayer = playersData[Math.floor(Math.random() * playersData.length)];
  usedHints.clear();
  
  // Actualizar el contenedor de intentos con los nuevos atributos
  document.getElementById("attemptsContainer").innerHTML = `
    <div class="attempt">
        <div class="attribute">Nombre</div>
        <div class="attribute">Nacionalidad</div>
        <div class="attribute">Confederación</div>
        <div class="attribute">Posición</div>
        <div class="attribute">Media</div>
        <div class="attribute">Skills</div>
        <div class="attribute">Altura</div>
        <div class="attribute">Peso</div>
        <div class="attribute">Trayectoria</div>
        <div class="attribute">Ritmo/Salto</div>
        <div class="attribute">Tiro/Manos</div>
        <div class="attribute">Pase/Pies</div>
        <div class="attribute">Regate/Reflejos</div>
        <div class="attribute">Defensa/Velocidad</div>
        <div class="attribute">Físico/Posición</div>
        <div class="attribute">TOT</div>
    </div>
  `;
  
  attempts = 0; // Reiniciar intentos
}

function checkGuess() {
  const input = document.getElementById("playerInput");
  const guess = input.value.trim();

  // Buscar el jugador en el JSON
  const guessedPlayer = playersData.find(
    (p) => p.Nombre.toLowerCase() === guess.toLowerCase()
  );

  if (!guessedPlayer) {
    showError();
    return;
  }

  attempts++;
  updateAttemptsCounter();

  const attemptDiv = document.createElement("div");
  attemptDiv.className = "attempt";

  // Definir los atributos a comparar
  const attributes = [
    "Nombre",
    "Nacionalidad",
    "Confederación",
    "Posición",
    "Media",
    "Skills",
    "Altura (cm)",
    "Peso (kg)",
    "Trayectoria",
    "Ritmo/Salto",
    "Tiro/Manos",
    "Pase/Pies",
    "Regate/Reflejos",
    "Defensa/Velocidad",
    "Físico/Posición",
    "TOT"
  ];

  attributes.forEach(key => {
    const div = document.createElement("div");
    div.className = "attribute";
    div.textContent = guessedPlayer[key];

    if (guessedPlayer[key] === targetPlayer[key]) {
      div.classList.add("correct");
    } else if (
      (key === "Media" || key === "Altura (cm)" || key === "Peso (kg)" || key === "Ritmo/Salto" || key === "Tiro/Manos" || key === "Pase/Pies" || key === "Regate/Reflejos" || key === "Defensa/Velocidad" || key === "Físico/Posición") &&
      Math.abs(guessedPlayer[key] - targetPlayer[key]) <= 2
    ) {
      div.classList.add("partial");
    } else {
      div.classList.add("incorrect");
    }

    attemptDiv.appendChild(div);
  });

  document.getElementById("attemptsContainer").appendChild(attemptDiv);
  input.value = "";

  if (guess.toLowerCase() === targetPlayer.Nombre.toLowerCase()) {
    endGame(true);
  } else if (attempts >= maxAttempts) {
    endGame(false);
  }
}

function getHint() {
  const availableHints = [
    "N acionalidad",
    "Confederación",
    "Posición",
    "Media",
    "Skills",
    "Trayectoria",
    "Ritmo/Salto",
    "Tiro/Manos",
    "Pase/Pies",
    "Regate/Reflejos",
    "Defensa/Velocidad",
    "Físico/Posición"
  ].filter(hint => !usedHints.has(hint));

  if (availableHints.length === 0) {
    document.getElementById("hint").textContent = "¡No hay más pistas disponibles!";
    return;
  }

  const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)];
  usedHints.add(randomHint);

  document.getElementById("hint").textContent = `${randomHint}: ${targetPlayer[randomHint]}`;

  if (availableHints.length === 1) {
    document.getElementById("hintButton").disabled = true;
  }
}

function updateAttemptsCounter() {
  document.getElementById("attemptsCounter").textContent = `Intentos: ${attempts}/${maxAttempts}`;
}

function showError() {
  alert("Jugador no encontrado. Por favor, intenta de nuevo.");
}

function endGame(won) {
  if (won) {
    alert("¡Felicidades! Adivinaste correctamente al jugador.");
    score.wins++;
  } else {
    alert(`Lo siento, no adivinaste al jugador. El jugador era ${targetPlayer.Nombre}.`);
    score.losses++;
  }
  score.gamesPlayed++;
  resetGame();
}