// funciones del campo rut

// funciones de numero de póliza

// Función para validar y formatear RUT chileno
function validarRUT(rut) {
    // Eliminar puntos, guiones y espacios
    rut = rut.replace(/[\.\-\s]/g, '');
    
    // Separar número y dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    
    // Validar que el cuerpo sea numérico
    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }
    
    // Calcular dígito verificador esperado
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    // Validar dígito verificador
    return dvCalculado === dv;
}

// Función para buscar información del cliente
function buscarInformacionCliente(rut, numeroPoliza) {
    // Base de datos simulada (en un caso real sería una API)
    const clientes = {
        '12345678-9': {
            polizas: {
                'POL123': {
                    nombre: 'Juan Pérez',
                    vehiculo: 'Toyota Corolla 2020',
                    patente: 'AB123CD',
                    estado: 'En Evaluación',
                    grúa: 'Grúa XYZ',
                    taller: 'Taller ABC',
                    liquidador: 'María González'
                }
            }
        },
        '98765432-1': {
            polizas: {
                'POL456': {
                    nombre: 'Ana Silva',
                    vehiculo: 'Honda Civic 2021',
                    patente: 'EF456GH',
                    estado: 'Finalizado',
                    grúa: 'Grúa Rápida',
                    taller: 'Taller Mecánico Pro',
                    liquidador: 'Carlos López'
                }
            }
        }
    };
    
    // Buscar en la "base de datos"
    const cliente = clientes[rut];
    if (!cliente) {
        return null; // RUT no encontrado
    }
    
    const poliza = cliente.polizas[numeroPoliza];
    if (!poliza) {
        return null; // Póliza no encontrada
    }
    
    return poliza;
}

// En consulta.js
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const rutInput = document.querySelector('input[placeholder="RUT"]');
        const polizaInput = document.querySelector('input[placeholder="Número de Póliza"]');
        
        const rut = rutInput.value;
        const numeroPoliza = polizaInput.value;
        
        // Validar RUT
        if (!validarRUT(rut)) {
            alert('RUT inválido. Formato: 12345678-9');
            return;
        }
        
        // Buscar información
        const info = buscarInformacionCliente(rut, numeroPoliza);
        
        if (!info) {
            alert('No se encontró información para el RUT y póliza ingresados');
            return;
        }
        
        // Actualizar la interfaz con la información
        actualizarInterfaz(info);
    });
});

function actualizarInterfaz(info) {
    // Actualizar barra de progreso según el estado
    actualizarProgreso(info.estado);
    
    // Actualizar detalles de grúa y taller
    document.querySelector('.detalle-item .valor:first-child').textContent = info.grúa;
    document.querySelector('.detalle-item .valor:last-child').textContent = info.taller;
    
    // Aquí puedes agregar más actualizaciones según la información disponible
}

function actualizarProgreso(estado) {
    // Lógica para actualizar la barra de progreso según el estado
    // Esto depende de cómo manejes los estados en tu CSS
}