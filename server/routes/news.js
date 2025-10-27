import express from 'express';
import axios from 'axios';

const router = express.Router();

// Configuração das APIs de notícias de tecnologia e inovação - EXCLUSIVAMENTE BRASIL
const NEWS_SOURCES = [
  // PRINCIPAIS SITES DE TECNOLOGIA E INOVAÇÃO BRASILEIROS (APENAS TECH)
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.tecmundo.com.br%2Frss',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.techtudo.com.br%2Frss.xml',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.olhardigital.com.br%2Frss%2F',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.canaltech.com.br%2Frss%2F',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.adrenaline.com.br%2Ffeed%2F',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.showmetech.com.br%2Ffeed%2F',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.tecnoblog.net%2Ffeed%2F',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.mundoconectado.com.br%2Ffeed%2F',
  
  // STARTUPS E INOVAÇÃO BRASILEIRA (APENAS TECH)
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.startse.com%2Ffeed%2F',
  
  // TECNOLOGIA E GAMES BRASILEIROS (APENAS TECH)
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.tecmundo.com.br%2Fgames%2Frss',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.techtudo.com.br%2Fgames%2Frss.xml',
  
  // FONTES INTERNACIONAIS DE TECNOLOGIA (LIMITADAS E FILTRADAS)
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2Ftechcrunch%2Fstartups',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theverge.com%2Frss%2Findex.xml',
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.wired.com%2Ffeed%2Frss',
];

// Cache para notícias (cache simples em memória)
let newsCache = [];
let lastFetch = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutos

// Palavras-chave MUITO ESPECÍFICAS para filtrar APENAS tecnologia e inovação
const TECH_KEYWORDS = [
  // Tecnologia específica
  'tecnologia', 'technology', 'tech', 'digital', 'software', 'hardware',
  'computador', 'computer', 'smartphone', 'celular', 'mobile', 'app',
  'aplicativo', 'application', 'programação', 'programming', 'código', 'code',
  'desenvolvimento', 'development', 'desenvolvedor', 'developer', 'programador',
  'engenharia de software', 'software engineering', 'arquitetura de software',
  
  // Inovação e startups TECH
  'inovação', 'innovation', 'startup', 'empreendedorismo', 'entrepreneurship',
  'fintech', 'edtech', 'healthtech', 'proptech', 'agritech', 'cleantech',
  'inteligência artificial', 'artificial intelligence', 'ai', 'machine learning',
  'aprendizado de máquina', 'deep learning', 'blockchain', 'cryptocurrency',
  'criptomoeda', 'bitcoin', 'ethereum', 'nft', 'metaverso', 'metaverse',
  'big data', 'data science', 'ciência de dados', 'analytics', 'business intelligence',
  
  // Tecnologias específicas
  'cloud', 'nuvem', 'aws', 'azure', 'google cloud', 'devops', 'ci/cd',
  'microserviços', 'microservices', 'api', 'rest', 'graphql', 'docker',
  'kubernetes', 'react', 'angular', 'vue', 'javascript', 'typescript',
  'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust',
  'frontend', 'backend', 'fullstack', 'mobile', 'ios', 'android',
  'web', 'internet', 'browser', 'chrome', 'firefox', 'safari',
  'e-commerce', 'ecommerce', 'marketplace', 'plataforma', 'platform',
  'sql', 'nosql', 'mongodb', 'mysql', 'postgresql', 'redis',
  
  // Gaming e entretenimento digital
  'game', 'jogo', 'gaming', 'gamer', 'console', 'playstation', 'xbox',
  'nintendo', 'steam', 'epic games', 'unity', 'unreal engine',
  'realidade virtual', 'virtual reality', 'vr', 'realidade aumentada',
  'augmented reality', 'ar', 'streaming', 'twitch', 'youtube gaming',
  
  // Ciência e pesquisa TECH
  'ciência da computação', 'computer science', 'pesquisa tecnológica',
  'laboratório de tecnologia', 'experimento tecnológico', 'patente tecnológica',
  'robótica', 'robotics', 'robô', 'robot', 'automação', 'automation',
  'iot', 'internet das coisas', 'smart home', 'casa inteligente',
  'energia renovável', 'renewable energy', 'solar', 'eólica', 'wind',
  'bateria', 'battery', 'energia limpa', 'clean energy',
  
  // Negócios TECH específicos
  'investimento em tecnologia', 'tech investment', 'venture capital tech',
  'vc tech', 'funding tech', 'unicórnio tech', 'tech unicorn',
  'aquisição tech', 'tech acquisition', 'merger tech', 'fusão tech',
  'valuation tech', 'avaliação tech', 'ipo tech',
  
  // Empresas TECH conhecidas
  'google', 'microsoft', 'apple', 'amazon', 'meta', 'facebook', 'tesla',
  'netflix', 'spotify', 'uber', 'airbnb', 'nvidia', 'intel', 'amd',
  'oracle', 'salesforce', 'adobe', 'cisco', 'ibm', 'dell', 'hp',
  'lenovo', 'samsung', 'huawei', 'xiaomi', 'oneplus', 'oppo', 'vivo',
  
  // Produtos TECH específicos
  'iphone', 'ipad', 'macbook', 'imac', 'mac pro', 'apple watch',
  'android', 'galaxy', 'pixel', 'surface', 'xbox', 'playstation',
  'nintendo switch', 'oculus', 'quest', 'airpods', 'homepod',
  'alexa', 'google home', 'nest', 'chromecast', 'fire tv',
  'windows', 'macos', 'linux', 'ubuntu', 'centos', 'debian',
  
  // Tecnologias emergentes
  'quantum computing', 'computação quântica', '5g', '6g', 'edge computing',
  'computação de borda', 'serverless', 'microservices', 'containers',
  'kubernetes', 'helm', 'terraform', 'ansible', 'jenkins', 'gitlab',
  'github', 'git', 'svn', 'mercurial', 'jira', 'confluence', 'slack',
  'discord', 'teams', 'zoom', 'webex', 'meet', 'hangouts'
];

// Palavras-chave que DEVEM ser EXCLUÍDAS (não são tecnologia)
const EXCLUDE_KEYWORDS = [
  // Política e governo
  'política', 'politics', 'governo', 'government', 'presidente', 'president',
  'ministro', 'minister', 'deputado', 'senador', 'prefeito', 'mayor',
  'eleição', 'election', 'votação', 'voting', 'urna', 'ballot',
  'stf', 'supremo', 'tribunal', 'court', 'justiça', 'justice',
  'congresso', 'congress', 'câmara', 'chamber', 'senado', 'senate',
  'prefeitura', 'city hall', 'estado', 'state', 'município', 'municipality',
  
  // Economia geral (não tech)
  'economia', 'economy', 'inflação', 'inflation', 'juros', 'interest',
  'dólar', 'dollar', 'real', 'moeda', 'currency', 'banco central',
  'central bank', 'pib', 'gdp', 'desemprego', 'unemployment',
  'salário', 'salary', 'wage', 'imposto', 'tax', 'tributo',
  
  // Loterias e jogos de azar
  'loteria', 'lottery', 'mega sena', 'quina', 'lotofácil', 'dupla sena',
  'timemania', 'dia de sorte', 'jogo do bicho', 'bingo', 'cassino',
  'casino', 'apostas', 'bets', 'betting', 'sorteio', 'draw',
  
  // Esportes (não tech)
  'futebol', 'football', 'basquete', 'basketball', 'vôlei', 'volleyball',
  'tênis', 'tennis', 'natação', 'swimming', 'atletismo', 'athletics',
  'copa', 'cup', 'campeonato', 'championship', 'liga', 'league',
  'jogador', 'player', 'atleta', 'athlete', 'treinador', 'coach',
  
  // Entretenimento não-tech
  'novela', 'soap opera', 'reality show', 'show', 'programa', 'program',
  'filme', 'movie', 'cinema', 'teatro', 'theater', 'música', 'music',
  'cantor', 'singer', 'ator', 'actor', 'atriz', 'actress',
  
  // Saúde geral (não tech)
  'saúde', 'health', 'médico', 'doctor', 'hospital', 'clínica', 'clinic',
  'medicina', 'medicine', 'doença', 'disease', 'vírus', 'virus',
  'vacina', 'vaccine', 'tratamento', 'treatment', 'cirurgia', 'surgery',
  
  // Educação geral (não tech)
  'educação', 'education', 'escola', 'school', 'universidade', 'university',
  'professor', 'teacher', 'aluno', 'student', 'curso', 'course',
  'faculdade', 'college', 'ensino', 'teaching', 'aprendizado', 'learning',
  
  // Outros não-tech
  'clima', 'weather', 'tempo', 'chuva', 'rain', 'sol', 'sun',
  'trânsito', 'traffic', 'acidente', 'accident', 'polícia', 'police',
  'crime', 'criminal', 'segurança', 'security', 'violência', 'violence'
];

// Função para verificar se uma notícia é relacionada à tecnologia (FILTRO RIGOROSO)
function isTechRelated(newsItem) {
  const title = (newsItem.title || '').toLowerCase();
  const description = (newsItem.description || newsItem.content || '').toLowerCase();
  const content = `${title} ${description}`;
  
  // PRIMEIRO: Verifica se contém palavras que DEVEM ser EXCLUÍDAS
  const hasExcludedKeywords = EXCLUDE_KEYWORDS.some(keyword => 
    content.includes(keyword.toLowerCase())
  );
  
  if (hasExcludedKeywords) {
    return false; // EXCLUI imediatamente se contém palavras proibidas
  }
  
  // SEGUNDO: Verifica se contém pelo menos UMA palavra-chave de tecnologia
  const hasTechKeywords = TECH_KEYWORDS.some(keyword => 
    content.includes(keyword.toLowerCase())
  );
  
  // TERCEIRO: Verifica se é de fonte brasileira (prioridade Brasil)
  const isBrazilianSource = newsItem.link && (
    newsItem.link.includes('.com.br') || 
    newsItem.link.includes('tecmundo.com.br') ||
    newsItem.link.includes('techtudo.com.br') ||
    newsItem.link.includes('canaltech.com.br') ||
    newsItem.link.includes('adrenaline.com.br') ||
    newsItem.link.includes('olhardigital.com.br') ||
    newsItem.link.includes('showmetech.com.br') ||
    newsItem.link.includes('tecnoblog.net') ||
    newsItem.link.includes('mundoconectado.com.br') ||
    newsItem.link.includes('startse.com') ||
    newsItem.link.includes('infomoney.com.br') ||
    newsItem.link.includes('valor.com.br') ||
    newsItem.link.includes('estadao.com.br') ||
    newsItem.link.includes('folha.uol.com.br')
  );
  
  // APENAS retorna true se:
  // 1. NÃO contém palavras excluídas
  // 2. Contém palavras de tecnologia
  // (Removido requisito de ser fonte brasileira para não filtrar tudo)
  return !hasExcludedKeywords && hasTechKeywords;
}

async function fetchNewsFromSources() {
  try {
    const promises = NEWS_SOURCES.map(async (source) => {
      try {
        const response = await axios.get(source, { timeout: 10000 });
        return response.data.items || response.data.articles || [];
      } catch (error) {
        console.error(`Erro ao buscar notícias de ${source}:`, error.message);
        return [];
      }
    });

    const results = await Promise.all(promises);
    const allNews = results.flat().filter(Boolean);

    // Remove duplicatas baseadas na URL
    const uniqueNews = Array.from(
      new Map(allNews.map(item => [item.link || item.url, item])).values()
    );

    // Filtra apenas notícias relacionadas à tecnologia e inovação
    const techNews = uniqueNews.filter(isTechRelated);

    console.log(`Total de notícias recebidas: ${allNews.length}, após filtro: ${techNews.length}`);

    // Ordena por data (mais recentes primeiro)
    return techNews
      .sort((a, b) => new Date(b.pubDate || b.publishedAt) - new Date(a.pubDate || a.publishedAt))
      .slice(0, 50); // Limita a 50 notícias

  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

// Rota para buscar notícias
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    
    // Verifica se o cache ainda é válido
    if (newsCache.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      return res.json({
        success: true,
        data: newsCache,
        cached: true
      });
    }

    // Busca novas notícias
    const news = await fetchNewsFromSources();
    newsCache = news;
    lastFetch = now;

    console.log(`Retornando ${news.length} notícias para o cliente`);

    res.json({
      success: true,
      data: news,
      cached: false,
      message: news.length === 0 ? 'Nenhuma notícia encontrada no momento. Verifique os logs do servidor.' : null
    });

  } catch (error) {
    console.error('Erro na rota de notícias:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para forçar atualização do cache
router.get('/refresh', async (req, res) => {
  try {
    const news = await fetchNewsFromSources();
    newsCache = news;
    lastFetch = Date.now();

    res.json({
      success: true,
      data: news,
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
