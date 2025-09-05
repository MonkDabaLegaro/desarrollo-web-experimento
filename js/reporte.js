// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");

  // Solo administradores pueden acceder a reportes
  if (isLoggedIn !== "true" || userType !== "admin") {
    localStorage.setItem("redirectAfterLogin", "reporte.html");
    window.location.href = "login.html";
    return;
  }

  // Cargar datos de reportes
  loadReportData();
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  localStorage.removeItem("redirectAfterLogin");
  window.location.href = "login.html";
}

function loadReportData() {
  // Animar barras del gráfico
  animateCharts();
  
  // Cargar estadísticas reales si hay datos
  const stats = siniestroManager.getEstadisticas();
  console.log('Estadísticas del sistema:', stats);
}

function animateCharts() {
  // Animar barras
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.transform = 'scaleY(1)';
    }, index * 200);
  });

  // Animar barras horizontales
  const hBars = document.querySelectorAll('.h-bar-fill');
  hBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    }, index * 300);
  });
}