import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import NewsCard from '../components/NewsCard';
import MusicPlayer from '../components/MusicPlayer';
import { mockNews } from '../data/mockData';

// Verifica se estamos em produção no GitHub Pages
const isProduction = import.meta.env.MODE === 'production';
const API_BASE_URL = isProduction ? null : 'http://localhost:3001';

export default function Home(){
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews(){
      // Em produção (GitHub Pages), usa dados mock diretamente
      if (isProduction || !API_BASE_URL) {
        console.log('Usando dados de exemplo (produção)');
        setNews(mockNews);
        setLoading(false);
        return;
      }

      try{
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${API_BASE_URL}/api/news`, { timeout: 5000 });
        
        if (response.data.success) {
          setNews(response.data.data);
        } else {
          throw new Error('API returned error');
        }
      } catch (e) {
        console.error('Erro ao buscar notícias da API, usando dados de exemplo:', e.message);
        setNews(mockNews);
        setError(null);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleRefresh = async () => {
    // Em produção, apenas recarrega os dados mock
    if (isProduction || !API_BASE_URL) {
      console.log('Atualizando dados de exemplo');
      setNews([...mockNews]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/api/news/refresh`, { timeout: 5000 });
      
      if (response.data.success) {
        setNews(response.data.data);
      } else {
        throw new Error('API returned error');
      }
    } catch (e) {
      console.error('Erro ao atualizar notícias da API, usando dados de exemplo:', e.message);
      setNews(mockNews);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container app-container">
        <div className="page-header">
          <h2 className="tech-title">{t('latestNews')}</h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="refresh-btn"
          >
            {loading ? t('updating') : t('update')}
          </button>
        </div>
      
      {/* Music Player */}
      <MusicPlayer />
      
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
          {news.length > 0 ? (
            news.map((article, i) => <NewsCard key={i} item={article} />)
          ) : (
            <div className="no-content">
              <p>{t('noNews')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
