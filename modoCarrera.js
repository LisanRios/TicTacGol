// Configuración de posiciones
const POSICION_CONFIG = {
    'ST': {
        valorMultiplicador: 0.5,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 15, max: 35 },
        asistenciasBase: { min: 3, max: 8 }
    },
    'LW': {
        valorMultiplicador: 0.3,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 8, max: 20 },
        asistenciasBase: { min: 8, max: 15 }
    },
    'RW': {
        valorMultiplicador: 0.3,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 8, max: 20 },
        asistenciasBase: { min: 8, max: 15 }
    },
    'CAM': {
        valorMultiplicador: 0.4,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 6, max: 15 },
        asistenciasBase: { min: 10, max: 20 }
    },
    'CM': {
        valorMultiplicador: 0.2,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 3, max: 8 },
        asistenciasBase: { min: 5, max: 12 }
    },
    'CDM': {
        valorMultiplicador: 0.1,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 1, max: 4 },
        asistenciasBase: { min: 2, max: 6 }
    },
    'CB': {
        valorMultiplicador: 0.1,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 1, max: 5 },
        asistenciasBase: { min: 1, max: 4 }
    },
    'LB': {
        valorMultiplicador: 0.2,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 1, max: 3 },
        asistenciasBase: { min: 5, max: 10 }
    },
    'RB': {
        valorMultiplicador: 0.2,
        partidosBase: { min: 25, max: 38 },
        golesBase: { min: 1, max: 3 },
        asistenciasBase: { min: 5, max: 10 }
    },
    'GK': {
        valorMultiplicador: 0.4,
        partidosBase: { min: 34, max: 38 },
        golesBase: { min: 0, max: 1 },
        asistenciasBase: { min: 0, max: 1 }
    }
};

// Configuración de rendimiento por posición
const RENDIMIENTO_CONFIG = {
    'ST': {
        // Los delanteros son más volátiles en su rendimiento
        distribucion: [
            { valor: 6, probabilidad: 0.10 }, // Excepcional
            { valor: 5, probabilidad: 0.20 }, // Muy bueno
            { valor: 4, probabilidad: 0.25 }, // Bueno
            { valor: 3, probabilidad: 0.25 }, // Regular
            { valor: 2, probabilidad: 0.15 }, // Malo
            { valor: 1, probabilidad: 0.05 }  // Muy malo
        ]
    },
    'LW': {
        distribucion: [
            { valor: 6, probabilidad: 0.08 },
            { valor: 5, probabilidad: 0.22 },
            { valor: 4, probabilidad: 0.30 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'RW': {
        distribucion: [
            { valor: 6, probabilidad: 0.08 },
            { valor: 5, probabilidad: 0.22 },
            { valor: 4, probabilidad: 0.30 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'CAM': {
        distribucion: [
            { valor: 6, probabilidad: 0.08 },
            { valor: 5, probabilidad: 0.22 },
            { valor: 4, probabilidad: 0.30 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'CM': {
        // Los centrocampistas tienden a ser más consistentes
        distribucion: [
            { valor: 6, probabilidad: 0.05 },
            { valor: 5, probabilidad: 0.20 },
            { valor: 4, probabilidad: 0.35 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'CDM': {
        distribucion: [
            { valor: 6, probabilidad: 0.05 },
            { valor: 5, probabilidad: 0.20 },
            { valor: 4, probabilidad: 0.35 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'CB': {
        // Los defensores centrales son muy consistentes
        distribucion: [
            { valor: 6, probabilidad: 0.05 },
            { valor: 5, probabilidad: 0.15 },
            { valor: 4, probabilidad: 0.40 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'LB': {
        distribucion: [
            { valor: 6, probabilidad: 0.05 },
            { valor: 5, probabilidad: 0.15 },
            { valor: 4, probabilidad: 0.35 },
            { valor: 3, probabilidad: 0.30 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'RB': {
        distribucion: [
            { valor: 6, probabilidad: 0.05 },
            { valor: 5, probabilidad: 0.15 },
            { valor: 4, probabilidad: 0.35 },
            { valor: 3, probabilidad: 0.30 },
            { valor: 2, probabilidad: 0.10 },
            { valor: 1, probabilidad: 0.05 }
        ]
    },
    'GK': {
        // Los porteros son los más consistentes
        distribucion: [
            { valor: 6, probabilidad: 0.05 },
            { valor: 5, probabilidad: 0.15 },
            { valor: 4, probabilidad: 0.45 },
            { valor: 3, probabilidad: 0.25 },
            { valor: 2, probabilidad: 0.07 },
            { valor: 1, probabilidad: 0.03 }
        ]
    }
};


let playerStats = {}; // Declarar playerStats fuera del evento del formulario

// Actualizar el evento del formulario para incluir la posición
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener datos del formulario (agregar posición)
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = parseInt(document.getElementById('edad').value);
    const posicion = document.getElementById('posicion').value;
    const club = document.getElementById('club').value;
    const pais = document.getElementById('pais').value;
    const mediaBase = parseInt(document.getElementById('media').value);

    // Inicializar estadísticas del jugador (agregar posición)
    playerStats = {
        nombre: nombre,
        apellido: apellido,
        startYear: new Date().getFullYear(),
        age: edad,
        posicion: posicion, // Agregar posición
        club: club,
        media: mediaBase,
        marketValue: generateMarketValue(),
        displayedMarketValue: roundMarketValue(generateMarketValue()),
        matches: 0,
        goals: 0,
        assists: 0,
        totalMatches: 0,
        totalGoals: 0,
        totalAssists: 0,
        clubsPlayed: [],
        bestMedia: mediaBase,
        highestMarketValue: 0,
        yearsPlayed: 0
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
    const config = POSICION_CONFIG[playerStats.posicion];
    return Math.floor(Math.random() * (config.partidosBase.max - config.partidosBase.min + 1)) + config.partidosBase.min;
}

function generarGolesAnuales() {
    const config = POSICION_CONFIG[playerStats.posicion];
    return Math.floor(Math.random() * (config.golesBase.max - config.golesBase.min + 1)) + config.golesBase.min;
}

function generarAsistenciasAnuales() {
    const config = POSICION_CONFIG[playerStats.posicion];
    return Math.floor(Math.random() * (config.asistenciasBase.max - config.asistenciasBase.min + 1)) + config.asistenciasBase.min;
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
    const edad = playerStats.age;
    let probabilidadSubida = 0;
    let maximoIncremento = 0;
    
    // Definir probabilidades y máximos incrementos según la edad
    if (edad <= 21) {
        // Jugadores muy jóvenes: alta probabilidad de mejora y mayor incremento
        probabilidadSubida = 0.8;
        maximoIncremento = 4;
    } else if (edad <= 27) {
        // Jugadores en desarrollo: probabilidad media y incremento moderado
        probabilidadSubida = 0.6;
        maximoIncremento = 2;
    } else if (edad <= 34) {
        // Jugadores maduros: baja probabilidad y pequeño incremento
        probabilidadSubida = 0.3;
        maximoIncremento = 1;
    } else {
        // Jugadores veteranos: solo bajan
        const decrementoBase = Math.floor(Math.random() * 2) + 1; // Bajada de 1-2 puntos
        playerStats.media = Math.max(50, playerStats.media - decrementoBase); // No bajar de 50
        return;
    }

    // Determinar si hay mejora basado en la probabilidad
    if (Math.random() < probabilidadSubida) {
        const incremento = Math.floor(Math.random() * maximoIncremento) + 1;
        playerStats.media = Math.min(99, playerStats.media + incremento); // No superar 99
    }
}

function actualizarTablaYFilaConsolidada() {
    updatePlayerTable(playerStats);
    updateConsolidatedRow(playerStats);
}

function generateMarketValue() {
    const edad = playerStats.age;
    const media = playerStats.media;
    const config = POSICION_CONFIG[playerStats.posicion];

    // Verificar si la posición existe en POSICION_CONFIG
    if (!config) {
        console.error(`Posición no válida en POSICION_CONFIG: ${playerStats.posicion}`);
        return Math.floor(Math.random() * 99500) + 500; // Valor por defecto o manejar el error de otra manera
    }

    let valorBase = Math.pow(media, 2) * 10000;

    // Multiplicador por edad
    let multiplicadorEdad = 1;
    if (edad <= 18) {
        multiplicadorEdad = 0.5 - (edad - 16) * 0.05;
    } else if (edad <= 23) {
        multiplicadorEdad = 0.5 - (edad - 20) * 0.05;
    } else if (edad <= 28) {
        multiplicadorEdad = 1;
    } else {
        multiplicadorEdad = Math.max(0.2, 1 - (edad - 28) * 0.1);
    }

    // Multiplicador por rendimiento
    const rendimientoValue = rendimiento();
    const multiplicadorRendimiento = rendimientoValue / 3;

    // Multiplicador por posición
    const multiplicadorPosicion = config.valorMultiplicador;

    // Calcular valor final
    let valorFinal = valorBase * multiplicadorEdad * multiplicadorRendimiento * multiplicadorPosicion;

    // Ajustes finales para valores más realistas
    if (media >= 90) {
        valorFinal *= 2;
    }

    // Establecer límites realistas
    valorFinal = Math.max(100000, valorFinal);
    valorFinal = Math.min(300000000, valorFinal);

    return valorFinal;
}

function rendimiento() {
    const posicion = playerStats.posicion;
    const media = playerStats.media;
    const distribucion = RENDIMIENTO_CONFIG[posicion].distribucion;
    
    // Ajuste por media del jugador
    let ajustePorMedia = 1;
    if (media >= 85) {
        ajustePorMedia = 1.2;
    } else if (media <= 65) {
        ajustePorMedia = 0.8;
    }

    // Ajuste por edad
    let ajustePorEdad = 1;
    let probabilidadBajar = 0;

    if (playerStats.age < 21) {
        // Jugadores muy jóvenes tienen una probabilidad de bajar
        probabilidadBajar = 0.2; // 20% de probabilidad de bajar
    } else if (playerStats.age >= 21 && playerStats.age <= 27) {
        // Jugadores en desarrollo tienen una probabilidad moderada
        probabilidadBajar = 0.3; // 30% de probabilidad de bajar
    } else if (playerStats.age >= 28 && playerStats.age <= 34) {
        // Jugadores maduros tienen una probabilidad baja
        probabilidadBajar = 0.4; // 40% de probabilidad de bajar
    } else {
        // Jugadores veteranos tienen una probabilidad alta de bajar
        probabilidadBajar = 0.5; // 50% de probabilidad de bajar
    }

    // Generar número aleatorio para determinar si el rendimiento baja
    if (Math.random() < probabilidadBajar) {
        // Disminuir el rendimiento en un valor aleatorio
        return Math.max(1, Math.floor(Math.random() * 3)); // Bajar a un rendimiento entre 1 y 2
    }

    // Generar número aleatorio para el rendimiento normal
    const random = Math.random();
    let acumulado = 0;

    // Ajustar probabilidades con los factores
    for (let i = 0; i < distribucion.length; i++) {
        let probAjustada = distribucion[i].probabilidad * ajustePorMedia * ajustePorEdad;
        acumulado += probAjustada;
        
        if (random <= acumulado) {
            return distribucion[i].valor;
        }
    }

    // Por defecto, retornar el valor más bajo si algo sale mal
    return 1;
}

// Función auxiliar para verificar que las probabilidades sumen 1
function verificarProbabilidades() {
    for (const posicion in RENDIMIENTO_CONFIG) {
        const suma = RENDIMIENTO_CONFIG[posicion].distribucion
            .reduce((acc, item) => acc + item.probabilidad, 0);
        console.log(`Suma de probabilidades para ${posicion}: ${suma}`);
    }
}

function roundMarketValue(value) {
    // Función mejorada para redondear valores de manera más realista
    if (value < 1000000) {
        // Menos de 1M: redondear a decenas de miles
        return Math.round(value / 10000) * 10000;
    } else if (value < 10000000) {
        // Entre 1M y 10M: redondear a cientos de miles
        return Math.round(value / 100000) * 100000;
    } else {
        // Más de 10M: redondear a millones
        return Math.round(value / 1000000) * 1000000;
    }
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