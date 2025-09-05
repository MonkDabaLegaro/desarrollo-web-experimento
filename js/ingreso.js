// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");

  // Solo administradores pueden acceder a ingreso
  if (isLoggedIn !== "true" || userType !== "admin") {
    localStorage.setItem("redirectAfterLogin", "ingreso.html");
    window.location.href = "login.html";
    return;
  }

  // Configurar formulario
  setupForm();
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  localStorage.removeItem("redirectAfterLogin");
  window.location.href = "login.html";
}

function setupForm() {
  const form = document.getElementById('siniestroForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      rut: document.getElementById('rut').value,
      poliza: document.getElementById('poliza').value,
      tipoDano: document.getElementById('tipoDano').value,
      tipoVehiculo: document.getElementById('tipoVehiculo').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value
    };

    // Validar RUT
    if (!validarRUT(formData.rut)) {
      alert('RUT inválido. Formato correcto: 12.345.678-9');
      return;
    }

    // Crear siniestro
    const nuevoSiniestro = siniestroManager.crearSiniestro(formData);
    
    alert(`Siniestro creado exitosamente!\nID: ${nuevoSiniestro.id}\nLiquidador: ${nuevoSiniestro.liquidador}\nGrúa: ${nuevoSiniestro.grua}\nTaller: ${nuevoSiniestro.taller}`);
    
    // Limpiar formulario
    form.reset();
  });

  // Configurar botón de archivo
  const fileButton = document.querySelector('.file-button');
  const fileText = document.querySelector('.file-text');
  
  fileButton.addEventListener('click', function() {
    // Simular selección de archivo
    const archivos = ['documento.pdf', 'foto1.jpg', 'parte_policial.pdf'];
    const archivoSeleccionado = archivos[Math.floor(Math.random() * archivos.length)];
    fileText.textContent = archivoSeleccionado;
  });
}