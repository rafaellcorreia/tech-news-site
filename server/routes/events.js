import express from 'express';
import axios from 'axios';

const router = express.Router();

// Configuração das APIs de eventos de tecnologia
const EVENT_SOURCES = [
  // Eventbrite API (requer token)
  // 'https://www.eventbriteapi.com/v3/events/search/?q=technology&token=SEU_TOKEN',
  
  // Meetup API (requer API key)
  // 'https://api.meetup.com/find/upcoming_events?key=SUA_API_KEY&topic=technology',
  
  // Eventful API (gratuito com limitações)
  'http://api.eventful.com/json/events/search?app_key=YOUR_API_KEY&category=technology&location=worldwide',
  
  // Eventos de exemplo (para demonstração)
];

// Cache para eventos (cache simples em memória)
let eventsCache = [];
let lastFetch = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

// Palavras-chave MUITO ESPECÍFICAS para eventos de tecnologia e inovação
const TECH_EVENT_KEYWORDS = [
  // Tecnologia específica
  'tecnologia', 'technology', 'tech', 'digital', 'software', 'hardware',
  'computador', 'computer', 'smartphone', 'mobile', 'app', 'aplicativo',
  'programação', 'programming', 'desenvolvimento', 'development',
  'desenvolvedor', 'developer', 'programador', 'engenharia de software',
  
  // Inovação e startups TECH
  'inovação', 'innovation', 'startup', 'empreendedorismo', 'entrepreneurship',
  'fintech', 'edtech', 'healthtech', 'proptech', 'agritech', 'cleantech',
  'inteligência artificial', 'artificial intelligence', 'ai', 'machine learning',
  'blockchain', 'cryptocurrency', 'criptomoeda', 'bitcoin', 'metaverso',
  'big data', 'data science', 'ciência de dados', 'analytics',
  
  // Tecnologias específicas
  'cloud', 'nuvem', 'aws', 'azure', 'devops', 'api', 'docker', 'kubernetes',
  'react', 'angular', 'vue', 'javascript', 'typescript', 'python', 'java',
  'frontend', 'backend', 'fullstack', 'mobile', 'ios', 'android',
  'web', 'internet', 'e-commerce', 'marketplace', 'plataforma',
  
  // Gaming e entretenimento digital
  'game', 'jogo', 'gaming', 'gamer', 'console', 'playstation', 'xbox',
  'nintendo', 'steam', 'unity', 'unreal engine', 'realidade virtual', 'vr',
  'realidade aumentada', 'ar', 'streaming', 'twitch', 'youtube gaming',
  
  // Ciência e pesquisa TECH
  'ciência da computação', 'computer science', 'pesquisa tecnológica',
  'robótica', 'robotics', 'robô', 'robot', 'automação', 'automation',
  'iot', 'smart home', 'energia renovável', 'renewable energy',
  
  // Negócios TECH específicos
  'investimento em tecnologia', 'tech investment', 'venture capital tech',
  'vc tech', 'funding tech', 'unicórnio tech', 'tech unicorn',
  'aquisição tech', 'tech acquisition', 'merger tech',
  
  // Empresas TECH conhecidas
  'google', 'microsoft', 'apple', 'amazon', 'meta', 'facebook', 'tesla',
  'netflix', 'spotify', 'uber', 'airbnb', 'nvidia', 'intel', 'amd',
  'oracle', 'salesforce', 'adobe', 'cisco', 'ibm', 'dell', 'hp',
  'lenovo', 'samsung', 'huawei', 'xiaomi'
];

// Palavras-chave que DEVEM ser EXCLUÍDAS dos eventos
const EXCLUDE_EVENT_KEYWORDS = [
  // Política e governo
  'política', 'politics', 'governo', 'government', 'presidente', 'president',
  'ministro', 'minister', 'deputado', 'senador', 'prefeito', 'mayor',
  'eleição', 'election', 'votação', 'voting', 'stf', 'supremo',
  'congresso', 'congress', 'câmara', 'chamber', 'senado', 'senate',
  
  // Economia geral (não tech)
  'economia', 'economy', 'inflação', 'inflation', 'juros', 'interest',
  'dólar', 'dollar', 'real', 'moeda', 'currency', 'banco central',
  
  // Loterias e jogos de azar
  'loteria', 'lottery', 'mega sena', 'quina', 'lotofácil', 'dupla sena',
  'timemania', 'dia de sorte', 'jogo do bicho', 'bingo', 'cassino',
  'casino', 'apostas', 'bets', 'betting', 'sorteio', 'draw',
  
  // Esportes (não tech)
  'futebol', 'football', 'basquete', 'basketball', 'vôlei', 'volleyball',
  'tênis', 'tennis', 'natação', 'swimming', 'atletismo', 'athletics',
  'copa', 'cup', 'campeonato', 'championship', 'liga', 'league',
  
  // Entretenimento não-tech
  'novela', 'soap opera', 'reality show', 'show', 'programa', 'program',
  'filme', 'movie', 'cinema', 'teatro', 'theater', 'música', 'music',
  
  // Saúde geral (não tech)
  'saúde', 'health', 'médico', 'doctor', 'hospital', 'clínica', 'clinic',
  'medicina', 'medicine', 'doença', 'disease', 'vírus', 'virus',
  
  // Educação geral (não tech)
  'educação', 'education', 'escola', 'school', 'universidade', 'university',
  'professor', 'teacher', 'aluno', 'student', 'curso', 'course',
  
  // Outros não-tech
  'clima', 'weather', 'tempo', 'chuva', 'rain', 'sol', 'sun',
  'trânsito', 'traffic', 'acidente', 'accident', 'polícia', 'police'
];

// Função para verificar se um evento é relacionado à tecnologia (FILTRO RIGOROSO)
function isTechEvent(event) {
  const title = (event.title || '').toLowerCase();
  const description = (event.description || '').toLowerCase();
  const category = (event.category || '').toLowerCase();
  const content = `${title} ${description} ${category}`;
  
  // PRIMEIRO: Verifica se contém palavras que DEVEM ser EXCLUÍDAS
  const hasExcludedKeywords = EXCLUDE_EVENT_KEYWORDS.some(keyword => 
    content.includes(keyword.toLowerCase())
  );
  
  if (hasExcludedKeywords) {
    return false; // EXCLUI imediatamente se contém palavras proibidas
  }
  
  // SEGUNDO: Verifica se contém pelo menos UMA palavra-chave de tecnologia
  const hasTechKeywords = TECH_EVENT_KEYWORDS.some(keyword => 
    content.includes(keyword.toLowerCase())
  );
  
  // APENAS retorna true se:
  // 1. NÃO contém palavras excluídas
  // 2. Contém palavras de tecnologia
  return !hasExcludedKeywords && hasTechKeywords;
}

// Eventos de tecnologia e inovação - PRIORIDADE BRASIL
const SAMPLE_EVENTS = [
  // PRINCIPAIS EVENTOS DE TECNOLOGIA E INOVAÇÃO BRASILEIROS
  {
    id: '1',
    title: 'Brasil Game Show 2025',
    description: 'A maior feira de games da América Latina, reunindo desenvolvedores, publishers e gamers.',
    date: '2025-10-09',
    location: 'São Paulo, SP',
    url: 'https://brasilgameshow.com.br',
    category: 'Gaming & Inovação',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Campus Party Brasil 2025',
    description: 'O maior evento de tecnologia, inovação e empreendedorismo digital do Brasil.',
    date: '2025-07-15',
    location: 'São Paulo, SP',
    url: 'https://brasil.campus-party.org',
    category: 'Tecnologia & Inovação',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'TDC - The Developer\'s Conference 2025',
    description: 'Conferência de desenvolvedores com foco em tecnologia e inovação.',
    date: '2025-08-20',
    location: 'São Paulo, SP',
    url: 'https://thedevconf.com',
    category: 'Developer Conference',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Startup Summit 2025',
    description: 'O maior evento de startups e empreendedorismo do Brasil.',
    date: '2025-09-25',
    location: 'Florianópolis, SC',
    url: 'https://startupsummit.com.br',
    category: 'Startup Conference',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'CIAB FEBRABAN 2025',
    description: 'Congresso de Tecnologia Bancária - o maior evento de tecnologia financeira do Brasil.',
    date: '2025-06-10',
    location: 'São Paulo, SP',
    url: 'https://ciab.com.br',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Rio Info 2025',
    description: 'Conferência de tecnologia e inovação do Rio de Janeiro.',
    date: '2025-09-10',
    location: 'Rio de Janeiro, RJ',
    url: 'https://rioinfo.com.br',
    category: 'Technology Conference',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Agile Brazil 2025',
    description: 'Conferência sobre metodologias ágeis e desenvolvimento de software.',
    date: '2025-11-05',
    location: 'São Paulo, SP',
    url: 'https://agilebrazil.com',
    category: 'Agile Development',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    title: 'DevOpsDays São Paulo 2025',
    description: 'Conferência sobre DevOps, cultura e ferramentas de desenvolvimento.',
    date: '2025-10-15',
    location: 'São Paulo, SP',
    url: 'https://devopsdays.org/events/2025-sao-paulo',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
  },
  
  // EVENTOS INTERNACIONAIS IMPORTANTES
  {
    id: '9',
    title: 'Google I/O 2025',
    description: 'Conferência anual de desenvolvedores do Google.',
    date: '2025-05-13',
    location: 'Mountain View, EUA',
    url: 'https://events.google.com/io',
    category: 'Developer Conference',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop'
  },
  {
    id: '10',
    title: 'Apple WWDC 2025',
    description: 'Conferência Mundial de Desenvolvedores da Apple.',
    date: '2025-06-09',
    location: 'Cupertino, EUA',
    url: 'https://developer.apple.com/wwdc',
    category: 'Developer Conference',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
  },
  {
    id: '11',
    title: 'Microsoft Build 2025',
    description: 'Conferência anual de desenvolvedores da Microsoft.',
    date: '2025-05-20',
    location: 'Seattle, EUA',
    url: 'https://build.microsoft.com',
    category: 'Developer Conference',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
  },
  {
    id: '12',
    title: 'AWS re:Invent 2025',
    description: 'Conferência anual da Amazon Web Services.',
    date: '2025-11-30',
    location: 'Las Vegas, EUA',
    url: 'https://reinvent.awsevents.com',
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
  }
];

async function fetchEventsFromSources() {
  try {
    // Por enquanto, retorna eventos de exemplo
    // Em produção, você pode integrar com APIs reais como Eventbrite, Meetup, etc.
    
    const events = SAMPLE_EVENTS.map(event => ({
      ...event,
      formattedDate: new Date(event.date).toLocaleDateString('pt-BR'),
      isUpcoming: new Date(event.date) > new Date()
    }));

    // Filtra apenas eventos relacionados à tecnologia e inovação
    const techEvents = events.filter(isTechEvent);

    // Ordena por data
    return techEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return [];
  }
}

// Rota para buscar eventos
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    
    // Verifica se o cache ainda é válido
    if (eventsCache.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      return res.json({
        success: true,
        data: eventsCache,
        cached: true
      });
    }

    // Busca novos eventos
    const events = await fetchEventsFromSources();
    eventsCache = events;
    lastFetch = now;

    res.json({
      success: true,
      data: events,
      cached: false
    });

  } catch (error) {
    console.error('Erro na rota de eventos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para forçar atualização do cache
router.get('/refresh', async (req, res) => {
  try {
    const events = await fetchEventsFromSources();
    eventsCache = events;
    lastFetch = Date.now();

    res.json({
      success: true,
      data: events,
      message: 'Cache atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar cache:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar cache'
    });
  }
});

export default router;
