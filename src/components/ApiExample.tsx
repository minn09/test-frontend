import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService, SurfSpot, DeveloperStats, SurfCodeTip } from '../services/api';

export const ApiExample: React.FC = () => {
  const [selectedSpotId, setSelectedSpotId] = useState<number>(1);

  // Hooks para obtener datos de surf
  const { data: surfSpots, loading: spotsLoading, error: spotsError, refetch: refetchSpots } = useApi<SurfSpot[]>(
    () => apiService.getSurfSpots(),
    []
  );

  const { data: developerStats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApi<DeveloperStats>(
    () => apiService.getDeveloperStats(),
    []
  );

  const { data: surfCodeTips, loading: tipsLoading, error: tipsError, refetch: refetchTips } = useApi<SurfCodeTip[]>(
    () => apiService.getSurfCodeTips(),
    []
  );

  const { data: currentConditions, loading: conditionsLoading, error: conditionsError, refetch: refetchConditions } = useApi<CurrentConditions>(
    () => apiService.getCurrentConditions(selectedSpotId.toString()),
    [selectedSpotId]
  );

  const isLoading = spotsLoading || statsLoading || tipsLoading;
  const hasError = spotsError || statsError || tipsError;

  if (isLoading) {
    return <div className="loading">🏄‍♂️ Cargando datos de surf...</div>;
  }

  if (hasError) {
    return (
      <div className="error">
        <p>Error al cargar los datos: {spotsError || statsError || tipsError}</p>
        <div className="error-actions">
          <button onClick={refetchSpots}>Reintentar Spots</button>
          <button onClick={refetchStats}>Reintentar Estadísticas</button>
          <button onClick={refetchTips}>Reintentar Consejos</button>
        </div>
      </div>
    );
  }

  return (
    <div className="api-example">
      <h3>🌊 API de Surf & Code</h3>

      {/* Surf Spots */}
      <div className="data-section">
        <h4>🏖️ Spots de Surf</h4>
        {surfSpots && surfSpots.length > 0 ? (
          <div className="spots-grid">
            {surfSpots.map((spot) => (
              <div key={spot.id} className="spot-card">
                <h5>{spot.nombre}</h5>
                <p><strong>Ubicación:</strong> {spot.ubicacion}</p>
                <p><strong>Tipo:</strong> {spot.tipo}</p>
                <p><strong>Dificultad:</strong> {spot.dificultad}</p>
                <p><strong>Mejor época:</strong> {spot.mejorEpoca}</p>
                <p><strong>Altura promedio:</strong> {spot.alturaPromedio}</p>
                <p>{spot.descripcion}</p>
                <button
                  className="check-conditions-btn"
                  onClick={() => setSelectedSpotId(spot.id)}
                >
                  🌊 Ver condiciones actuales
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay spots de surf disponibles</p>
        )}
      </div>

      {/* Current Conditions */}
      {currentConditions && (
        <div className="data-section">
          <h4>🌊 Condiciones Actuales - {currentConditions.spotNombre}</h4>
          <div className="conditions-card">
            <div className="conditions-grid">
              <div className="condition-item">
                <span className="condition-icon">🌊</span>
                <span className="condition-value">{currentConditions.alturaOlas}</span>
                <span className="condition-label">Altura de olas</span>
              </div>
              <div className="condition-item">
                <span className="condition-icon">💨</span>
                <span className="condition-value">{currentConditions.velocidadViento}</span>
                <span className="condition-label">Viento</span>
              </div>
              <div className="condition-item">
                <span className="condition-icon">🌡️</span>
                <span className="condition-value">{currentConditions.temperatura}</span>
                <span className="condition-label">Temperatura</span>
              </div>
              <div className="condition-item">
                <span className="condition-icon">📊</span>
                <span className="condition-value">{currentConditions.calidadOlas}</span>
                <span className="condition-label">Calidad</span>
              </div>
              <div className="condition-item">
                <span className="condition-icon">🌊</span>
                <span className="condition-value">{currentConditions.marea}</span>
                <span className="condition-label">Marea</span>
              </div>
            </div>
            <div className="recommendation">
              <p><strong>💡 Recomendación:</strong> {currentConditions.recomendacion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Developer Stats */}
      <div className="data-section">
        <h4>👨‍💻 Estadísticas del Desarrollador Surfista</h4>
        {developerStats ? (
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-text">{developerStats.tiempoSurfeando}</span>
              <span className="stat-label">Tiempo surfeando</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{developerStats.spotsVisitados}</span>
              <span className="stat-label">Spots visitados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{developerStats.olasAtrapadas}</span>
              <span className="stat-label">Olas atrapadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{developerStats.proyectosCompletados}</span>
              <span className="stat-label">Proyectos completados</span>
            </div>
            <div className="stat-item">
              <span className="stat-text">{developerStats.codigoEscritoEnPlaya}</span>
              <span className="stat-label">Código en la playa</span>
            </div>
            <div className="stat-item">
              <span className="stat-text">{developerStats.balanceVida}</span>
              <span className="stat-label">Filosofía de vida</span>
            </div>
          </div>
        ) : (
          <p>No hay estadísticas disponibles</p>
        )}
      </div>

      {/* Surf Code Tips */}
      <div className="data-section">
        <h4>💡 Consejos Surf & Code</h4>
        {surfCodeTips && surfCodeTips.length > 0 ? (
          <div className="tips-grid">
            {surfCodeTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <h5>{tip.categoria}</h5>
                <p>{tip.consejo}</p>
                <p className="tip-relation"><em>💭 {tip.relacion}</em></p>
                <span className="tip-category">{tip.categoria}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay consejos disponibles</p>
        )}
      </div>

      <div className="actions-section">
        <button onClick={refetchSpots} className="refresh-button">
          🔄 Actualizar Spots
        </button>
        <button onClick={refetchStats} className="refresh-button">
          📊 Actualizar Estadísticas
        </button>
        <button onClick={refetchTips} className="refresh-button">
          💡 Actualizar Consejos
        </button>
        {currentConditions && (
          <button onClick={refetchConditions} className="refresh-button">
            🌊 Actualizar Condiciones
          </button>
        )}
      </div>
    </div>
  );
}; 