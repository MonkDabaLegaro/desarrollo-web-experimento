// Sistema de gestión de siniestros
class SiniestroManager {
  constructor() {
    this.siniestros = this.loadSiniestros();
    this.nextId = this.getNextId();
  }

  // Cargar siniestros desde localStorage
  loadSiniestros() {
    const stored = localStorage.getItem('siniestros');
    return stored ? JSON.parse(stored) : [];
  }

  // Guardar siniestros en localStorage
  saveSiniestros() {
    localStorage.setItem('siniestros', JSON.stringify(this.siniestros));
  }

  // Obtener siguiente ID disponible
  getNextId() {
    if (this.siniestros.length === 0) return 1;
    return Math.max(...this.siniestros.map(s => s.id)) + 1;
  }

  // Crear nuevo siniestro
  crearSiniestro(datos) {
    const nuevoSiniestro = {
      id: this.nextId++,
      ...datos,
      fechaRegistro: new Date().toISOString(),
      estado: 'Ingresado',
      liquidador: this.asignarLiquidador(),
      grua: this.asignarGrua(),
      taller: this.asignarTaller()
    };

    this.siniestros.push(nuevoSiniestro);
    this.saveSiniestros();
    
    return nuevoSiniestro;
  }

  // Buscar siniestro por RUT y póliza
  buscarSiniestro(rut, poliza) {
    return this.siniestros.find(s => {
      const rutMatch = !rut || s.rut === rut;
      const polizaMatch = !poliza || s.numeroPoliza === poliza;
      return rutMatch && polizaMatch;
    });
  }

  // Buscar siniestros por criterios múltiples
  buscarSiniestros(criterios) {
    return this.siniestros.filter(s => {
      const rutMatch = !criterios.rut || s.rut.includes(criterios.rut);
      const polizaMatch = !criterios.poliza || s.numeroPoliza.includes(criterios.poliza);
      const estadoMatch = !criterios.estado || s.estado === criterios.estado;
      const tipoMatch = !criterios.tipo || s.tipoSeguro === criterios.tipo;
      
      return rutMatch && polizaMatch && estadoMatch && tipoMatch;
    });
  }

  // Obtener siniestro por ID
  obtenerSiniestro(id) {
    return this.siniestros.find(s => s.id === id);
  }

  // Asignar liquidador automáticamente
  asignarLiquidador() {
    const liquidadores = [
      'María González',
      'Carlos López', 
      'Ana Silva',
      'Pedro Martínez',
      'Luis Rodríguez',
      'Carmen Morales'
    ];
    return liquidadores[Math.floor(Math.random() * liquidadores.length)];
  }

  // Asignar grúa automáticamente
  asignarGrua() {
    const gruas = [
      'Grúa Express Norte',
      'Grúa Rápida Sur',
      'Grúa Central 24/7',
      'Grúa Metropolitana',
      'Grúa Oriente'
    ];
    return gruas[Math.floor(Math.random() * gruas.length)];
  }

  // Asignar taller automáticamente
  asignarTaller() {
    const talleres = [
      'Taller Mecánico ABC',
      'Taller Automotriz Pro',
      'Taller Central Motors',
      'Taller Sur Especializado',
      'Taller Norte Premium'
    ];
    return talleres[Math.floor(Math.random() * talleres.length)];
  }

  // Actualizar estado del siniestro
  actualizarEstado(id, nuevoEstado) {
    const siniestro = this.siniestros.find(s => s.id === id);
    if (siniestro) {
      siniestro.estado = nuevoEstado;
      siniestro.fechaActualizacion = new Date().toISOString();
      this.saveSiniestros();
      return true;
    }
    return false;
  }

  // Obtener estadísticas
  getEstadisticas() {
    const total = this.siniestros.length;
    const activos = this.siniestros.filter(s => s.estado !== 'Finalizado').length;
    const finalizados = this.siniestros.filter(s => s.estado === 'Finalizado').length;
    const enEvaluacion = this.siniestros.filter(s => s.estado === 'En Evaluación').length;
    const ingresados = this.siniestros.filter(s => s.estado === 'Ingresado').length;
    
    return {
      total,
      activos,
      finalizados,
      enEvaluacion,
      ingresados
    };
  }

  // Obtener estadísticas por tipo de seguro
  getEstadisticasPorTipo() {
    const tipos = {};
    this.siniestros.forEach(s => {
      tipos[s.tipoSeguro] = (tipos[s.tipoSeguro] || 0) + 1;
    });
    return tipos;
  }

  // Obtener estadísticas por liquidador
  getEstadisticasPorLiquidador() {
    const liquidadores = {};
    
    this.siniestros.forEach(s => {
      if (!liquidadores[s.liquidador]) {
        liquidadores[s.liquidador] = {
          total: 0,
          activos: 0,
          finalizados: 0,
          enEvaluacion: 0,
          ingresados: 0
        };
      }
      
      liquidadores[s.liquidador].total++;
      
      switch(s.estado) {
        case 'Finalizado':
          liquidadores[s.liquidador].finalizados++;
          break;
        case 'En Evaluación':
          liquidadores[s.liquidador].enEvaluacion++;
          break;
        case 'Ingresado':
          liquidadores[s.liquidador].ingresados++;
          break;
        default:
          liquidadores[s.liquidador].activos++;
      }
    });
    
    return liquidadores;
  }

  // Obtener siniestros recientes
  getSiniestrosRecientes(limite = 5) {
    return this.siniestros
      .sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro))
      .slice(0, limite);
  }
}

// Función corregida: validar RUT sin puntos, solo con guion y dígito numérico o K
function validarRUT(rut) {
  rut = rut.replace(/\s/g, ''); // quitar espacios

  // Solo formato XXXXXXXX-X (7 u 8 dígitos + guion + número o K)
  const regex = /^(\d{7,8})-([\dKk])$/;
  const match = rut.match(regex);
  if (!match) return false;

  const cuerpo = match[1];
  const dv = match[2].toUpperCase();

  // Calcular dígito verificador
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvCalculado;
}

// Mantengo la función de formateo simple (opcional)
function formatearRUT(rut) {
  rut = rut.replace(/\s/g, '');
  const regex = /^(\d+)-([\dKk])$/;
  const match = rut.match(regex);
  if (!match) return rut;
  return `${match[1]}-${match[2].toUpperCase()}`;
}

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatearFechaHora(fecha) {
  return new Date(fecha).toLocaleString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Instancia global del manager
const siniestroManager = new SiniestroManager();

// Captura de formulario en ingreso.html
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-siniestro");
  if (!formulario) return;

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const rut = document.getElementById("rut").value.trim();
    const numeroPoliza = document.getElementById("poliza").value.trim();
    const tipoDanio = document.getElementById("tipoDanio").value;
    const tipoVehiculo = document.getElementById("tipoVehiculo").value;
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!validarRUT(rut)) {
      alert("RUT inválido. Formato esperado: 12345678-9 o 12345678-K");
      return;
    }

    const datos = {
      rut: formatearRUT(rut), // normaliza a mayúscula si es K
      numeroPoliza,
      tipoSeguro: tipoDanio,
      vehiculo: tipoVehiculo,
      email,
      telefono
    };

    const nuevo = siniestroManager.crearSiniestro(datos);
    alert("Siniestro creado con ID: " + nuevo.id);
    formulario.reset();
  });
});