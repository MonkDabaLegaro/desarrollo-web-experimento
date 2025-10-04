    document.addEventListener("DOMContentLoaded", () => {
      // 1. Estadísticas generales
      const stats = siniestroManager.getEstadisticas();

      new Chart(document.getElementById("chartEstados"), {
        type: "bar",
        data: {
          labels: ["Ingresados", "En Evaluación", "Finalizados", "Activos"],
          datasets: [{
            label: "Cantidad",
            data: [stats.ingresados, stats.enEvaluacion, stats.finalizados, stats.activos],
            backgroundColor: ["#3498db", "#f1c40f", "#2ecc71", "#e67e22"]
          }]
        }
      });

      // 2. Tipos de daño
      const tipos = siniestroManager.getEstadisticasPorTipo();
      new Chart(document.getElementById("chartTipos"), {
        type: "pie",
        data: {
          labels: Object.keys(tipos),
          datasets: [{
            data: Object.values(tipos),
            backgroundColor: ["#e74c3c", "#9b59b6", "#1abc9c", "#f39c12"]
          }]
        }
      });

      // 3. Siniestros por liquidador
      const liquidadores = siniestroManager.getEstadisticasPorLiquidador();
      new Chart(document.getElementById("chartLiquidadores"), {
        type: "line",
        data: {
          labels: Object.keys(liquidadores),
          datasets: [{
            label: "Total por liquidador",
            data: Object.values(liquidadores).map(l => l.total),
            borderColor: "#2980b9",
            fill: false,
            tension: 0.3
          }]
        }
      });

      // 4. Últimos 5 siniestros
        const recientes = siniestroManager.getSiniestrosRecientes();
        const lista = document.getElementById("listaRecientes");
        lista.innerHTML = ""; // limpiar antes de renderizar

        recientes.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${formatearFechaHora(s.fechaRegistro)} | RUT: ${s.rut} | Póliza: ${s.numeroPoliza} | Daño: ${s.tipoSeguro} | Estado: ${s.estado}`;
        lista.appendChild(li);
      });
    });

      document.addEventListener("DOMContentLoaded", () => {
    // Estadísticas
    const stats = siniestroManager.getEstadisticas();

    new Chart(document.getElementById("chartEstados"), {
      type: "bar",
      data: {
        labels: ["Ingresados", "En Evaluación", "Finalizados", "Activos"],
        datasets: [{
          label: "Cantidad",
          data: [stats.ingresados, stats.enEvaluacion, stats.finalizados, stats.activos],
          backgroundColor: ["#3498db", "#f1c40f", "#2ecc71", "#e67e22"]
        }]
      }
    });

    // Tipos de daño
    const tipos = siniestroManager.getEstadisticasPorTipo();
    new Chart(document.getElementById("chartTipos"), {
      type: "pie",
      data: {
        labels: Object.keys(tipos),
        datasets: [{
          data: Object.values(tipos),
          backgroundColor: ["#e74c3c", "#9b59b6", "#1abc9c", "#f39c12"]
        }]
      }
    });

    // Últimos 5 siniestros
    const recientes = siniestroManager.getSiniestrosRecientes();
    const lista = document.getElementById("listaRecientes");
    lista.innerHTML = ""; // limpiar antes de renderizar

    recientes.forEach(s => {
      const li = document.createElement("li");
      li.textContent = `${formatearFechaHora(s.fechaRegistro)} | RUT: ${s.rut} | Póliza: ${s.numeroPoliza} | Daño: ${s.tipoSeguro} | Estado: ${s.estado}`;
      lista.appendChild(li);
    });
  });