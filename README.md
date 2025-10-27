# TechInov Brasil 🚀

Plataforma web moderna para consumo e exibição de notícias de tecnologia e inovação, com foco no Brasil e no mundo.

## 🚀 Funcionalidades

- 📰 **Notícias em Tempo Real**: Busca automática de notícias de múltiplas fontes RSS brasileiras e internacionais
- 🎵 **Player de Música**: Reprodução de músicas eletrônicas com controles completos
- 📅 **Eventos**: Lista de eventos de tecnologia e inovação (brasileiros e internacionais)
- 📧 **Sistema de Contato**: Formulário de contato funcional com validação
- 🎨 **Interface Moderna**: Design responsivo com video background e animações suaves
- ⚡ **Cache Inteligente**: Otimização de performance com cache de 15 minutos

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js 18
- React Router DOM
- Axios para requisições HTTP
- CSS3 com variáveis customizadas
- Design responsivo

### Backend
- Node.js
- Express.js
- CORS para permitir requisições cross-origin
- Cache em memória para otimização

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd tech-news-site
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

Este comando irá iniciar tanto o servidor backend (porta 3001) quanto o frontend (porta 5173) simultaneamente.

## 🌐 APIs Integradas

### Notícias
O site consome RSS feeds de fontes confiáveis de tecnologia:
- TechCrunch
- The Verge
- VentureBeat
- Wired
- Ars Technica

### Eventos
Atualmente utiliza eventos de exemplo. Para integrar com APIs reais, você pode:
- Eventbrite API
- Meetup API
- Eventful API

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com:
```
PORT=3001
NEWS_API_KEY=sua_chave_da_newsapi
EVENTBRITE_TOKEN=seu_token_do_eventbrite
MEETUP_API_KEY=sua_chave_do_meetup
```

### Personalização de Fontes
Edite o arquivo `server/routes/news.js` para adicionar ou remover fontes de notícias.

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🎨 Design

- Paleta de cores moderna
- Animações suaves
- Cards com hover effects
- Loading states
- Error handling

## 🚀 Deploy

### Build para Produção
```bash
npm run build
npm start
```

### Deploy no Vercel/Netlify
1. Execute `npm run build`
2. Faça upload da pasta `dist`
3. Configure as variáveis de ambiente

## 📄 Scripts Disponíveis

- `npm run dev` - Executa frontend e backend em modo desenvolvimento
- `npm run client` - Executa apenas o frontend
- `npm run server` - Executa apenas o backend
- `npm run build` - Gera build de produção
- `npm start` - Executa o servidor em produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.