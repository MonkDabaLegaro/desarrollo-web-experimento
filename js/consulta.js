// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");

  if (isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", "consulta.html");
    window.location.href = "login.html";
    return;
  }

  // Configurar navegación según tipo de usuario
  setupNavigation(userType);
  setupForm();
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  localStorage.removeItem("redirectAfterLogin");
  window.location.href = "login.html";
}

function setupNavigation(userType) {
  const userTypeDisplay = document.getElementById('userTypeDisplay');
  const navMenu = document.getElementById('navMenu');
  
  if (userType === 'cliente') {
    userTypeDisplay.textContent = 'Cliente';
    // Ocultar opciones de admin para clientes
    navMenu.innerHTML = `
      <li><a href="cliente.html">Inicio</a></li>
      <li><a href="consulta.html" class="active">Consultar Estado</a></li>
      <li><a href="#" onclick="showContact()">Contacto</a></li>
    `;
  } else {
    userTypeDisplay.textContent = 'Administrador';
  }
}

function setupForm() {
  const form = document.getElementById('consultaForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rut = document.getElementById('rutConsulta').value;
    const poliza = document.getElementById('polizaConsulta').value;
    
    // Validar RUT
    if (!validarRUT(rut)) {
      alert('RUT inválido. Formato: 12.345.678-9');
      return;
    }
    
    // Buscar siniestro
    const siniestro = siniestroManager.buscarSiniestro(rut, poliza);
    
    if (!siniestro) {
      alert('No se encontró información para el RUT y póliza ingresados');
      return;
    }
    
    // Mostrar información
    mostrarProgreso(siniestro);
    mostrarDetalles(siniestro);
  });
}

function mostrarProgreso(siniestro) {
  const progressContainer = document.getElementById('progressContainer');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  
  // Resetear clases
  [step1, step2, step3].forEach(step => {
    step.classList.remove('completed', 'current');
  });
  [line1, line2].forEach(line => {
    line.classList.remove('completed');
  });
  
  // Configurar según estado
  switch(siniestro.estado) {
    case 'Ingresado':
      step1.classList.add('current');
      break;
    case 'En Evaluación':
      step1.classList.add('completed');
      line1.classList.add('completed');
      step2.classList.add('current');
      break;
    case 'Finalizado':
      step1.classList.add('completed');
      step2.classList.add('completed');
      line1.classList.add('completed');
      line2.classList.add('completed');
      step3.classList.add('current');
      break;
  }
  
  progressContainer.style.display = 'block';
}

function mostrarDetalles(siniestro) {
  const detailsContainer = document.getElementById('detailsContainer');
  
  document.getElementById('gruaInfo').textContent = siniestro.grua;
  document.getElementById('tallerInfo').textContent = siniestro.taller;
  document.getElementById('liquidadorInfo').textContent = siniestro.liquidador;
  
  detailsContainer.style.display = 'block';
}

function showContact() {
  const contactInfo = `
    📞 Teléfono de Emergencia: 600 123 4567
    📧 Email: soporte@asistencia.cl
    🕐 Horario: 24/7 disponible
    
    Para emergencias, llama directamente al número de teléfono.
  `;
  
  alert(contactInfo);
}

// Función para validar RUT chileno
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