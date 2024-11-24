let playerStats = {}; // Declarar playerStats fuera del evento del formulario

document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = parseInt(document.getElementById('edad').value);
    const posicion = document.getElementById('posicion').value;
    const club = document.getElementById('club').value;
    const pais = document.getElementById('pais').value;
    const mediaBase = parseInt(document.getElementById('media').value);

    // Inicializar estadísticas del jugador
    playerStats = {
        nombre: nombre,
        apellido: apellido,
        startYear: new Date().getFullYear(), // Guardar el año actual como año de inicio
        age: edad,
        club: club,
        media: mediaBase,
        marketValue: generateMarketValue(), // Valor de mercado real
        displayedMarketValue: roundMarketValue(generateMarketValue()), // Valor de mercado redondeado
        matches: 0, // Partidos del año actual
        goals: 0, // Goles del año actual
        assists: 0, // Asistencias del año actual
        totalMatches: 0, // Total acumulado de partidos
        totalGoals: 0, // Total acumulado de goles
        totalAssists: 0, // Total acumulado de asistencias
        clubsPlayed: [], // Lista de clubes jugados
        bestMedia: mediaBase, // Mejor media
        highestMarketValue: 0, // Valor de mercado más alto
        yearsPlayed: 0 // Inicializar años jugados
    };

    // Agregar el club a la lista de clubes jugados
    if (!playerStats.clubsPlayed.includes(club)) {
        playerStats.clubsPlayed.push(club);
    }

    // Mostrar información del jugador
    document.getElementById('playerInfo').style.display = 'block';
    updatePlayerTable(playerStats);
    updateConsolidatedRow(playerStats);
});

document.getElementById('nextYearBtn').addEventListener('click', function() {
    avanzarAlSiguienteAno();
});

function avanzarAlSiguienteAno() {
    incrementarEdadYAnosJugados();
    generarEstadisticasAnuales();
    actualizarValoresDeMercado();
    actualizarMedia();
    actualizarTablaYFilaConsolidada();
}

function incrementarEdadYAnosJugados() {
    playerStats.yearsPlayed++; // Incrementar años jugados
    playerStats.age++; // Incrementar edad
}

function generarEstadisticasAnuales() {
    playerStats.matches = generarPartidosAnuales();
    playerStats.goals = generarGolesAnuales();
    playerStats.assists = generarAsistenciasAnuales();

    // Actualizar los totales acumulados
    playerStats.totalMatches += playerStats.matches;
    playerStats.totalGoals += playerStats.goals;
    playerStats.totalAssists += playerStats.assists;
}

function generarPartidosAnuales() {
    return Math.floor(Math.random() * 30) + 10; // Partidos aleatorios
}

function generarGolesAnuales() {
    return Math.floor(Math.random() * 20); // Goles aleatorios
}

function generarAsistenciasAnuales() {
    return Math.floor(Math.random() * 15); // Asistencias aleatorias
}

function actualizarValoresDeMercado() {
    playerStats.marketValue = generateMarketValue(); // Valor de mercado real
    playerStats.displayedMarketValue = roundMarketValue(playerStats.marketValue); // Valor de mercado redondeado

    // Inicializar highestMarketValue si es la primera temporada
    if (playerStats.yearsPlayed === 1) {
        playerStats.highestMarketValue = roundMarketValue(playerStats.marketValue); // Establecer el primer valor como el más alto y redondeado
    } else {
        // Actualizar mejor media y valor de mercado más alto
        playerStats.bestMedia = Math.max(playerStats.bestMedia, playerStats.media);
        playerStats.highestMarketValue = roundMarketValue(Math.max(playerStats.highestMarketValue, playerStats.marketValue)); // Redondear el valor más alto
    }
}

function actualizarMedia() {
    playerStats.media = Math.max(0, playerStats.media + Math.floor(Math.random() * 5) - 2); // Cambiar media aleatoriamente
}

function actualizarTablaYFilaConsolidada() {
    updatePlayerTable(playerStats);
    updateConsolidatedRow(playerStats);
}

function rendimiento() {
    // Definir los posibles valores y sus probabilidades asociadas
    const valores = [3, 4, 5, 2, 1, 6];
    const probabilidades = [0.25, 0.25, 0.21875, 0.21875, 0.03125, 0.03125];

    // Seleccionar un valor basado en las probabilidades definidas
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilidades.length; i++) {
        cumulativeProbability += probabilidades[i];
        if (randomValue < cumulativeProbability) {
            return valores[i];
        }
    }
}

function calcularEstrellasPrecio(precio) {
    // Precio en millones, convierte a estrellas
    if (precio < 0.2) {
        return 1;  // Menos de 100K
    } else if (precio < 1) {
        return 2;  // 250K a 1M
    } else if (precio < 10) {
        return 3;  // 1M a 10M
    } else if (precio < 30) {
        return 4;  // 10M a 30M
    } else if (precio < 60) {
        return 5;  // 30M a 60M
    } else {
        return 6;  // Más de 60M
    }
}

function calcularEstrellasRendimiento(rendimiento) {
    // Mapea el rendimiento a estrellas
    return rendimiento; // Ya que el rendimiento es un valor entre 1 y 6
}

function calcularEstrellasEdad(edad) {
    // Edad convierte a estrellas
    if (edad > 39) {
        return 1;
    } else if (edad >= 35) {
        return 2;
    } else if (edad >= 30) {
        return 3;
    } else if (edad >= 24) {
        return 6;
    } else if (edad >= 20) {
        return 5;
    } else {
        return 4;
    }
}

function calcularMedia(precio, rendimiento, edad) {
    // Calcula la media de las estrellas de las tres variantes
    const estrellasPrecio = calcularEstrellasPrecio(precio);
    const estrellasRendimiento = calcularEstrellasRendimiento(rendimiento);
    const estrellasEdad = calcularEstrellasEdad(edad);
    
    // Calcular la media de las estrellas
    let mediaEstrellas = (estrellasPrecio + estrellasRendimiento + estrellasEdad) / 3;
    
    // Sumar 1 estrella al resultado final y asegurarse de que esté en el rango de 1 a 6
    mediaEstrellas = Math.min(6, mediaEstrellas + 1);
    
    // Redondear a una cifra decimal
    return Math.round(mediaEstrellas * 10) / 10; // Redondeo a una cifra decimal
}

// Ejemplo de uso
function generateMarketValue() {
    // Generar un valor de mercado aleatorio entre 500,000 y 1,500,000
    const basePrice = Math.floor(Math.random() * 1000000) + 500000; // Valor base
    const rendimientoValue = rendimiento(); // Obtener rendimiento
    const edadValue = playerStats.age; // Usar la edad del jugador

    // Calcular la media utilizando el precio, rendimiento y edad
    const mediaEstrellas = calcularMedia(basePrice / 1000000, rendimientoValue, edadValue);
    
    // Calcular el valor de mercado final basado en la media
    return basePrice * mediaEstrellas; // Ajustar el valor de mercado basado en la media de estrellas
}
function roundMarketValue(value) {
    // Redondear el valor al múltiplo más cercano de 100,000
    return Math.round(value / 100000) * 100000;
}

function updatePlayerTable(stats) {
    const playerStatsTable = document.getElementById('playerStats');
    const newRow = document.createElement('tr');
    const currentYear = stats.startYear + stats.yearsPlayed; // Calcular el año actual

    newRow.innerHTML = `
        <td>${currentYear}</td>
        <td>${stats.age}</td>
        <td>${stats.club}</td>
        <td>${stats.media}</td>
        <td>${stats.displayedMarketValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td> <!-- Valor redondeado -->
        <td>${stats.matches}</td> <!-- Partidos del año actual -->
        <td>${stats.goals}</td> <!-- Goles del año actual -->
        <td>${stats.assists}</td> <!-- Asistencias del año actual -->
    `;
    playerStatsTable.appendChild(newRow);
}

function updateConsolidatedRow(stats) {
    const consolidatedRow = document.getElementById('consolidatedStats');
    consolidatedRow.innerHTML = `
        <td>${stats.nombre} ${stats.apellido}</td>
        <td>${stats.clubsPlayed.join(', ')}</td>
        <td>${stats.bestMedia}</td>
        <td>${stats.highestMarketValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
        <td>${stats.totalMatches}</td>
        <td>${stats.totalGoals}</td>
        <td>${stats.totalAssists}</td>
    `;
} 