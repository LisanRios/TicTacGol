const players = [
  {
    name: "Messi",
    country: "Argentina",
    confederation: "Conmebol",
    team: "Inter Miami",
    league: "MLS",
    position: "Delantero",
    age: 36,
    flag: "🇦🇷",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a0/Inter_Miami_CF_logo.svg",
  },
  {
    name: "Mbappé",
    country: "Francia",
    confederation: "UEFA",
    team: "PSG",
    league: "Ligue 1",
    position: "Delantero",
    age: 25,
    flag: "🇫🇷",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/61/Paris_Saint-Germain_F.C..svg",
  },
  {
    name: "Bellingham",
    country: "Inglaterra",
    confederation: "UEFA",
    team: "Real Madrid",
    league: "La Liga",
    position: "Centrocampista",
    age: 20,
    flag: "🇬🇧",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Real_Madrid_CF.svg",
  },
  {
    name: "Haaland",
    country: "Noruega",
    confederation: "UEFA",
    team: "Manchester City",
    league: "Premier League",
    position: "Delantero",
    age: 23,
    flag: "🇳🇴",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Manchester_City_FC_badge.svg",
  },
  {
    name: "Pedri",
    country: "España",
    confederation: "UEFA",
    team: "Barcelona",
    league: "La Liga",
    position: "Centrocampista",
    age: 21,
    flag: "🇪🇸",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  },
  {
    name: "Vinicius",
    country: "Brasil",
    confederation: "Conmebol",
    team: "Real Madrid",
    league: "La Liga",
    position: "Delantero",
    age: 23,
    flag: "🇧🇷",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Real_Madrid_CF.svg",
  },
  {
    name: "De Bruyne",
    country: "Bélgica",
    confederation: "UEFA",
    team: "Manchester City",
    league: "Premier League",
    position: "Centrocampista",
    age: 32,
    flag: "🇧🇪",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Manchester_City_FC_badge.svg",
  },
  {
    name: "Salah",
    country: "Egipto",
    confederation: "CAF",
    team: "Liverpool",
    league: "Premier League",
    position: "Delantero",
    age: 31,
    flag: "🇪🇬",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
  {
    name: "Modric",
    country: "Croacia",
    confederation: "UEFA",
    team: "Real Madrid",
    league: "La Liga",
    position: "Centrocampista",
    age: 38,
    flag: "🇭🇷",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Real_Madrid_CF.svg",
  },
  {
    name: "Kane",
    country: "Inglaterra",
    confederation: "UEFA",
    team: "Bayern Munich",
    league: "Bundesliga",
    position: "Delantero",
    age: 30,
    flag: "🇬🇧",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/FC_Bayern_Munich_logo.svg",
  },
  {
    name: "Griezmann",
    country: "Francia",
    confederation: "UEFA",
    team: "Atlético Madrid",
    league: "La Liga",
    position: "Delantero",
    age: 32,
    flag: "🇫🇷",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Atletico_Madrid_logo.svg",
  },
  {
    name: "Rodri",
    country: "España",
    confederation: "UEFA",
    team: "Manchester City",
    league: "Premier League",
    position: "Centrocampista",
    age: 27,
    flag: "🇪🇸",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Manchester_City_FC_badge.svg",
  },
  {
    name: "Valverde",
    country: "Uruguay",
    confederation: "Conmebol",
    team: "Real Madrid",
    league: "La Liga",
    position: "Centrocampista",
    age: 25,
    flag: "🇺🇾",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/Real_Madrid_CF.svg",
  },
  {
    name: "Saka",
    country: "Inglaterra",
    confederation: "UEFA",
    team: "Arsenal",
    league: "Premier League",
    position: "Delantero",
    age: 22,
    flag: "🇬🇧",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  },
  {
    name: "Gavi",
    country: "España",
    confederation: "UEFA",
    team: "Barcelona",
    league: "La Liga",
    position: "Centrocampista",
    age: 19,
    flag: "🇪🇸",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  },
  {
    name: "Martinez",
    country: "Argentina",
    confederation: "Conmebol",
    team: "Inter",
    league: "Serie A",
    position: "Delantero",
    age: 26,
    flag: "🇦🇷",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0f/FC_Internazionale_Milano_logo.svg",
  },
  {
    name: "Rice",
    country: "Inglaterra",
    confederation: "UEFA",
    team: "Arsenal",
    league: "Premier League",
    position: "Centrocampista",
    age: 25,
    flag: "🇬🇧",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  },
  {
    name: "Kvaratskhelia",
    country: "Georgia",
    confederation: "UEFA",
    team: "Napoli",
    league: "Serie A",
    position: "Delantero",
    age: 23,
    flag: "🇬🇪",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0f/FC_Napoli_logo.svg",
  },
  {
    name: "Wirtz",
    country: "Alemania",
    confederation: "UEFA",
    team: "Leverkusen",
    league: "Bundesliga",
    position: "Centrocampista",
    age: 20,
    flag: "🇩🇪",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3f/Bayer_04_Leverkusen_logo.svg",
  },
  {
    name: "Barella",
    country: "Italia",
    confederation: "UEFA",
    team: "Inter",
    league: "Serie A",
    position: "Centrocampista",
    age: 27,
    flag: "🇮🇹",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0f/FC_Internazionale_Milano_logo.svg",
  },
];

let targetPlayer;
let attempts = 0;
let maxAttempts = 10;
let usedHints = new Set();
let score = { wins: 0, losses: 0, gamesPlayed: 0 };

function setDifficulty() {
  const difficulty = document.getElementById("difficultySelect").value;
  if (difficulty === "easy") {
    maxAttempts = Infinity; // Intentos infinitos
    document.getElementById("hintButton").style.display = "block"; // Pistas infinitas
  } else if (difficulty === "normal") {
    maxAttempts = 10; // 10 intentos
    document.getElementById("hintButton").style.display = "block"; // 1 pista
  } else if (difficulty === "hard") {
    maxAttempts = 5; // 5 intentos
    document.getElementById("hintButton").style.display = "none"; // Sin pistas
  }
  attempts = 0; // Reiniciar intentos
  updateAttemptsCounter();
  document.getElementById("maxAttemptsDisplay").textContent =
    maxAttempts === Infinity ? "Infinitos" : maxAttempts;
  resetGame();
}

function resetGame() {
  targetPlayer = players[Math.floor(Math.random() * players.length)];
  usedHints.clear();
  document.getElementById("attemptsContainer").innerHTML = `
    <div class="attempt">
        <div class="attribute">Nombre</div>
        <div class="attribute">País</div>
        <div class="attribute">Confederación</div>
        <div class="attribute">Equipo</div>
        <div class="attribute">Liga</div>
        <div class="attribute">Posición</div>
        <div class="attribute">Edad</div>
        <div class="attribute">Bandera</div>
        <div class="attribute">Logo</div>
    </div>
`;
  document.getElementById("gameOver").innerHTML = "";
  document.getElementById("playerInput").disabled = false;
  document.getElementById("guessButton").disabled = false;
  document.getElementById("shareButton").style.display = "none";
  document.getElementById("newGameButton").style.display = "none";
  document.getElementById("hint").textContent = "";
  updateProgressBar();
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
  const availableHints = [
    "country",
    "team",
    "league",
    "position",
    "age",
    "confederation",
  ].filter((hint) => !usedHints.has(hint));

  if (availableHints.length === 0) {
    document.getElementById("hint").textContent =
      "¡No hay más pistas disponibles!";
    return;
  }

  const randomHint =
    availableHints[Math.floor(Math.random() * availableHints.length)];
  usedHints.add(randomHint);

  const hintText = {
    country: "País",
    team: "Equipo",
    league: "Liga",
    position: "Posición",
    age: "Edad",
    confederation: "Confederación",
  };

  document.getElementById(
    "hint"
  ).textContent = `${hintText[randomHint]}: ${targetPlayer[randomHint]}`;

  if (availableHints.length === 1) {
    document.getElementById("hintButton").disabled = true;
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

  const guessedPlayer = players.find(
    (p) => p.name.toLowerCase() === guess.toLowerCase()
  );

  if (!guessedPlayer) {
    showError();
    return;
  }

  attempts++;
  updateAttemptsCounter();

  const attemptDiv = document.createElement("div");
  attemptDiv.className = "attempt";

  const attributes = [
    "name",
    "country",
    "confederation",
    "team",
    "league",
    "position",
    "age",
  ];
  attributes.forEach((attr) => {
    const div = document.createElement("div");
    div.className = "attribute";
    div.textContent = guessedPlayer[attr];

    if (guessedPlayer[attr] === targetPlayer[attr]) {
      div.classList.add("correct");
    } else if (
      attr === "age" &&
      Math.abs(guessedPlayer[attr] - targetPlayer[attr]) <= 2
    ) {
      div.classList.add("partial");
    } else {
      div.classList.add("incorrect");
    }

    attemptDiv.appendChild(div);
  });

  // Añadir iconos de bandera y escudo
  const flagDiv = document.createElement("div");
  flagDiv.className = "attribute";
  flagDiv.innerHTML = guessedPlayer.flag; // Mostrar bandera
  attemptDiv.appendChild(flagDiv);

  const logoDiv = document.createElement("div");
  logoDiv.className = "attribute";
  logoDiv.innerHTML = `<img src="${guessedPlayer.logo}" class="team-logo" alt="${guessedPlayer.team} logo">`; // Mostrar escudo
  attemptDiv.appendChild(logoDiv);

  document.getElementById("attemptsContainer").appendChild(attemptDiv);
  input.value = "";

  if (guess.toLowerCase() === targetPlayer.name.toLowerCase()) {
    endGame(true);
  } else if (attempts >= maxAttempts) {
    endGame(false);
  } else if (attempts >= 5 && maxAttempts !== Infinity) {
    document.getElementById("hintButton").style.display = "block";
  }
}

function endGame(won) {
  const gameOver = document.getElementById("gameOver");
  if (won) {
    gameOver.innerHTML = `¡Felicitaciones! Has adivinado al jugador: ${targetPlayer.name}`;
    gameOver.style.color = "#4CAF50";
    score.wins++;
    document.getElementById("shareButton").style.display = "block"; // Mostrar botón de compartir
  } else {
    gameOver.innerHTML = `¡Game Over! El jugador era: ${targetPlayer.name}`;
    gameOver.style.color = "#ff6b6b";
    score.losses++;
  }
  score.gamesPlayed++;
  document.getElementById("playerInput").disabled = true;
  document.getElementById("guessButton").disabled = true;
  document.getElementById("newGameButton").style.display = "block"; // Mostrar botón de nueva partida
  updateAttemptsCounter();
}

function shareResult() {
  const resultMessage = `He adivinado al futbolista: ${targetPlayer.name}! ¿Puedes hacerlo tú?`;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(resultMessage);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  window.open(shareUrl, "_blank");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document
  .getElementById("playerInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkGuess();
    }
  });

// Inicializar el juego
resetGame();
