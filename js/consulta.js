document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");
  
  if (isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", "consulta.html");
    window.location.href = "login.html";
    return;
  }
  
  // Actualizar tipo de usuario en la interfaz
  const userTypeDisplay = document.getElementById("userTypeDisplay");
  if (userTypeDisplay && userType) {
    userTypeDisplay.textContent = userType === "admin" ? "Administrador" : "Cliente";
  }
  
  // Ajustar navegación según tipo de usuario
  adjustNavigation(userType);

  const formulario = document.getElementById("consultaForm");
  const progressContainer = document.getElementById("progressContainer");
  const detailsContainer = document.getElementById("detailsContainer");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const rut = document.getElementById("rutConsulta").value.trim();
    const numeroPoliza = document.getElementById("polizaConsulta").value.trim();

    if (!validarRUT(rut)) {
      mostrarAlerta("RUT inválido. Formato esperado: 12345678-9");
      return;
    }

    const siniestro = siniestroManager.buscarSiniestro(rut, numeroPoliza);

    if (!siniestro) {
      mostrarAlerta("No se encontró información para el RUT y póliza ingresados");
      progressContainer.style.display = "none";
      detailsContainer.style.display = "none";
      return;
    }

    // Mostrar progreso según estado
    updateProgress(siniestro.estado);
    
    // Mostrar los datos del siniestro
    document.getElementById("resRut").textContent = siniestro.rut;
    document.getElementById("resPoliza").textContent = siniestro.numeroPoliza;
    document.getElementById("resEmail").textContent = siniestro.email;
    document.getElementById("resTelefono").textContent = siniestro.telefono;
    document.getElementById("resDanio").textContent = siniestro.tipoSeguro;
    document.getElementById("resVehiculo").textContent = siniestro.vehiculo;
    document.getElementById("liquidadorInfo").textContent = siniestro.liquidador;
    document.getElementById("fechaRegistro").textContent = formatearFecha(siniestro.fechaRegistro);
    document.getElementById("estadoActual").textContent = siniestro.estado;

    progressContainer.style.display = "block";
    detailsContainer.style.display = "block";
  });
});

function updateProgress(estado) {
  // Resetear todos los pasos
  document.getElementById("step1").classList.remove("completed");
  document.getElementById("step2").classList.remove("completed");
  document.getElementById("step3").classList.remove("completed");
  document.getElementById("line1").classList.remove("completed");
  document.getElementById("line2").classList.remove("completed");

  // Marcar pasos según el estado
  if (estado === "Ingresado" || estado === "En Evaluación" || estado === "Finalizado") {
    document.getElementById("step1").classList.add("completed");
    document.getElementById("line1").classList.add("completed");
  }
  
  if (estado === "En Evaluación" || estado === "Finalizado") {
    document.getElementById("step2").classList.add("completed");
    document.getElementById("line2").classList.add("completed");
  }
  
  if (estado === "Finalizado") {
    document.getElementById("step3").classList.add("completed");
  }
}

function adjustNavigation(userType) {
  const navItems = document.querySelectorAll(".main-nav ul li a");
  
  if (userType === "cliente") {
    // Ocultar opciones de admin para clientes
    navItems.forEach(item => {
      if (item.getAttribute("href") === "ingreso.html" || 
          item.getAttribute("href") === "reporte.html") {
        item.parentElement.style.display = "none";
      }
    });
  }
}