document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación y permisos
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");
  
  if (isLoggedIn !== "true" || userType !== "admin") {
    localStorage.setItem("redirectAfterLogin", "reporte.html");
    window.location.href = "login.html";
    return;
  }
  
  // Actualizar tipo de usuario en la interfaz
  const userTypeDisplay = document.getElementById("userTypeDisplay");
  if (userTypeDisplay) {
    userTypeDisplay.textContent = "Administrador";
  }
  
  // Cargar reportes
  loadReports();
});

function loadReports() {
  // 1. Estadísticas generales
  const stats = siniestroManager.getEstadisticas();
  
  // Actualizar datos en la tabla
  updateTableData();
  
  // Aquí iría la lógica para los gráficos si tuvieras una biblioteca como Chart.js
  console.log("Estadísticas cargadas:", stats);
}

function updateTableData() {
  const tbody = document.querySelector(".report-table tbody");
  const siniestros = siniestroManager.siniestros.slice(0, 5); // Últimos 5 siniestros
  
  tbody.innerHTML = ""; // Limpiar tabla
  
  siniestros.forEach(siniestro => {
    const tr = document.createElement("tr");
    
    tr.innerHTML = `
      <td>${siniestro.id}</td>
      <td>${formatearFecha(siniestro.fechaRegistro)}</td>
      <td>${siniestro.nombreCliente || siniestro.rut}</td>
      <td>${siniestro.numeroPoliza}</td>
      <td>${siniestro.tipoSeguro}</td>
      <td>${siniestro.liquidador}</td>
      <td><span class="status-${siniestro.estado === 'Finalizado' ? 'completed' : siniestro.estado === 'En Evaluación' ? 'processing' : 'pending'}">${siniestro.estado}</span></td>
    `;
    
    tbody.appendChild(tr);
  });
}