// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");

  // Verificar si está logueado
  if (isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", "consulta.html");
    window.location.href = "login.html";
    return;
  }

  // Configurar navegación según tipo de usuario
  setupNavigation(userType);
  
  // Configurar formulario
  setupConsultaForm();
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  localStorage.removeItem("redirectAfterLogin");
  window.location.href = "login.html";
}

function setupNavigation(userType) {
  const navMenu = document.getElementById('navMenu');
  const userTypeDisplay = document.getElementById('userTypeDisplay');
  
  if (userType === 'admin') {
    userTypeDisplay.textContent = 'Administrador';
    navMenu.innerHTML = `
      <li><a href="bienvenida.html">Inicio</a></li>
      <li><a href="ingreso.html">Ingreso de Siniestro</a></li>
      <li><a href="consulta.html" class="active">Consulta de Estado</a></li>
      <li><a href="reporte.html">Reportes</a></li>
    `;
  } else {
    userTypeDisplay.textContent = 'Cliente';
    navMenu.innerHTML = `
      <li><a href="cliente.html">Inicio</a></li>
      <li><a href="consulta.html" class="active">Consultar Estado</a></li>
      <li><a href="#" onclick="showContact()">Contacto</a></li>
    `;
  }
}

function setupConsultaForm() {
  const formulario = document.getElementById("consultaForm");
  const progressContainer = document.getElementById("progressContainer");
  const detailsContainer = document.getElementById("detailsContainer");

  formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const rut = document.getElementById("rutConsulta").value.trim();
    const numeroPoliza = document.getElementById("polizaConsulta").value.trim();

    if (!validarRUT(rut)) {
      alert("RUT inválido. Formato esperado: 12.345.678-9");
      return;
    }

    const siniestro = siniestroManager.buscarSiniestro(rut, numeroPoliza);

    if (!siniestro) {
      alert("No se encontró información para el RUT y póliza ingresados");
      progressContainer.style.display = "none";
      detailsContainer.style.display = "none";
      return;
    }

    // Mostrar los datos del siniestro
    mostrarResultados(siniestro);
  });
}

function mostrarResultados(siniestro) {
  // Mostrar contenedores
  const progressContainer = document.getElementById("progressContainer");
  const detailsContainer = document.getElementById("detailsContainer");
  
  progressContainer.style.display = "block";
  detailsContainer.style.display = "block";

  // Actualizar detalles
  document.getElementById("resRut").textContent = siniestro.rut;
  document.getElementById("resPoliza").textContent = siniestro.poliza;
  document.getElementById("resDanio").textContent = siniestro.tipoDano;
  document.getElementById("resVehiculo").textContent = siniestro.tipoVehiculo;
  document.getElementById("gruaInfo").textContent = siniestro.grua;
  document.getElementById("tallerInfo").textContent = siniestro.taller;
  document.getElementById("liquidadorInfo").textContent = siniestro.liquidador;

  // Actualizar progreso según estado
  actualizarProgreso(siniestro.estado);
}

function actualizarProgreso(estado) {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");

  // Resetear clases
  [step1, step2, step3].forEach(step => {
    step.classList.remove('completed', 'current');
  });
  [line1, line2].forEach(line => {
    line.classList.remove('completed');
  });

  // Aplicar estado según progreso
  switch(estado) {
    case 'Ingresado':
      step1.classList.add('completed');
      step2.classList.add('current');
      line1.classList.add('completed');
      break;
    case 'En Evaluación':
      step1.classList.add('completed');
      step2.classList.add('completed');
      step3.classList.add('current');
      line1.classList.add('completed');
      line2.classList.add('completed');
      break;
    case 'Finalizado':
      step1.classList.add('completed');
      step2.classList.add('completed');
      step3.classList.add('completed');
      line1.classList.add('completed');
      line2.classList.add('completed');
      break;
    default:
      step1.classList.add('current');
  }
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