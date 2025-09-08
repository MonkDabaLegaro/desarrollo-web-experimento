document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación y permisos
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");
  
  if (isLoggedIn !== "true" || userType !== "admin") {
    localStorage.setItem("redirectAfterLogin", "ingreso.html");
    window.location.href = "login.html";
    return;
  }
  
  const formulario = document.getElementById("siniestroForm");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

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

    if (!validarRUT(rut)) {
      mostrarAlerta("RUT inválido. Formato esperado: 12345678-9", "error");
      return;
    }

    const datos = {
      rut: formatearRUT(rut),
      nombreCliente,
      numeroPoliza: poliza,
      patente,
      marca,
      modelo,
      tipoSeguro: tipoDanio,
      vehiculo: tipoVehiculo,
      email,
      telefono
    };

    const nuevo = siniestroManager.crearSiniestro(datos);
    mostrarAlerta(`✅ Siniestro creado exitosamente con ID: ${nuevo.id}. Se asignó a: ${nuevo.liquidador}`, "success");
    
    // Actualizar estadísticas
    actualizarEstadisticas();
    
    // Limpiar formulario
    formulario.reset();
  });
});