// Variables globales
let players = [];
let targetPlayer;
let attempts = 0;
let maxAttempts = 10;
let hintsRemaining = 0;
let currentStreak = 0;
let bestStreak = 0;
let gameStarted = false;
let usedHints = new Set();
let score = {
  wins: 0,
  losses: 0,
  gamesPlayed: 0,
};

// Cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  resetGame();
  updateStatistics();
});

// Función para inicializar el juego
function initializeGame() {
  // Configurar event listeners
  document
    .querySelector(".difficulty-buttons")
    .addEventListener("click", handleDifficultySelection);
  document.getElementById("game-content").style.display = "none";

  // Cargar estadísticas guardadas
  loadStats();

  // Configurar otros event listeners
  document
    .querySelector('button:contains("🔄 Nueva Partida")')
    .addEventListener("click", resetGame);
  document.querySelector("#hintButton").addEventListener("click", getHint);
  document
    .querySelector('button:contains("📤 Compartir")')
    .addEventListener("click", shareResult);
  document
    .querySelector('button:contains("🌓 Cambiar Tema")')
    .addEventListener("click", toggleDarkMode);

  // Configurar el input para adivinar
  const inputContainer = document.querySelector(".input-container");
  inputContainer.innerHTML = `
        <input type="text" id="playerInput" list="playersList" placeholder="Ingresa el nombre del jugador">
        <datalist id="playersList"></datalist>
        <button id="guessButton" onclick="checkGuess()">Adivinar</button>
    `;

  // Event listener para el input
  document.getElementById("playerInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkGuess();
  });
}

async function loadPlayers() {
  try {
    const response = await fetch("data.json");
    players = await response.json();
    resetGame();
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
}

// Manejador de selección de dificultad
function handleDifficultySelection(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const difficultyText = button.textContent;
  const hintButton = document.getElementById("hintButton");

  if (difficultyText.includes("Fácil")) {
    maxAttempts = 20;
    hintsRemaining = 3;
    hintButton.style.display = "block";
  } else if (difficultyText.includes("Normal")) {
    maxAttempts = 10;
    hintsRemaining = 1;
    hintButton.style.display = "block";
  } else if (difficultyText.includes("Difícil")) {
    maxAttempts = 5;
    hintsRemaining = 0;
    hintButton.style.display = "none";
  }

  document.getElementById("difficulty-selector").style.display = "none";
  document.getElementById("game-content").style.display = "block";
  gameStarted = true;
  resetGame();
}

function setDifficulty() {
  const difficulty = document.getElementById("difficultySelect").value;
  const hintButton = document.getElementById("hintButton");

  if (difficulty === "easy") {
    maxAttempts = 20;
    hintButton.style.display = "block"; // Mostrar pistas
  } else if (difficulty === "normal") {
    maxAttempts = 10;
    hintButton.style.display = "block"; // Mostrar pistas
  } else if (difficulty === "hard") {
    maxAttempts = 5;
    hintButton.style.display = "none"; // Ocultar pistas
  }

  attempts = 0;
  updateAttemptsCounter();
  resetGame();
}

// Función para reiniciar el juego
function resetGame() {
  targetPlayer = players[Math.floor(Math.random() * players.length)];
  attempts = 0;
  usedHints.clear(); // Limpia las pistas usadas

  // Reinicia las pistas según la dificultad
  if (maxAttempts === 20) {
    // Modo fácil
    hintsRemaining = 3;
  } else if (maxAttempts === 10) {
    // Modo normal
    hintsRemaining = 1;
  } else {
    // Modo difícil
    hintsRemaining = 0;
  }

  // Actualiza la visualización del botón de pista
  const hintButton = document.getElementById("hintButton");
  if (hintButton) {
    hintButton.style.display = hintsRemaining > 0 ? "block" : "none";
    hintButton.disabled = false; // Habilita el botón de pista
  }

  const attemptsList = document.getElementById("attemptsList");
  if (attemptsList) {
    attemptsList.innerHTML = "";
  }

  const gameOver = document.getElementById("gameOver");
  if (gameOver) gameOver.innerHTML = "";

  const playerInput = document.getElementById("playerInput");
  if (playerInput) {
    playerInput.value = "";
    playerInput.disabled = false;
  }

  const guessButton = document.getElementById("guessButton");
  if (guessButton) guessButton.disabled = false;

  const shareButton = document.getElementById("shareButton");
  if (shareButton) shareButton.style.display = "none";

  const newGameButton = document.getElementById("newGameButton");
  if (newGameButton) newGameButton.style.display = "none";

  const hint = document.getElementById("hint");
  if (hint) hint.textContent = "";

  updateAttemptsCounter();
  updateStatistics();
}

function updateStatistics() {
  const totalGames = document.getElementById("totalGames");
  const totalWins = document.getElementById("totalWins");
  const currentStreakElement = document.getElementById("currentStreak");
  const bestStreakElement = document.getElementById("bestStreak");
  const winRateElement = document.getElementById("winRate");

  if (totalGames) totalGames.textContent = score.gamesPlayed;
  if (totalWins) totalWins.textContent = score.wins;

  // Asegurarse de que la racha actual nunca sea negativa
  currentStreak = Math.max(0, currentStreak);
  if (currentStreakElement) currentStreakElement.textContent = currentStreak;

  if (bestStreakElement) bestStreakElement.textContent = bestStreak;

  if (winRateElement && score.gamesPlayed > 0) {
    const winRate = ((score.wins / score.gamesPlayed) * 100).toFixed(1);
    winRateElement.textContent = `${winRate}%`;
  } else if (winRateElement) {
    winRateElement.textContent = "0%";
  }
}

// Función para actualizar las estadísticas en la UI
function updateStats() {
  const currentStreakElement = document.getElementById("currentStreak");
  const bestStreakElement = document.getElementById("bestStreak");
  const totalGamesElement = document.getElementById("totalGames");
  const winRateElement = document.getElementById("winRate");

  if (currentStreakElement) currentStreakElement.textContent = currentStreak;
  if (bestStreakElement) bestStreakElement.textContent = bestStreak;
  if (totalGamesElement) totalGamesElement.textContent = score.gamesPlayed;

  if (winRateElement && score.gamesPlayed > 0) {
    const winRate = ((score.wins / score.gamesPlayed) * 100).toFixed(1);
    winRateElement.textContent = `${winRate}%`;
  }
}

function updateAttemptsCounter() {
  document.getElementById("remainingAttempts").textContent =
    maxAttempts === Infinity ? "Infinitos" : maxAttempts - attempts;
  updateProgressBar();
}

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const percentage =
    maxAttempts === Infinity
      ? 100
      : ((maxAttempts - attempts) / maxAttempts) * 100;
  progressBar.style.width = percentage + "%";
}

function getHint() {
  if (hintsRemaining > 0) {
    const availableHints = [
      "Nacionalidad",
      "Media",
      "Posición",
      "Skills",
      "Confederación",
      "Trayectoria",
    ].filter((hint) => !usedHints.has(hint));

    if (availableHints.length === 0) {
      document.getElementById("hint").textContent =
        "¡No hay más pistas disponibles!";
      return;
    }

    const randomHint =
      availableHints[Math.floor(Math.random() * availableHints.length)];
    usedHints.add(randomHint);

    document.getElementById(
      "hint"
    ).textContent = `${randomHint}: ${targetPlayer[randomHint]}`;

    hintsRemaining--;

    if (hintsRemaining === 0) {
      document.getElementById("hintButton").disabled = true;
    }
  }
}

function showError() {
  const input = document.getElementById("playerInput");
  const button = document.getElementById("guessButton");

  input.classList.add("shake");
  button.classList.add("button-error");

  setTimeout(() => {
    input.classList.remove("shake");
    button.classList.remove("button-error");
  }, 500);
}

function checkGuess() {
  const input = document.getElementById("playerInput");
  const guess = input.value.trim();

  // Añadir log para debug
  console.log("Players array:", players);
  console.log("Trying to guess:", guess);

  if (!guess) {
    console.log("Empty guess");
    showError();
    return;
  }

  const guessedPlayer = players.find((p) => {
    // Añadir verificación null/undefined
    if (!p || !p.Nombre) {
      console.log("Invalid player in data:", p);
      return false;
    }
    return p.Nombre.toLowerCase() === guess.toLowerCase();
  });

  console.log("Found player:", guessedPlayer);

  if (!guessedPlayer) {
    showError();
    return;
  }

  attempts++;
  updateAttemptsCounter();

  const attemptDiv = document.createElement("div");
  attemptDiv.className = "attempt";

  // Verificar que targetPlayer existe
  if (!targetPlayer) {
    console.error("Target player is undefined!");
    return;
  }

  const attributes = [
    { key: "Nombre", label: "Nombre" },
    { key: "Nacionalidad", label: "Nacionalidad" },
    { key: "Confederación", label: "Confederación" },
    { key: "Media", label: "Media" },
    { key: "Posición", label: "Posición" },
    { key: "Skills", label: "Skills" },
    { key: "Altura (cm)", label: "Altura" },
    { key: "Trayectoria", label: "Trayectoria" },
  ];

  attributes.forEach(({ key, label }) => {
    const div = document.createElement("div");
    div.className = "attribute";

    // Verificar que la propiedad existe
    if (guessedPlayer[key] === undefined) {
      console.warn(`Property ${key} not found in player:`, guessedPlayer);
      div.textContent = "N/A";
      div.classList.add("incorrect");
    } else {
      div.textContent = guessedPlayer[key];

      if (targetPlayer[key] === undefined) {
        console.warn(
          `Property ${key} not found in target player:`,
          targetPlayer
        );
        div.classList.add("incorrect");
      } else if (guessedPlayer[key] === targetPlayer[key]) {
        div.classList.add("correct");
      } else if (
        key === "Media" &&
        Math.abs(parseInt(guessedPlayer[key]) - parseInt(targetPlayer[key])) <=
          2
      ) {
        div.classList.add("partial");
      } else if (
        key === "Altura (cm)" &&
        Math.abs(parseInt(guessedPlayer[key]) - parseInt(targetPlayer[key])) <=
          5
      ) {
        div.classList.add("partial");
      } else if (
        key === "Posición" &&
        guessedPlayer[key]
          .split(", ")
          .some((pos) => targetPlayer[key].split(", ").includes(pos))
      ) {
        div.classList.add("partial");
      } else if (
        key === "Trayectoria" &&
        guessedPlayer[key]
          .split(", ")
          .some((pos) => targetPlayer[key].split(", ").includes(pos))
      ) {
        div.classList.add("partial");
      } else {
        div.classList.add("incorrect");
      }
    }

    div.title = `${label}: ${guessedPlayer[key] || "N/A"}`;
    attemptDiv.appendChild(div);
  });

  const attemptsList = document.getElementById("attemptsList");
  if (attemptsList.firstChild) {
    attemptsList.insertBefore(attemptDiv, attemptsList.firstChild);
  } else {
    attemptsList.appendChild(attemptDiv);
  }
  input.value = "";

  if (guess.toLowerCase() === targetPlayer.Nombre.toLowerCase()) {
    endGame(true);
  } else if (attempts >= maxAttempts) {
    endGame(false);
  }
}

// Actualizar también la función loadPlayers para verificar los datos
async function loadPlayers() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    // Verificar que los datos son válidos
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return;
    }

    // Filtrar jugadores inválidos
    players = data.filter((player) => {
      if (!player || !player.Nombre) {
        console.warn("Invalid player data:", player);
        return false;
      }
      return true;
    });

    console.log("Loaded players:", players.length);

    if (players.length === 0) {
      console.error("No valid players found in data");
      return;
    }

    setupPlayersList();
    resetGame();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Modificar la función endGame para manejar correctamente las estadísticas
function endGame(won) {
  const gameOver = document.getElementById("gameOver");
  if (won) {
    if (gameOver) {
      gameOver.innerHTML = `¡Felicitaciones! Has adivinado al jugador: ${targetPlayer.Nombre}`;
      gameOver.style.color = "#4CAF50";
    }
    score.wins++;
    currentStreak++;
    bestStreak = Math.max(bestStreak, currentStreak);
    const shareButton = document.getElementById("shareButton");
    if (shareButton) shareButton.style.display = "block";
  } else {
    if (gameOver) {
      gameOver.innerHTML = `¡Game Over! El jugador era: ${targetPlayer.Nombre}`;
      gameOver.style.color = "#ff6b6b";
    }
    score.losses++;
    currentStreak = 0;
  }

  score.gamesPlayed++;

  const playerInput = document.getElementById("playerInput");
  if (playerInput) playerInput.disabled = true;

  const guessButton = document.getElementById("guessButton");
  if (guessButton) guessButton.disabled = true;

  const newGameButton = document.getElementById("newGameButton");
  if (newGameButton) newGameButton.style.display = "block";

  updateAttemptsCounter();
  updateStatistics();
  saveStats(); // Asegúrate de guardar las estadísticas actualizadas
}

// Funciones para persistir estadísticas
function saveStats() {
  const stats = {
    currentStreak,
    bestStreak,
    score: {
      wins: score.wins,
      losses: score.losses,
      gamesPlayed: score.gamesPlayed,
    },
    lastGameResult,
  };
  localStorage.setItem("footballGuessStats", JSON.stringify(stats));
}

// Función para cargar las estadísticas guardadas
function loadStats() {
  const savedStats = localStorage.getItem("footballGuessStats");
  if (savedStats) {
    try {
      const stats = JSON.parse(savedStats);
      currentStreak = stats.currentStreak || 0;
      bestStreak = stats.bestStreak || 0;
      score = stats.score || { wins: 0, losses: 0, gamesPlayed: 0 };
      updateStats();
    } catch (error) {
      console.error("Error al cargar las estadísticas:", error);
      resetStats();
    }
  } else {
    resetStats();
  }
}

// Función para reiniciar las estadísticas
function resetStats() {
  currentStreak = 0;
  bestStreak = 0;
  score = {
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
  };
  lastGameResult = null;
  updateStats();
  saveStats();
}

// Modificar la función loadPlayers para incluir la carga de estadísticas
async function loadPlayers() {
  try {
    const response = await fetch("data.json");
    players = await response.json();
    setupPlayersList();
    loadStats(); // Cargar estadísticas guardadas
    resetGame();
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
}

function shareResult() {
  showEndGameModal(score, attempts);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  loadPlayers();

  document
    .getElementById("playerInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkGuess();
      }
    });
});

// Función para configurar la lista de jugadores
function setupPlayersList() {
  const datalist = document.getElementById("playersList");
  datalist.innerHTML = "";
  players.forEach((player) => {
    const option = document.createElement("option");
    option.value = player.Nombre;
    datalist.appendChild(option);
  });
}

// Modifica la función loadPlayers para incluir el setup del datalist
async function loadPlayers() {
  try {
    const response = await fetch("data.json");
    players = await response.json();
    setupPlayersList(); // Añade esta línea
    resetGame();
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
  loadPlayers();
});

function showEndGameModal(score, attempts) {
    const modal = document.getElementById("endGameModal");
    const finalScore = document.getElementById("finalScore");

    // Crear el mensaje para compartir
    const shareMessage = `¡He completado el juego en ${attempts} intentos! ¿Puedes superarlo?!
Racha actual: ${currentStreak}
Mejor racha: ${bestStreak}
Partidas ganadas: ${score.wins}/${score.gamesPlayed}
¿Puedes superarme? 😏`;

    if (finalScore) {
        finalScore.textContent = shareMessage;
    }

    // Mostrar el modal
    if (modal) {
        modal.style.display = "flex";
    }

  // Configurar los botones de compartir
  document.getElementById("twitterShare").onclick = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareMessage
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  document.getElementById("facebookShare").onclick = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank");
  };

  document.getElementById("whatsappShare").onclick = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareMessage + " " + window.location.href
    )}`;
    window.open(url, "_blank");
  };

  document.getElementById("telegramShare").onclick = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank");
  };

  // Añade esto junto a los otros document.getElementById en la función showEndGameModal

  document.getElementById("redditShare").onclick = () => {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(
      window.location.href
    )}&title=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank");
  };

  document.getElementById("instagramShare").onclick = () => {
    // Instagram no tiene una API directa para compartir,
    // así que mostraremos un mensaje alternativo
    alert(
      "Para compartir en Instagram:\n\n1. Toma una captura de pantalla de tus resultados\n2. Abre Instagram\n3. Crea una nueva historia o post\n4. Sube la captura de pantalla\n\n¡El texto ha sido copiado al portapapeles!"
    );

    // Copiar el mensaje al portapapeles
    navigator.clipboard
      .writeText(shareMessage + "\n" + window.location.href)
      .then(() => {
        console.log("Texto copiado al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
      });
  };

    
    // 1. Cerrar con el botón de cerrar
    const closeButton = document.querySelector(".modal-buttons button:last-child");
    if (closeButton) {
        closeButton.onclick = () => {
            modal.style.display = "none";
        };
    }

    // 2. Cerrar con el botón de nueva partida
    const newGameButton = document.querySelector(".modal-buttons button:first-child");
    if (newGameButton) {
        newGameButton.onclick = () => {
            modal.style.display = "none";
            resetGame();
        };
    }

    // 3. Cerrar al hacer clic fuera del modal
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // 4. Añadir la tecla Escape para cerrar el modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });
}

// Función para mostrar las reglas
function showRules() {
    const modal = document.getElementById('rulesModal');
    modal.style.display = 'flex';
    
    // Cerrar con el botón
    document.getElementById('rulesClose').onclick = () => {
        modal.style.display = 'none';
    };
    
    // Cerrar al hacer clic fuera del modal
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
