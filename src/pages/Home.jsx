import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import NewsCard from '../components/NewsCard';
import MusicPlayer from '../components/MusicPlayer';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export default function Home(){
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews(){
      try{
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        
        if (response.data.success) {
          setNews(response.data.data);
        } else {
          setError(t('errorLoading'));
        }
      } catch (e) {
        console.error('Erro ao buscar notícias:', e);
        setError(t('errorConnecting'));
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/api/news/refresh`);
      
      if (response.data.success) {
        setNews(response.data.data);
      } else {
        setError(t('errorUpdating'));
      }
    } catch (e) {
      console.error('Erro ao atualizar notícias:', e);
      setError(t('errorConnecting'));
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
