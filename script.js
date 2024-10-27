// Variables globales
let players = [];
let targetPlayer;
let attempts = 0;
let maxAttempts = 10;
let hintsRemaining = 1;
let currentStreak = 0;
let bestStreak = 0;
let gameStarted = false;
let usedHints = new Set();
let score = {
    wins: 0,
    losses: 0,
    gamesPlayed: 0
};

// Función para inicializar el juego
function initializeGame() {
    // Configurar event listeners
    document.querySelector('.difficulty-buttons').addEventListener('click', handleDifficultySelection);
    document.getElementById('game-content').style.display = 'none';
    
    // Cargar estadísticas guardadas
    loadStats();
    
    // Configurar otros event listeners
    document.querySelector('button:contains("🔄 Nueva Partida")').addEventListener('click', resetGame);
    document.querySelector('button:contains("💡 Pista")').addEventListener('click', getHint);
    document.querySelector('button:contains("📤 Compartir")').addEventListener('click', shareResult);
    document.querySelector('button:contains("🌓 Cambiar Tema")').addEventListener('click', toggleDarkMode);
    
    // Configurar el input para adivinar
    const inputContainer = document.querySelector('.input-container');
    inputContainer.innerHTML = `
        <input type="text" id="playerInput" list="playersList" placeholder="Ingresa el nombre del jugador">
        <datalist id="playersList"></datalist>
        <button id="guessButton" onclick="checkGuess()">Adivinar</button>
    `;
    
    // Event listener para el input
    document.getElementById('playerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });
}

async function loadPlayers() {
    try {
        const response = await fetch('data.json');
        players = await response.json();
        resetGame();
    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
}
// Manejador de selección de dificultad
function handleDifficultySelection(event) {
    const button = event.target.closest('button');
    if (!button) return;
    
    const difficultyText = button.textContent;
    if (difficultyText.includes('Fácil')) {
        maxAttempts = 20;
        hintsRemaining = 3;
    } else if (difficultyText.includes('Normal')) {
        maxAttempts = 10;
        hintsRemaining = 1;
    } else if (difficultyText.includes('Difícil')) {
        maxAttempts = 5;
        hintsRemaining = 0;
    }
    
    document.getElementById('difficulty-selector').style.display = 'none';
    document.getElementById('game-content').style.display = 'block';
    gameStarted = true;
    resetGame();
}


function setDifficulty() {
    const difficulty = document.getElementById("difficultySelect").value;
    if (difficulty === "easy") {
        maxAttempts = Infinity;
        document.getElementById("hintButton").style.display = "block";
    } else if (difficulty === "normal") {
        maxAttempts = 10;
        document.getElementById("hintButton").style.display = "block";
    } else if (difficulty === "hard") {
        maxAttempts = 5;
        document.getElementById("hintButton").style.display = "none";
    }
    attempts = 0;
    updateAttemptsCounter();
    document.getElementById("maxAttemptsDisplay").textContent = 
        maxAttempts === Infinity ? "Infinitos" : maxAttempts;
    resetGame();
}

// Función para reiniciar el juego
function resetGame() {
    if (!gameStarted) return;
    
    targetPlayer = players[Math.floor(Math.random() * players.length)];
    attempts = 0;
    usedHints.clear();
    
    document.getElementById('attemptsContainer').innerHTML = `
        <div class="attempt">
            <div class="attribute">Nombre</div>
            <div class="attribute">Nacionalidad</div>
            <div class="attribute">Confederación</div>
            <div class="attribute">Media</div>
            <div class="attribute">Posición</div>
            <div class="attribute">Skills</div>
            <div class="attribute">Altura</div>
            <div class="attribute">Trayectoria</div>
        </div>
    `;
    
    updateGameState();
}

// Función para actualizar el estado del juego
function updateGameState() {
    document.getElementById('remainingAttempts').textContent = maxAttempts - attempts;
    document.getElementById('hint').textContent = '';
    document.querySelector('button:contains("💡 Pista")').style.display = hintsRemaining > 0 ? 'block' : 'none';
    document.querySelector('button:contains("📤 Compartir")').style.display = 'none';
    
    updateProgressBar();
    updateStats();
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
    const percentage = maxAttempts === Infinity ? 
        100 : ((maxAttempts - attempts) / maxAttempts) * 100;
    progressBar.style.width = percentage + "%";
}

function getHint() {
    const availableHints = [
        "Nacionalidad",
        "Media",
        "Posición",
        "Skills",
        "Confederación",
        "Trayectoria"
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

    const guessedPlayer = players.find(p => {
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
        { key: "Trayectoria", label: "Trayectoria" }
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
                console.warn(`Property ${key} not found in target player:`, targetPlayer);
                div.classList.add("incorrect");
            } else if (guessedPlayer[key] === targetPlayer[key]) {
                div.classList.add("correct");
            } else if (key === "Media" && 
                      Math.abs(parseInt(guessedPlayer[key]) - parseInt(targetPlayer[key])) <= 2) {
                div.classList.add("partial");
            } else if (key === "Altura (cm)" && 
                      Math.abs(parseInt(guessedPlayer[key]) - parseInt(targetPlayer[key])) <= 5) {
                div.classList.add("partial");
            } else if (key === "Posición" && 
                      guessedPlayer[key].split(", ").some(pos => 
                          targetPlayer[key].split(", ").includes(pos))) {
                div.classList.add("partial");
            } else {
                div.classList.add("incorrect");
            }
        }

        div.title = `${label}: ${guessedPlayer[key] || 'N/A'}`;
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

// Actualizar también la función loadPlayers para verificar los datos
async function loadPlayers() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Verificar que los datos son válidos
        if (!Array.isArray(data)) {
            console.error('Data is not an array:', data);
            return;
        }

        // Filtrar jugadores inválidos
        players = data.filter(player => {
            if (!player || !player.Nombre) {
                console.warn('Invalid player data:', player);
                return false;
            }
            return true;
        });

        console.log('Loaded players:', players.length);
        
        if (players.length === 0) {
            console.error('No valid players found in data');
            return;
        }

        setupPlayersList();
        resetGame();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Modificar la función endGame para manejar correctamente las estadísticas
function endGame(won) {
    const gameOver = document.getElementById("gameOver");
    if (won) {
        gameOver.innerHTML = `¡Felicitaciones! Has adivinado al jugador: ${targetPlayer.Nombre}`;
        gameOver.style.color = "#4CAF50";
        score.wins++;
        
        // Actualizar racha actual
        currentStreak++;
        
        // Actualizar mejor racha
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }
        
        lastGameResult = true;
    } else {
        gameOver.innerHTML = `¡Game Over! El jugador era: ${targetPlayer.Nombre}`;
        gameOver.style.color = "#ff6b6b";
        score.losses++;
        currentStreak = 0;
        lastGameResult = false;
    }
    
    score.gamesPlayed++;
    
    // Deshabilitar controles del juego
    document.getElementById("playerInput").disabled = true;
    document.getElementById("guessButton").disabled = true;
    document.getElementById("hintButton").disabled = true;
    
    // Mostrar botones post-juego
    document.getElementById("newGameButton").style.display = "block";
    document.getElementById("shareButton").style.display = "block";
    
    // Actualizar y guardar estadísticas
    updateStats();
    saveStats();
    updateAttemptsCounter();
}

// Funciones para persistir estadísticas
function saveStats() {
    const stats = {
        currentStreak,
        bestStreak,
        score: {
            wins: score.wins,
            losses: score.losses,
            gamesPlayed: score.gamesPlayed
        },
        lastGameResult
    };
    localStorage.setItem('footballGuessStats', JSON.stringify(stats));
}

// Función para cargar las estadísticas guardadas
function loadStats() {
    const savedStats = localStorage.getItem('footballGuessStats');
    if (savedStats) {
        try {
            const stats = JSON.parse(savedStats);
            currentStreak = stats.currentStreak || 0;
            bestStreak = stats.bestStreak || 0;
            score = stats.score || { wins: 0, losses: 0, gamesPlayed: 0 };
            lastGameResult = stats.lastGameResult;
            updateStats();
        } catch (error) {
            console.error('Error al cargar las estadísticas:', error);
            // Reiniciar estadísticas si hay error
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
        gamesPlayed: 0
    };
    lastGameResult = null;
    updateStats();
    saveStats();
}


// Modificar la función loadPlayers para incluir la carga de estadísticas
async function loadPlayers() {
    try {
        const response = await fetch('data.json');
        players = await response.json();
        setupPlayersList();
        loadStats(); // Cargar estadísticas guardadas
        resetGame();
    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
}

function shareResult() {
    const resultMessage = `¡He adivinado a la leyenda del fútbol: ${targetPlayer.Nombre}!
Racha actual: ${currentStreak}
Mejor racha: ${bestStreak}
Partidas ganadas: ${score.wins}/${score.gamesPlayed}
¿Puedes superarme?`;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(resultMessage);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, "_blank");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

document.addEventListener('DOMContentLoaded', () => {
    loadPlayers();
    
    document.getElementById("playerInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            checkGuess();
        }
    });
});

// Función para configurar la lista de jugadores
function setupPlayersList() {
    const datalist = document.getElementById('playersList');
    datalist.innerHTML = '';
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.Nombre;
        datalist.appendChild(option);
    });
}

// Modifica la función loadPlayers para incluir el setup del datalist
async function loadPlayers() {
    try {
        const response = await fetch('data.json');
        players = await response.json();
        setupPlayersList(); // Añade esta línea
        resetGame();
    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    loadPlayers();
});
