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
  // Simular carga de datos del dashboard
  // En una aplicación real, esto vendría de una API
  
  // Actualizar estadísticas con animación
  animateNumbers();
  
  // Cargar actividad reciente
  loadRecentActivity();
}

function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(element => {
    const finalValue = parseInt(element.textContent);
    let currentValue = 0;
    const increment = finalValue / 30; // Duración de la animación
    
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
  // Simular datos de actividad reciente
  const activities = [
    {
      icon: "folder.png",
      title: "Nuevo siniestro registrado",
      description: "RUT: 12.345.678-9 - Póliza: POL123",
      time: "Hace 15 minutos"
    },
    {
      icon: "list.png", 
      title: "Siniestro en evaluación",
      description: "Asignado a liquidador María González",
      time: "Hace 1 hora"
    },
    {
      icon: "Checkmark.png",
      title: "Siniestro finalizado", 
      description: "Vehículo entregado al cliente",
      time: "Hace 2 horas"
    }
  ];

  // Las actividades ya están en el HTML, pero podrían cargarse dinámicamente
  console.log("Actividad reciente cargada:", activities);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Estilos para la notificación
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}