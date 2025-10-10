import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { supabase } from '../services/supabase';

export default function Admin() {
  const [stats, setStats] = useState({
    activos: 0,
    completadosHoy: 0,
    gruasDisponibles: 0,
    talleresActivos: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: siniestros, error } = await supabase
        .from('siniestros')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const activos = siniestros.filter(s => s.estado !== 'Finalizado').length;
      const completadosHoy = siniestros.filter(s => {
        const createdDate = new Date(s.created_at);
        createdDate.setHours(0, 0, 0, 0);
        return s.estado === 'Finalizado' && createdDate.getTime() === today.getTime();
      }).length;

      const gruasUnicas = new Set(siniestros.map(s => s.grua).filter(Boolean));
      const talleresUnicos = new Set(siniestros.map(s => s.taller).filter(Boolean));

      setStats({
        activos,
        completadosHoy,
        gruasDisponibles: gruasUnicas.size,
        talleresActivos: talleresUnicos.size
      });

      setRecentActivity(siniestros.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  }

  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
  }

  function getActivityIcon(estado) {
    switch (estado) {
      case 'Finalizado':
        return '/image/Checkmark.png';
      case 'En Evaluación':
        return '/image/list.png';
      default:
        return '/image/folder.png';
    }
  }

  function getActivityTitle(estado) {
    switch (estado) {
      case 'Finalizado':
        return 'Siniestro finalizado';
      case 'En Evaluación':
        return 'Siniestro en evaluación';
      default:
        return 'Nuevo siniestro registrado';
    }
  }

  if (loading) {
    return (
      <>
        <Header title="Panel Administrador" />
        <Navigation />
        <main className="admin-main">
          <div className="welcome-section">
            <p>Cargando datos...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Panel Administrador" />
      <Navigation />

      <main className="admin-main">
        <div className="welcome-section">
          <h2>Bienvenido al Sistema de Gestión de Siniestros</h2>
          <p>Desde este panel puedes gestionar todos los aspectos del sistema de asistencia vehicular.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <img src="/image/folder.png" alt="Activos" />
            </div>
            <div className="stat-content">
              <h3>Siniestros Activos</h3>
              <p className="stat-number">{stats.activos}</p>
              <small>En proceso</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <img src="/image/Checkmark.png" alt="Completados" />
            </div>
            <div className="stat-content">
              <h3>Completados Hoy</h3>
              <p className="stat-number">{stats.completadosHoy}</p>
              <small>Finalizados</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <img src="/image/YellowCheckMark.png" alt="Grúas" />
            </div>
            <div className="stat-content">
              <h3>Grúas Disponibles</h3>
              <p className="stat-number">{stats.gruasDisponibles}</p>
              <small>En servicio</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <img src="/image/list.png" alt="Talleres" />
            </div>
            <div className="stat-content">
              <h3>Talleres Activos</h3>
              <p className="stat-number">{stats.talleresActivos}</p>
              <small>Operativos</small>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            {recentActivity.length === 0 ? (
              <p>No hay actividad reciente</p>
            ) : (
              recentActivity.map((siniestro) => (
                <div key={siniestro.id} className="activity-item">
                  <img src={getActivityIcon(siniestro.estado)} alt={siniestro.estado} className="activity-icon" />
                  <div className="activity-content">
                    <p><strong>{getActivityTitle(siniestro.estado)}</strong></p>
                    <small>RUT: {siniestro.rut} - Póliza: {siniestro.numero_poliza}</small>
                    {siniestro.liquidador && <small> - Liquidador: {siniestro.liquidador}</small>}
                    <span className="activity-time">{formatTimeAgo(siniestro.created_at)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
