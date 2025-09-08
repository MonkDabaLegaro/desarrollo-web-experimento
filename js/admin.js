// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");

  // Si no está logueado o no es admin, redirigir al login
  if (isLoggedIn !== "true" || userType !== "admin") {
    localStorage.setItem("redirectAfterLogin", "admin.html");
    window.location.href = "login.html";
    return;
  }

  // Cargar datos del dashboard
  loadDashboardData();
});

function logout() {
  // Limpiar datos de sesión
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  localStorage.removeItem("redirectAfterLogin");
  
  // Redirigir al login
  window.location.href = "login.html";
}

function loadDashboardData() {
  // Cargar estadísticas reales desde siniestroManager
  const stats = siniestroManager.getEstadisticas();
  
  // Actualizar los números en el dashboard
  document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = stats.activos;
  document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = stats.finalizados;
  
  // Animar números
  animateNumbers();
  
  // Cargar actividad reciente real
  loadRecentActivity();
}

function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(element => {
    const finalValue = parseInt(element.textContent);
    let currentValue = 0;
    const increment = finalValue / 30;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        element.textContent = finalValue;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(currentValue);
      }
    }, 50);
  });
}

function loadRecentActivity() {
  const activityList = document.querySelector('.activity-list');
  const recentSiniestros = siniestroManager.getSiniestrosRecientes(4);
  
  // Limpiar actividades existentes
  activityList.innerHTML = '';
  
  // Agregar actividades reales
  recentSiniestros.forEach(siniestro => {
    let icon, title;
    
    if (siniestro.estado === 'Ingresado') {
      icon = 'folder.png';
      title = 'Nuevo siniestro registrado';
    } else if (siniestro.estado === 'En Evaluación') {
      icon = 'list.png';
      title = 'Siniestro en evaluación';
    } else {
      icon = 'Checkmark.png';
      title = 'Siniestro finalizado';
    }
    
    const timeDiff = timeSince(new Date(siniestro.fechaRegistro));
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <img src="image/${icon}" alt="Actividad" class="activity-icon">
      <div class="activity-content">
        <p><strong>${title}</strong></p>
        <small>RUT: ${siniestro.rut} - Póliza: ${siniestro.numeroPoliza}</small>
        <span class="activity-time">Hace ${timeDiff}</span>
      </div>
    `;
    
    activityList.appendChild(activityItem);
  });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " años";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " meses";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " días";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " horas";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutos";
  return Math.floor(seconds) + " segundos";
}