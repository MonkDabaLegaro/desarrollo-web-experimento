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
    return this.siniestros.find(s => 
      s.rut === rut && s.numeroPoliza === poliza
    );
  }

  // Asignar liquidador automáticamente
  asignarLiquidador() {
    const liquidadores = [
      'María González',
      'Carlos López', 
      'Ana Silva',
      'Pedro Martínez'
    ];
    return liquidadores[Math.floor(Math.random() * liquidadores.length)];
  }

  // Asignar grúa automáticamente
  asignarGrua() {
    const gruas = [
      'Grúa XYZ',
      'Grúa Rápida',
      'Grúa Express',
      'Grúa Norte'
    ];
    return gruas[Math.floor(Math.random() * gruas.length)];
  }

  // Asignar taller automáticamente
  asignarTaller() {
    const talleres = [
      'Taller ABC',
      'Taller Mecánico Pro',
      'Taller Central',
      'Taller Sur'
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
    
    return {
      total,
      activos,
      finalizados,
      enEvaluacion: this.siniestros.filter(s => s.estado === 'En Evaluación').length
    };
  }
}

// Instancia global del manager
const siniestroManager = new SiniestroManager();

// Funciones de utilidad para validación
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
  
  return dvCalculado === dv;
}

function formatearRUT(rut) {
  // Limpiar RUT
  rut = rut.replace(/[\.\-\s]/g, '');
  
  // Formatear con puntos y guión
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
  
  // Agregar puntos cada 3 dígitos
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${cuerpoFormateado}-${dv}`;
}

function mostrarEstadoIcono(estado) {
  const iconos = {
    'Ingresado': 'folder.png',
    'En Evaluación': 'list.png', 
    'Finalizado': 'Checkmark.png'
  };
  
  return iconos[estado] || 'folder.png';
}