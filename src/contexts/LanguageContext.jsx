import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Traduções
const translations = {
  pt: {
    // Navbar
    home: 'Início',
    events: 'Eventos',
    contact: 'Contato',
    
    // Home page
    latestNews: 'Tecnologia e Inovação no Brasil e Mundo',
    loading: 'Carregando notícias...',
    updating: 'Atualizando...',
    update: 'Atualizar',
    readMore: 'Leia mais →',
    noNews: 'Nenhuma notícia encontrada no momento.',
    tryAgain: 'Tentar Novamente',
    errorLoading: 'Erro ao carregar notícias',
    errorConnecting: 'Erro ao conectar com o servidor',
    errorUpdating: 'Erro ao atualizar notícias',
    
    // Events page
    upcomingEvents: 'Eventos de Tecnologia e Inovação',
    viewMore: 'Ver mais →',
    noEvents: 'Nenhum evento encontrado no momento.',
    
    // Contact page
    contactUs: 'Entre em Contato',
    contactDescription: 'Tem alguma dúvida ou sugestão? Entre em contato conosco!',
    name: 'Nome',
    email: 'E-mail',
    message: 'Mensagem',
    send: 'Enviar',
    sending: 'Enviando...',
    messageSent: 'Mensagem enviada com sucesso!',
    errorSending: 'Erro ao enviar mensagem',
    
    // Common
    source: 'Fonte',
    date: 'Data',
    location: 'Local',
    category: 'Categoria',
    
    // Contact page additional
    subject: 'Assunto',
    contactEmail: 'contato@technews.com',
    socialMedia: '@technews',
    website: 'www.technews.com',
    
    // Music Player
    musicPlayerTitle: '🎵 Tech Music Player',
    musicPlayerSubtitle: 'Música eletrônica para acompanhar sua jornada tech',
    previousTrack: 'Música anterior',
    nextTrack: 'Próxima música',
    play: 'Tocar',
    pause: 'Pausar',
    volume: 'Volume',
    playlistTitle: 'Playlist Tech',
    
    // Footer
    footerText: '© {year} TechInfo - Tecnologia e Inovação',
    
    // Card components
    clickToOpen: 'Clique para abrir em nova aba',
    newsTitle: 'Notícia',
    eventTitle: 'Evento',
    titleNotAvailable: 'Título não disponível',
    
    // Contact page labels
    emailLabel: '📧 Email',
    socialLabel: '📱 Redes Sociais',
    websiteLabel: '🌐 Website'
  },
  
  en: {
    // Navbar
    home: 'Home',
    events: 'Events',
    contact: 'Contact',
    
    // Home page
    latestNews: 'Technology and Innovation in Brazil and World',
    loading: 'Loading news...',
    updating: 'Updating...',
    update: 'Update',
    readMore: 'Read more →',
    noNews: 'No news found at the moment.',
    tryAgain: 'Try Again',
    errorLoading: 'Error loading news',
    errorConnecting: 'Error connecting to server',
    errorUpdating: 'Error updating news',
    
    // Events page
    upcomingEvents: 'Technology and Innovation Events',
    viewMore: 'View more →',
    noEvents: 'No events found at the moment.',
    
    // Contact page
    contactUs: 'Contact Us',
    contactDescription: 'Have any questions or suggestions? Contact us!',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    messageSent: 'Message sent successfully!',
    errorSending: 'Error sending message',
    
    // Common
    source: 'Source',
    date: 'Date',
    location: 'Location',
    category: 'Category',
    
    // Contact page additional
    subject: 'Subject',
    contactEmail: 'contact@technews.com',
    socialMedia: '@technews',
    website: 'www.technews.com',
    
    // Music Player
    musicPlayerTitle: '🎵 Tech Music Player',
    musicPlayerSubtitle: 'Electronic music to accompany your tech journey',
    previousTrack: 'Previous track',
    nextTrack: 'Next track',
    play: 'Play',
    pause: 'Pause',
    volume: 'Volume',
    playlistTitle: 'Tech Playlist',
    
    // Footer
    footerText: '© {year} TechInfo - Technology and Innovation',
    
    // Card components
    clickToOpen: 'Click to open in new tab',
    newsTitle: 'News',
    eventTitle: 'Event',
    titleNotAvailable: 'Title not available',
    
    // Contact page labels
    emailLabel: '📧 Email',
    socialLabel: '📱 Social Media',
    websiteLabel: '🌐 Website'
  },
  
  es: {
    // Navbar
    home: 'Inicio',
    events: 'Eventos',
    contact: 'Contacto',
    
    // Home page
    latestNews: 'Tecnología e Innovación en Brasil y el Mundo',
    loading: 'Cargando noticias...',
    updating: 'Actualizando...',
    update: 'Actualizar',
    readMore: 'Leer más →',
    noNews: 'No se encontraron noticias en este momento.',
    tryAgain: 'Intentar de Nuevo',
    errorLoading: 'Error al cargar noticias',
    errorConnecting: 'Error al conectar con el servidor',
    errorUpdating: 'Error al actualizar noticias',
    
    // Events page
    upcomingEvents: 'Eventos de Tecnología e Innovación',
    viewMore: 'Ver más →',
    noEvents: 'No se encontraron eventos en este momento.',
    
    // Contact page
    contactUs: 'Contáctanos',
    contactDescription: '¿Tienes alguna pregunta o sugerencia? ¡Contáctanos!',
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    send: 'Enviar',
    sending: 'Enviando...',
    messageSent: '¡Mensaje enviado con éxito!',
    errorSending: 'Error al enviar mensaje',
    
    // Common
    source: 'Fuente',
    date: 'Fecha',
    location: 'Ubicación',
    category: 'Categoría',
    
    // Contact page additional
    subject: 'Asunto',
    contactEmail: 'contacto@technews.com',
    socialMedia: '@technews',
    website: 'www.technews.com',
    
    // Music Player
    musicPlayerTitle: '🎵 Reproductor de Música Tech',
    musicPlayerSubtitle: 'Música electrónica para acompañar tu viaje tecnológico',
    previousTrack: 'Pista anterior',
    nextTrack: 'Siguiente pista',
    play: 'Reproducir',
    pause: 'Pausar',
    volume: 'Volumen',
    playlistTitle: 'Playlist Tech',
    
    // Footer
    footerText: '© {year} TechInfo - Tecnología e Innovación',
    
    // Card components
    clickToOpen: 'Haz clic para abrir en nueva pestaña',
    newsTitle: 'Noticia',
    eventTitle: 'Evento',
    titleNotAvailable: 'Título no disponible',
    
    // Contact page labels
    emailLabel: '📧 Correo',
    socialLabel: '📱 Redes Sociales',
    websiteLabel: '🌐 Sitio Web'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Verifica se há idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('tech-news-language');
    return savedLanguage && translations[savedLanguage] ? savedLanguage : 'pt';
  });

  useEffect(() => {
    // Salva o idioma no localStorage quando muda
    localStorage.setItem('tech-news-language', language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
