// Lista de endpoints prontos para consumo.
// Observação:
// - Alguns endpoints (ex.: NewsAPI) exigem API key. Substitua 'SUA_API_KEY' e 'SEU_TOKEN_EVENTBRITE' abaixo.
// - Você pode trocar as URLs pelas APIs/RSS/exatos domínios que preferir.

export const SOURCES = [
  // exemplos (NewsAPI endpoints com source param) - é necessário adicionar sua chave
  // `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=SUA_API_KEY`
  // `https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=SUA_API_KEY`
  // Se preferir, use endpoints públicos/RSS convertidos para JSON.
];

export const EVENT_QUERIES = [
  // exemplo Eventbrite - substitua SEU_TOKEN_EVENTBRITE por token válido
  // `https://www.eventbriteapi.com/v3/events/search/?q=tecnologia&token=SEU_TOKEN_EVENTBRITE`
];
