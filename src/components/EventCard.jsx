import { useLanguage } from '../contexts/LanguageContext';

export default function EventCard({ evento }) {
  const { t } = useLanguage();
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleCardClick = () => {
    if (evento.url) {
      window.open(evento.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article 
      className={`card ${evento.url ? 'clickable' : ''}`}
      onClick={handleCardClick}
      title={evento.url ? t('clickToOpen') : ''}
    >
      {evento.image && (
        <img 
          src={evento.image} 
          alt={evento.title || t('eventTitle')} 
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <h3>{evento.title || t('eventTitle')}</h3>
      <p>{truncateText(evento.description)}</p>
      
      <div className="card-meta">
        <div className="event-info">
          <span className="date">
            📅 {evento.formattedDate || formatDate(evento.date)}
          </span>
          {evento.location && (
            <span className="location">
              📍 {evento.location}
            </span>
          )}
          {evento.category && (
            <span className="category">
              🏷️ {evento.category}
            </span>
          )}
        </div>
      </div>
      
      {evento.url && (
        <div className="read-more">
          {t('viewMore')}
        </div>
      )}
    </article>
  );
}
