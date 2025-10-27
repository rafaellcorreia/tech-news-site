import { useLanguage } from '../contexts/LanguageContext';

export default function NewsCard({ item }) {
  const { t } = useLanguage();
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    
    // Remove tags HTML do texto
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
    
    return cleanText.length > maxLength ? cleanText.substring(0, maxLength) + '...' : cleanText;
  };

  const handleCardClick = () => {
    if (item.url || item.link) {
      window.open(item.url || item.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Função para extrair a URL da imagem de diferentes campos possíveis
  const getImageUrl = () => {
    // Tenta diferentes campos onde a imagem pode estar
    if (item.urlToImage) return item.urlToImage;
    if (item.thumbnail) return item.thumbnail;
    if (item.enclosure && item.enclosure.url) return item.enclosure.url;
    if (item.image) return item.image;
    
    // Tenta extrair imagem do conteúdo HTML se disponível
    if (item.content) {
      // Procura por tags img com src
      const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
      if (imgMatch) return imgMatch[1];
      
      // Procura por tags img com srcset
      const srcsetMatch = item.content.match(/<img[^>]+srcset="([^"]+)"/i);
      if (srcsetMatch) {
        // Pega a primeira URL do srcset
        const firstUrl = srcsetMatch[1].split(',')[0].trim().split(' ')[0];
        if (firstUrl) return firstUrl;
      }
    }
    
    // Tenta extrair do description se disponível
    if (item.description) {
      const imgMatch = item.description.match(/<img[^>]+src="([^"]+)"/i);
      if (imgMatch) return imgMatch[1];
    }
    
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <article 
      className={`card ${(item.url || item.link) ? 'clickable' : ''}`}
      onClick={handleCardClick}
      title={(item.url || item.link) ? t('clickToOpen') : ''}
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={item.title || t('newsTitle')} 
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <h3>{item.title || t('titleNotAvailable')}</h3>
      <p>{truncateText(item.description || item.content)}</p>
      <div className="card-meta">
        <span className="date">
          {formatDate(item.pubDate || item.publishedAt)}
        </span>
        {item.source && (
          <span className="source">{t('source')}: {item.source}</span>
        )}
      </div>
      {(item.url || item.link) && (
        <div className="read-more">
          {t('readMore')}
        </div>
      )}
    </article>
  );
}
