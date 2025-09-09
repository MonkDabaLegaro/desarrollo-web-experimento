document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");
  
  if (isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", "ingreso.html");
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
  
  const formulario = document.getElementById("siniestroForm");
  if (!formulario) return;

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const rut = document.getElementById("rut").value.trim();
    const nombreCliente = document.getElementById("nombreCliente").value.trim();
    const poliza = document.getElementById("poliza").value.trim();
    const patente = document.getElementById("patente").value.trim();
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const tipoDanio = document.getElementById("tipoDanio").value;
    const tipoVehiculo = document.getElementById("tipoVehiculo").value;
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    // Validaciones
    if (!validarRUT(rut)) {
      mostrarAlerta("RUT inválido. Formato esperado: 12345678-9", "error");
      return;
    }

    if (!nombreCliente) {
      mostrarAlerta("El nombre del cliente es obligatorio", "error");
      return;
    }

    if (!poliza) {
      mostrarAlerta("El número de póliza es obligatorio", "error");
      return;
    }

    if (!patente) {
      mostrarAlerta("La patente del vehículo es obligatoria", "error");
      return;
    }

    if (!marca || !modelo) {
      mostrarAlerta("La marca y modelo del vehículo son obligatorios", "error");
      return;
    }

    if (!tipoDanio || !tipoVehiculo) {
      mostrarAlerta("Debe seleccionar el tipo de daño y tipo de vehículo", "error");
      return;
    }

    if (!validarEmail(email)) {
      mostrarAlerta("El email ingresado no es válido", "error");
      return;
    }

    if (!validarTelefono(telefono)) {
      mostrarAlerta("El teléfono debe tener formato chileno (+56 9 1234 5678)", "error");
      return;
    }

    // Crear objeto con los datos
    const datos = {
      rut: formatearRUT(rut),
      nombreCliente,
      numeroPoliza: poliza,
      patente: patente.toUpperCase(),
      marca,
      modelo,
      tipoSeguro: tipoDanio,
      vehiculo: tipoVehiculo,
      email,
      telefono
    };

    try {
      const nuevo = siniestroManager.crearSiniestro(datos);
      mostrarAlerta(`Siniestro creado exitosamente con ID: ${nuevo.id}. Liquidador asignado: ${nuevo.liquidador}`, "success");
      
      // Limpiar formulario
      formulario.reset();
      
      // Actualizar estadísticas si estamos en admin
      if (typeof actualizarEstadisticas === 'function') {
        actualizarEstadisticas();
      }
    } catch (error) {
      mostrarAlerta("Error al crear el siniestro. Intente nuevamente.", "error");
      console.error("Error:", error);
    }
  });

  // Manejar botón de archivo
  const fileButton = document.querySelector('.file-button');
  const fileText = document.querySelector('.file-text');
  
  if (fileButton && fileText) {
    fileButton.addEventListener('click', () => {
      // Simular selección de archivo
      const fileName = `documento_${Date.now()}.pdf`;
      fileText.textContent = fileName;
    });
  }
});