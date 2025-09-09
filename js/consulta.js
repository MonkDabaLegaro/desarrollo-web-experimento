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
  
  // Configurar navegación según tipo de usuario
  const navInicio = document.getElementById("nav-inicio");
  if (navInicio) {
    navInicio.href = userType === "admin" ? "admin.html" : "cliente.html";
  }

  const formulario = document.getElementById("consultaForm");
  const progressContainer = document.getElementById("progressContainer");
  const detailsContainer = document.getElementById("detailsContainer");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const rut = document.getElementById("rutConsulta").value.trim();
    const numeroPoliza = document.getElementById("polizaConsulta").value.trim();

    if (!validarRUT(rut)) {
      mostrarAlerta("RUT inválido. Formato esperado: 12345678-9", "error");
      return;
    }

    const siniestro = siniestroManager.buscarSiniestro(rut, numeroPoliza);

    if (!siniestro) {
      mostrarAlerta("No se encontró información para el RUT y póliza ingresados", "error");
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
    document.getElementById("resVehiculo").textContent = `${siniestro.marca} ${siniestro.modelo} (${siniestro.patente})`;
    document.getElementById("liquidadorInfo").textContent = siniestro.liquidador;
    document.getElementById("gruaInfo").textContent = siniestro.grua;
    document.getElementById("tallerInfo").textContent = siniestro.taller;
    document.getElementById("fechaRegistro").textContent = formatearFecha(siniestro.fechaRegistro);
    document.getElementById("estadoActual").textContent = siniestro.estado;

    progressContainer.style.display = "block";
    detailsContainer.style.display = "block";
    
    mostrarAlerta("Información encontrada exitosamente", "success");
  });
});

function updateProgress(estado) {
  // Resetear todos los pasos
  document.getElementById("step1").classList.remove("completed", "current");
  document.getElementById("step2").classList.remove("completed", "current");
  document.getElementById("step3").classList.remove("completed", "current");
  document.getElementById("line1").classList.remove("completed");
  document.getElementById("line2").classList.remove("completed");

  // Marcar pasos según el estado
  if (estado === "Ingresado") {
    document.getElementById("step1").classList.add("completed");
    document.getElementById("step2").classList.add("current");
  } else if (estado === "En Evaluación") {
    document.getElementById("step1").classList.add("completed");
    document.getElementById("line1").classList.add("completed");
    document.getElementById("step2").classList.add("completed");
    document.getElementById("step3").classList.add("current");
  } else if (estado === "Finalizado") {
    document.getElementById("step1").classList.add("completed");
    document.getElementById("line1").classList.add("completed");
    document.getElementById("step2").classList.add("completed");
    document.getElementById("line2").classList.add("completed");
    document.getElementById("step3").classList.add("completed");
  }
}