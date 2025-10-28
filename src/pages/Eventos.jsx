import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import EventCard from '../components/EventCard';
import { mockEvents } from '../data/mockData';

// Verifica se estamos em produção no GitHub Pages
const isProduction = import.meta.env.MODE === 'production';
const API_BASE_URL = isProduction ? null : 'http://localhost:3001';

export default function Eventos(){
  const { t } = useLanguage();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents(){
      // Em produção (GitHub Pages), usa dados mock diretamente
      if (isProduction || !API_BASE_URL) {
        console.log('Usando dados de exemplo (produção)');
        setEventos(mockEvents);
        setLoading(false);
        return;
      }

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
        setEventos(mockEvents);
        setError(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleRefresh = async () => {
    // Em produção, apenas recarrega os dados mock
    if (isProduction || !API_BASE_URL) {
      console.log('Atualizando dados de exemplo');
      setEventos([...mockEvents]);
      return;
    }

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
