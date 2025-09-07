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
      rut: document.getElementById('rut').value.trim(),
      poliza: document.getElementById('poliza').value.trim(),
      tipoDano: document.getElementById('tipoDano').value,
      tipoVehiculo: document.getElementById('tipoVehiculo').value,
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim()
    };

    // Validar campos requeridos
    if (!formData.rut || !formData.poliza || !formData.tipoDano || !formData.tipoVehiculo || !formData.email || !formData.telefono) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Validar RUT
    if (!validarRUT(formData.rut)) {
      alert('RUT inválido. Formato correcto: 12.345.678-9');
      return;
    }

    // Validar email
    if (!validarEmail(formData.email)) {
      alert('Email inválido. Por favor, ingresa un email válido.');
      return;
    }

    // Crear siniestro
    const nuevoSiniestro = siniestroManager.crearSiniestro(formData);
    
    alert(`Siniestro creado exitosamente!
ID: ${nuevoSiniestro.id}
Liquidador: ${nuevoSiniestro.liquidador}
Grúa: ${nuevoSiniestro.grua}
Taller: ${nuevoSiniestro.taller}`);
    
    // Limpiar formulario
    form.reset();
    document.querySelector('.file-text').textContent = 'No se ha seleccionado ningún archivo';
  });

  // Configurar botón de archivo
  const fileButton = document.querySelector('.file-button');
  const fileText = document.querySelector('.file-text');
  
  fileButton.addEventListener('click', function() {
    // Simular selección de archivo
    const archivos = ['documento.pdf', 'foto1.jpg', 'parte_policial.pdf', 'licencia.jpg'];
    const archivoSeleccionado = archivos[Math.floor(Math.random() * archivos.length)];
    fileText.textContent = archivoSeleccionado;
  });
}

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}