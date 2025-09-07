    document.addEventListener("DOMContentLoaded", () => {
      const formulario = document.getElementById("form-consulta");
      const resultado = document.getElementById("resultado");

      formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const rut = document.getElementById("rutConsulta").value.trim();
        const numeroPoliza = document.getElementById("polizaConsulta").value.trim();

        if (!validarRUT(rut)) {
          alert("RUT inválido. Formato esperado: 12345678-9");
          return;
        }

        const siniestro = siniestroManager.buscarSiniestro(rut, numeroPoliza);

        if (!siniestro) {
          alert("No se encontró información para el RUT y póliza ingresados");
          resultado.style.display = "none";
          return;
        }

        // Mostrar los datos guardados
        document.getElementById("resRut").textContent = siniestro.rut;
        document.getElementById("resPoliza").textContent = siniestro.numeroPoliza;
        document.getElementById("resDanio").textContent = siniestro.tipoSeguro;
        document.getElementById("resVehiculo").textContent = siniestro.vehiculo;
        document.getElementById("resEmail").textContent = siniestro.email;
        document.getElementById("resTelefono").textContent = siniestro.telefono;

        resultado.style.display = "block";
      });
    });