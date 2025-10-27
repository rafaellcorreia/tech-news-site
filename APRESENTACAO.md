# TechInov Brasil - Apresentação do Projeto

## 📋 Visão Geral
**TechInov Brasil** é uma plataforma web moderna para consumo e exibição de notícias de tecnologia e inovação, com foco no Brasil e no mundo.

---

## 🎯 Principais Funcionalidades

### 1. **Sistema de Notícias em Tempo Real**
- **Busca automática** de notícias de múltiplas fontes RSS
- **Filtragem inteligente** que prioriza conteúdo tech brasileiro
- **Cache de 15 minutos** para otimizar performance
- **Atualização manual** através do botão "Atualizar"

### 2. **Player de Música Integrado**
- Reprodução de músicas eletrônicas
- Controles: Play/Pause, Anterior, Próxima
- Controle de volume
- Playlist colapsável para economizar espaço

### 3. **Sistema de Eventos**
- Listagem de eventos de tecnologia e inovação
- Eventos brasileiros e internacionais
- Informações detalhadas (data, local, categoria)

### 4. **Página de Contato**
- Formulário de contato funcional
- Validação de email
- Armazenamento em arquivo JSON

### 5. **Interface Responsiva**
- Design moderno e responsivo
- Video background animado
- Navegação suave entre páginas

---

## 🏗️ Arquitetura do Projeto

### **Frontend (React + Vite)**
```
src/
├── components/      # Componentes reutilizáveis
│   ├── Navbar.jsx
│   ├── NewsCard.jsx
│   ├── EventCard.jsx
│   ├── MusicPlayer.jsx
│   └── VideoBackground.jsx
├── pages/           # Páginas da aplicação
│   ├── Home.jsx     # Notícias
│   ├── Eventos.jsx  # Eventos
│   └── Contato.jsx  # Formulário
└── contexts/        # Contextos (i18n)
    └── LanguageContext.jsx
```

### **Backend (Node.js + Express)**
```
server/
├── routes/
│   ├── news.js      # API de notícias
│   ├── events.js    # API de eventos
│   └── contacts.js  # API de contatos
└── data/
    └── contacts.json # Armazenamento
```

---

## 🔌 Como Funciona a API

### **1. API de Notícias** (`/api/news`)

#### **Funcionamento:**
1. **Busca RSS**: Conecta-se a múltiplas fontes de notícias via `rss2json.com`
2. **Filtragem Inteligente**: 
   - Remove duplicatas por URL
   - Filtra apenas conteúdo de tecnologia
   - Exclui palavras-chave não-tech (política, esportes, etc.)
   - Prioriza fontes brasileiras
3. **Cache**: Armazena resultados por 15 minutos
4. **Ordenação**: Organiza por data (mais recentes primeiro)

#### **Endpoints:**
- `GET /api/news` - Busca notícias (usando cache)
- `GET /api/news/refresh` - Força atualização do cache

#### **Exemplo de Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "title": "Título da notícia",
      "description": "Descrição...",
      "link": "https://...",
      "pubDate": "2025-01-20",
      "thumbnail": "imagem.jpg"
    }
  ],
  "cached": false
}
```

### **2. API de Eventos** (`/api/events`)

#### **Funcionamento:**
1. **Dados Estáticos**: Retorna lista pré-configurada de eventos
2. **Formatação**: Adiciona data formatada e flag "isUpcoming"
3. **Cache**: Armazena por 30 minutos

#### **Endpoints:**
- `GET /api/events` - Lista eventos

### **3. API de Contatos** (`/api/contacts`)

#### **Funcionamento:**
1. **Validação**: Verifica campos obrigatórios e formato de email
2. **Armazenamento**: Salva em arquivo JSON local
3. **Operações CRUD**: Criar, listar, atualizar, deletar contatos

#### **Endpoints:**
- `POST /api/contacts` - Salvar novo contato
- `GET /api/contacts` - Listar todos
- `GET /api/contacts/:id` - Buscar por ID
- `PUT /api/contacts/:id/status` - Murar status
- `DELETE /api/contacts/:id` - Remover

---

## 🛠️ Tecnologias Utilizadas

### **Frontend:**
- ⚛️ **React 18** - Biblioteca UI
- ⚡ **Vite** - Build tool
- 🎨 **CSS3** - Estilização
- 🧭 **React Router** - Navegação
- 🌐 **Axios** - Requisições HTTP

### **Backend:**
- 🟢 **Node.js** - Runtime
- 🚀 **Express** - Framework web
- 📡 **Axios** - Cliente HTTP
- 🔄 **RSS2JSON** - Conversor RSS
- 📦 **CORS** - Controle de acesso

---

## 🚀 Como Executar

### **Instalação:**
```bash
npm install
```

### **Desenvolvimento:**
```bash
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

### **Produção:**
```bash
npm run build  # Compila frontend
npm start      # Inicia servidor
```

---

## 📊 Filtros de Notícias

### **Palavras-chave Incluídas:**
- Tecnologia, AI, Blockchain, Cloud
- Startups, Fintech, Edtech
- Programação, Software, Hardware
- Eventos tech: Google I/O, WWDC

### **Palavras-chave Excluídas:**
- Política, Governo
- Esportes
- Entretenimento (fora de tech)
- Saúde (não tech)
- Economia geral

### **Resultado:**
- **50 notícias** recebidas
- **~30 notícias** após filtro rigoroso
- **Apenas conteúdo tech relevante**

---

## 🎨 Destaques de Design

1. **Video Background**: Fundo animado com fallback
2. **Gradientes**: Títulos com efeitos visuais
3. **Cards Interativos**: Hover effects
4. **Responsivo**: Adapta-se a diferentes telas
5. **UX Moderno**: Interface limpa e intuitiva

---

## 📈 Melhorias Futuras

- [ ] Sistema de favoritos
- [ ] Compartilhamento social
- [ ] Modo escuro/claro
- [ ] Newsletter por email
- [ ] Integração com mais APIs
- [ ] Busca e categorização avançada

---

## 👨‍💻 Autores
**TechInov Brasil** - Plataforma de Tecnologia e Inovação

---

## 📝 Conclusão

Este projeto demonstra integração entre **Frontend moderno (React)** e **Backend robusto (Node.js)**, com APIs inteligentes que filtram e organizam conteúdo de tecnologia em tempo real, proporcionando uma experiência completa aos usuários interessados em tecnologia e inovação.

