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
  animateBarChart();
  
  // Animar barras horizontales
  animateHorizontalBars();
  
  // Cargar siniestros recientes
  loadRecentClaims();
}

function animateBarChart() {
  const bars = document.querySelectorAll('.bar');
  
  bars.forEach((bar, index) => {
    const value = bar.getAttribute('data-value');
    const maxHeight = 180; // Altura máxima en px
    const height = (value / 20) * maxHeight; // Escalar según valor máximo
    
    setTimeout(() => {
      bar.style.height = height + 'px';
    }, index * 200);
  });
}

function animateHorizontalBars() {
  const fills = document.querySelectorAll('.h-bar-fill');
  
  fills.forEach((fill, index) => {
    const width = fill.getAttribute('data-width');
    
    setTimeout(() => {
      fill.style.width = width + '%';
    }, index * 300);
  });
}

function loadRecentClaims() {
  // Obtener siniestros recientes del manager
  const recientes = siniestroManager.getSiniestrosRecientes(3);
  const recentList = document.querySelector('.recent-list');
  
  if (recientes.length > 0) {
    recentList.innerHTML = '';
    
    recientes.forEach(siniestro => {
      const item = document.createElement('div');
      item.className = 'recent-item';
      
      const icon = getIconByStatus(siniestro.estado);
      const timeAgo = getTimeAgo(siniestro.fechaRegistro);
      
      item.innerHTML = `
        <img src="image/${icon}" alt="${siniestro.estado}" class="recent-icon">
        <div class="recent-content">
          <p><strong>Siniestro #${siniestro.id.toString().padStart(3, '0')}</strong></p>
          <small>RUT: ${siniestro.rut} - ${siniestro.tipoDano}</small>
        </div>
        <span class="recent-time">${timeAgo}</span>
      `;
      
      recentList.appendChild(item);
    });
  }
}

function getIconByStatus(estado) {
  switch(estado) {
    case 'Ingresado':
      return 'folder.png';
    case 'En Evaluación':
      return 'list.png';
    case 'Finalizado':
      return 'Checkmark.png';
    default:
      return 'folder.png';
  }
}

function getTimeAgo(fechaRegistro) {
  const now = new Date();
  const fecha = new Date(fechaRegistro);
  const diffMs = now - fecha;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `Hace ${diffMins} min`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  } else {
    return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  }
}