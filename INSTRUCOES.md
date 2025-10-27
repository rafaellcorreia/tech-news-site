# 🚀 Instruções para Executar o Tech News Site

## Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

## Passos para Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Projeto
```bash
npm run dev
```

Este comando irá:
- Iniciar o servidor backend na porta 3001
- Iniciar o frontend na porta 5173
- Abrir automaticamente o navegador em `http://localhost:5173`

### 3. Acessar o Site
- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:3001/api

## 📁 Estrutura do Projeto

```
tech-news-site/
├── server/                 # Backend Node.js
│   ├── index.js           # Servidor principal
│   └── routes/            # Rotas da API
│       ├── news.js        # API de notícias
│       └── events.js      # API de eventos
├── src/                   # Frontend React
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/            # Páginas do site
│   ├── api/              # Configurações de API
│   └── main.jsx          # Ponto de entrada
├── package.json          # Dependências e scripts
└── vite.config.js        # Configuração do Vite
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa frontend e backend simultaneamente
- `npm run client` - Executa apenas o frontend
- `npm run server` - Executa apenas o backend
- `npm run build` - Gera build de produção
- `npm start` - Executa servidor em produção

## 🌐 APIs Utilizadas

### Notícias (RSS Feeds)
- TechCrunch
- The Verge
- VentureBeat
- Wired
- Ars Technica

### Eventos (Exemplos)
- Web Summit 2024
- CES 2024
- Mobile World Congress 2024
- Google I/O 2024
- Apple WWDC 2024
- TechCrunch Disrupt 2024

## 🎨 Funcionalidades

### Página Home
- Exibe notícias de tecnologia em tempo real
- Botão para atualizar notícias
- Loading states e tratamento de erros
- Design responsivo

### Página Eventos
- Lista eventos de tecnologia
- Informações detalhadas (data, local, categoria)
- Botão para atualizar eventos
- Links para sites oficiais

### Página Contato
- Formulário de contato interativo
- Informações de contato
- Validação de campos
- Feedback visual

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Executar em Produção
```bash
npm start
```

## 🔍 Troubleshooting

### Porta já em uso
Se a porta 3001 estiver em uso, altere no arquivo `.env`:
```
PORT=3002
```

### Erro de CORS
O projeto já está configurado com CORS. Se houver problemas, verifique o arquivo `server/index.js`.

### Imagens não carregam
As imagens são carregadas de fontes externas. Se não carregarem, será exibido um placeholder.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se todas as dependências foram instaladas
2. Confirme se as portas 3001 e 5173 estão livres
3. Verifique o console do navegador para erros
4. Consulte o README.md para mais detalhes
