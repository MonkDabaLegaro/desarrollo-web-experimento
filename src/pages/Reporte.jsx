import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { siniestroManager } from '../services/siniestroService';
import { formatearFechaHora } from '../utils/validators';

export default function Reporte() {
  const [stats, setStats] = useState(null);
  const [recientes, setRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const statsData = await siniestroManager.getEstadisticas();
      const recientesData = await siniestroManager.getSiniestrosRecientes();

      setStats(statsData);
      setRecientes(recientesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header title="Reportes" />
        <Navigation />
        <main className="main-content">
          <div className="report-container">
            <p>Cargando datos...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Reportes" />
      <Navigation />

      <main className="main-content">
        <div className="report-container">
          <h1>Reportes y Estadísticas</h1>
          <p>Visualiza las estadísticas y reportes del sistema de siniestros</p>

          <div className="stats-section">
            <h2>Estadísticas Generales</h2>
            <div className="stats-grid">
              {stats && (
                <>
                  <div className="stat-card">
                    <h4>Total Siniestros</h4>
                    <p className="stat-number">{stats.total}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Ingresados</h4>
                    <p className="stat-number">{stats.ingresados}</p>
                  </div>
                  <div className="stat-card">
                    <h4>En Evaluación</h4>
                    <p className="stat-number">{stats.enEvaluacion}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Finalizados</h4>
                    <p className="stat-number">{stats.finalizados}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Activos</h4>
                    <p className="stat-number">{stats.activos}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="recent-section">
            <h2>Siniestros Recientes</h2>
            <div className="siniestros-list">
              {recientes.length === 0 ? (
                <p className="no-data">No hay siniestros registrados</p>
              ) : (
                recientes.map(s => (
                  <div key={s.id} className="siniestro-item">
                    <div className="siniestro-header">
                      <span className="siniestro-id">RUT: {s.rut}</span>
                      <span className={`siniestro-estado ${s.estado.toLowerCase().replace(/\s/g, '-')}`}>{s.estado}</span>
                    </div>
                    <div className="siniestro-details">
                      <p><strong>RUT:</strong> {s.rut}</p>
                      <p><strong>Póliza:</strong> {s.numero_poliza}</p>
                      <p><strong>Tipo:</strong> {s.tipo_seguro}</p>
                      <p><strong>Marca:</strong> {s.marca}</p>
                      <p><strong>Liquidador:</strong> {s.liquidador}</p>
                      <p><strong>Fecha:</strong> {formatearFechaHora(s.created_at)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
