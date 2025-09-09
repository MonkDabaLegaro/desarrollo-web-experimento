document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");
  
  if (isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", "reporte.html");
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
  
  // Cargar reportes
  loadReports();
});

function loadReports() {
  // Estadísticas generales
  const stats = siniestroManager.getEstadisticas();
  
  // Actualizar datos en la tabla
  updateTableData();
  
  console.log("Estadísticas cargadas:", stats);
}

function updateTableData() {
  const tbody = document.querySelector(".report-table tbody");
  const siniestros = siniestroManager.siniestros;
  
  tbody.innerHTML = ""; // Limpiar tabla
  
  if (siniestros.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="no-data">No hay siniestros registrados</td></tr>';
    return;
  }
  
  siniestros.forEach(siniestro => {
    const tr = document.createElement("tr");
    
    let statusClass = 'status-pending';
    if (siniestro.estado === 'Finalizado') statusClass = 'status-completed';
    else if (siniestro.estado === 'En Evaluación') statusClass = 'status-processing';
    
    tr.innerHTML = `
      <td>${siniestro.id}</td>
      <td>${formatearFecha(siniestro.fechaRegistro)}</td>
      <td>${siniestro.nombreCliente || 'N/A'}</td>
      <td>${siniestro.numeroPoliza}</td>
      <td>${siniestro.tipoSeguro}</td>
      <td>${siniestro.liquidador}</td>
      <td><span class="${statusClass}">${siniestro.estado}</span></td>
    `;
    
    tbody.appendChild(tr);
  });
}