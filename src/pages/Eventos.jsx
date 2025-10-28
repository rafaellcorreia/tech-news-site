import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import EventCard from '../components/EventCard';
import { mockEvents } from '../data/mockData';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export default function Eventos(){
  const { t } = useLanguage();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents(){
      try{
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${API_BASE_URL}/api/events`, { timeout: 5000 });
        
        if (response.data.success) {
          setEventos(response.data.data);
        } else {
          throw new Error('API returned error');
        }
      } catch (e) {
        console.error('Erro ao buscar eventos da API, usando dados de exemplo:', e.message);
        // Usa dados mock quando a API falhar (GitHub Pages ou backend offline)
        setEventos(mockEvents);
        setError(null); // Limpa o erro para não mostrar mensagem
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/api/events/refresh`, { timeout: 5000 });
      
      if (response.data.success) {
        setEventos(response.data.data);
      } else {
        throw new Error('API returned error');
      }
    } catch (e) {
      console.error('Erro ao atualizar eventos da API, usando dados de exemplo:', e.message);
      // Usa dados mock quando a API falhar
      setEventos(mockEvents);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container app-container">
      <div className="page-header">
        <h2>{t('upcomingEvents')}</h2>
        <button 
          onClick={handleRefresh} 
          disabled={loading}
          className="refresh-btn"
        >
          {loading ? t('updating') : t('update')}
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            {t('tryAgain')}
          </button>
        </div>
      )}
      
      {loading && !error ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{t('loading')}</p>
        </div>
      ) : (
        <div className="grid">
          {eventos.length > 0 ? (
            eventos.map((evento, i) => <EventCard key={i} evento={evento} />)
          ) : (
            <div className="no-content">
              <p>{t('noEvents')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
