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


// Variables globales para manejar el estado del jugador
let playerStats = {
    nombre: '',
    apellido: '',
    posicion: '',
    añoActual: new Date().getFullYear(),
    edad: 0,
    club: '',
    mediaInicial: 0,
    historialRendimientoAnual: [],
    valorMercadoInicial: 0
};

// Función para inicializar las estadísticas del jugador
function inicializarJugador(nombre, apellido, posicion, edad, club, media) {
    playerStats = {
        nombre: nombre,
        apellido: apellido,
        posicion: posicion,
        añoActual: new Date().getFullYear(),
        edad: edad,
        club: club,
        mediaInicial: media,
        media: media,
        historialRendimientoAnual: [],
        valorMercadoInicial: 0,
        clubesJugados: [club],
        totalPartidos: 0,
        totalGoles: 0,
        totalAsistencias: 0,
        mejorMedia: media,
        mejorValorMercado: 0
    };
}

// Generar rendimiento anual
function generarRendimientoAnual() {
    return Math.floor(Math.random() * 6) + 1; // 1-6
}

// Calcular rendimiento de carrera
function calcularRendimientoCarrera() {
    const historial = playerStats.historialRendimientoAnual;
    if (historial.length < 2) return 3; // Por defecto regular si no hay suficiente historial

    const ultimosDosRendimientos = historial.slice(-2);
    const promedioRedondeado = Math.ceil(
        ultimosDosRendimientos.reduce((a, b) => a + b, 0) / 2
    );

    return promedioRedondeado;
}

// Generar partidos según rendimiento anual
function generarPartidos(rendimientoAnual) {
    const config = POSICION_CONFIG[playerStats.posicion];
    const baseMin = config.partidosBase.min;
    const baseMax = config.partidosBase.max;

    switch (rendimientoAnual) {
        case 6: return Math.floor(Math.random() * (baseMax - baseMin + 10)) + baseMax; // Excepcional: más partidos
        case 5: return Math.floor(Math.random() * (baseMax - 5)) + baseMin + 5; // Muy bueno: sobre la media
        case 4: return Math.floor(Math.random() * (baseMax - baseMin)) + baseMin; // Bueno: en la media
        case 3: return Math.floor(Math.random() * (baseMin + 5)); // Regular: menos partidos
        case 2: return Math.floor(Math.random() * 10); // Malo: pocos partidos
        case 1: return Math.floor(Math.random() * 5); // Muy malo: casi sin jugar
    }
}

// Generar goles según rendimiento anual
function generarGoles(rendimientoAnual) {
    const config = POSICION_CONFIG[playerStats.posicion];
    const baseMin = config.golesBase.min;
    const baseMax = config.golesBase.max;

    switch (rendimientoAnual) {
        case 6: return Math.floor(Math.random() * (baseMax + 10)) + baseMax; // Excepcional: muchos goles
        case 5: return Math.floor(Math.random() * (baseMax - 5)) + baseMax - 5; // Muy bueno: cerca del máximo
        case 4: return Math.floor(Math.random() * (baseMax - baseMin)) + baseMin; // Bueno: en la media
        case 3: return Math.floor(Math.random() * (baseMin + 3)); // Regular: pocos goles
        case 2: return Math.floor(Math.random() * 3); // Malo: casi sin goles
        case 1: return 0; // Muy malo: sin goles
    }
}

// Generar asistencias según rendimiento anual
function generarAsistencias(rendimientoAnual) {
    const config = POSICION_CONFIG[playerStats.posicion];
    const baseMin = config.asistenciasBase.min;
    const baseMax = config.asistenciasBase.max;

    switch (rendimientoAnual) {
        case 6: return Math.floor(Math.random() * (baseMax + 5)) + baseMax; // Excepcional: muchas asistencias
        case 5: return Math.floor(Math.random() * (baseMax - 3)) + baseMax - 3; // Muy bueno: cerca del máximo
        case 4: return Math.floor(Math.random() * (baseMax - baseMin)) + baseMin; // Bueno: en la media
        case 3: return Math.floor(Math.random() * (baseMin + 2)); // Regular: pocas asistencias
        case 2: return Math.floor(Math.random() * 2); // Malo: casi sin asistencias
        case 1: return 0; // Muy malo: sin asistencias
    }
}

// Actualizar media según rendimiento
function actualizarMedia(rendimientoAnual) {
    switch (rendimientoAnual) {
        case 6: // Excepcional
            playerStats.media += Math.floor(Math.random() * 3) + 4;
            break;
        case 5: // Muy bueno
            playerStats.media += Math.floor(Math.random() * 3) + 1;
            break;
        case 4: // Bueno
            playerStats.media += Math.random() < 0.5 ? 1 : 0;
            break;
        case 3: // Regular
            playerStats.media -= Math.random() < 0.5 ? 1 : 0;
            break;
        case 2: // Malo
            playerStats.media -= Math.floor(Math.random() * 2) + 1;
            break;
        case 1: // Muy malo
            playerStats.media += Math.floor(Math.random() * 2) + 3;
            break;
    }
    
    // Limitar la media entre 50 y 99
    playerStats.media = Math.max(50, Math.min(99, playerStats.media));
}

// Generar valor de mercado
function generarValorMercado() {
    const baseValor = 100000;
    const rendimientoCarrera = calcularRendimientoCarrera();
    const media = playerStats.media;
    const edad = playerStats.edad;

    let valorMultiplicador = 1;

    // Ajuste por rendimiento
    switch (rendimientoCarrera) {
        case 6: valorMultiplicador *= 2; break;
        case 5: valorMultiplicador *= 1.5; break;
        case 4: valorMultiplicador *= 1.2; break;
        case 3: valorMultiplicador *= 1; break;
        case 2: valorMultiplicador *= 0.7; break;
        case 1: valorMultiplicador *= 0.5; break;
    }

    // Ajuste por media
    if (media >= 85) valorMultiplicador *= 2;
    else if (media >= 75) valorMultiplicador *= 1.5;
    else if (media >= 65) valorMultiplicador *= 1.2;

    // Ajuste por edad
    if (edad <= 21) valorMultiplicador *= 1.5;
    else if (edad <= 25) valorMultiplicador *= 1.2;
    else if (edad > 30) valorMultiplicador *= 0.8;

    const valorCalculado = baseValor * valorMultiplicador * (0.9 + Math.random() * 0.2);

    return Math.round(valorCalculado);
}

// Avanzar al siguiente año
function avanzarAlSiguienteAno() {
    // Generar rendimiento anual
    const rendimientoAnual = generarRendimientoAnual();
    
    // Actualizar historial de rendimiento
    playerStats.historialRendimientoAnual.push(rendimientoAnual);
    
    // Calcular rendimiento de carrera
    const rendimientoCarrera = calcularRendimientoCarrera();

    // Incrementar año y edad
    playerStats.añoActual++;
    playerStats.edad++;

    // Generar estadísticas
    const partidos = generarPartidos(rendimientoAnual);
    const goles = generarGoles(rendimientoAnual);
    const asistencias = generarAsistencias(rendimientoAnual);

    // Actualizar medias totales
    playerStats.totalPartidos += partidos;
    playerStats.totalGoles += goles;
    playerStats.totalAsistencias += asistencias;

    // Actualizar media del jugador
    actualizarMedia(rendimientoAnual);

    // Actualizar mejor media
    playerStats.mejorMedia = Math.max(playerStats.mejorMedia, playerStats.media);

    // Generar valor de mercado
    const valorMercado = generarValorMercado();
    playerStats.mejorValorMercado = Math.max(playerStats.mejorValorMercado, valorMercado);

    // Devolver objeto con los datos del año
    return {
        año: playerStats.añoActual,
        edad: playerStats.edad,
        club: playerStats.club,
        rendimientoAnual: rendimientoAnual,
        rendimientoCarrera: rendimientoCarrera,
        partidos: partidos,
        goles: goles,
        asistencias: asistencias,
        media: playerStats.media,
        valorMercado: valorMercado
    };
}

// Evento para inicializar jugador en el formulario
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = parseInt(document.getElementById('edad').value);
    const posicion = document.getElementById('posicion').value;
    const club = document.getElementById('club').value;
    const media = parseInt(document.getElementById('media').value);

    // Inicializar jugador
    inicializarJugador(nombre, apellido, posicion, edad, club, media);

    // Generar primera temporada
    const primerAno = avanzarAlSiguienteAno();

    // Mostrar información en la tabla
    document.getElementById('playerInfo').style.display = 'block';
    updatePlayerTable(primerAno);
    updateConsolidatedRow(playerStats);
});

// Evento para avanzar al siguiente año
document.getElementById('nextYearBtn').addEventListener('click', function() {
    const siguienteAno = avanzarAlSiguienteAno();
    updatePlayerTable(siguienteAno);
    updateConsolidatedRow(playerStats);
});

// Funciones de actualización de tabla (estas pueden mantenerse como estaban)
function updatePlayerTable(anoData) {
    const playerStatsTable = document.getElementById('playerStats');
    const newRow = document.createElement('tr');

    let tipoRendimiento;
    switch (anoData.rendimientoCarrera) {
        case 6: tipoRendimiento = "Excepcional"; break;
        case 5: tipoRendimiento = "Muy bueno"; break;
        case 4: tipoRendimiento = "Bueno"; break;
        case 3: tipoRendimiento = "Regular"; break;
        case 2: tipoRendimiento = "Malo"; break;
        case 1: tipoRendimiento = "Muy malo"; break;
    }

    newRow.innerHTML = `
        <td>${anoData.año}</td>
        <td>${anoData.edad}</td>
        <td>${playerStats.club}</td>
        <td>${anoData.media}</td>
        <td>${anoData.valorMercado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
        <td>${anoData.partidos}</td>
        <td>${anoData.goles}</td>
        <td>${anoData.asistencias}</td>
        <td>${tipoRendimiento}</td>
    `;
    playerStatsTable.appendChild(newRow);
}

function updateConsolidatedRow(stats) {
    const consolidatedRow = document.getElementById('consolidatedStats');
    consolidatedRow.innerHTML = `
        <td>${stats.nombre} ${stats.apellido}</td>
        <td>${stats.clubesJugados.join(', ')}</td>
        <td>${stats.mejorMedia}</td>
        <td>${stats.mejorValorMercado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
        <td>${stats.totalPartidos}</td>
        <td>${stats.totalGoles}</td>
        <td>${stats.totalAsistencias}</td>
    `;
}