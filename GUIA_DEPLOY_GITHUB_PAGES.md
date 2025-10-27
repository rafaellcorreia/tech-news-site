# 🚀 Como Publicar o Projeto no GitHub Pages

## ✅ Configuração Automatizada

O projeto já está configurado para deploy automático no GitHub Pages!

---

## 📋 Passos para Ativar

### **1. Ative o GitHub Pages no Repositório**

1. Acesse: https://github.com/rafaellcorreia/tech-news-site
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione: **"GitHub Actions"**
5. Aguarde alguns segundos
6. A configuração foi salva automaticamente!

---

### **2. Primeiro Deploy**

1. Vá para a aba **Actions** no seu repositório
2. Você verá um workflow chamado "Deploy to GitHub Pages"
3. Aguarde ele completar (primeira vez pode levar 5-10 minutos)
4. Quando completar, você verá uma mensagem verde: ✅

---

### **3. Acesse Seu Site**

Depois do deploy, seu site estará disponível em:

```
https://rafaellcorreia.github.io/tech-news-site/
```

---

## ⚠️ IMPORTANTE - Limitações

### ⚠️ **O backend Node.js NÃO funciona no GitHub Pages**

GitHub Pages serve apenas arquivos **estáticos** (HTML, CSS, JavaScript).

Isso significa:
- ❌ APIs de notícias não funcionarão
- ❌ Sistema de contatos não funcionará
- ✅ Interface visual funcionará
- ✅ Navegação entre páginas funcionará
- ✅ Design e layout funcionarão

---

## 🎯 Soluções para Backend

### **Opção 1: Usar Frontend Apenas (Para Apresentação)**
- O site mostrará a interface
- Sem funcionalidades de API
- Ideal para apresentar o design

### **Opção 2: Deploy Completo em Outras Plataformas**

#### **🚀 Vercel** (Recomendado - Gratuito)
```bash
npm install -g vercel
cd c:\tech-news-site
vercel
```
- Suporta frontend E backend
- Deploy automático
- URL grátis: `seu-projeto.vercel.app`

#### **☁️ Railway** (Recomendado - Gratuito)
1. Acesse: https://railway.app
2. Conecte com GitHub
3. Selecione o repositório
4. Deploy automático!
- Suporta Node.js completo

#### **🌐 Netlify** (Gratuito)
1. Acesse: https://netlify.com
2. Conecte com GitHub
3. Deploy automático

---

## 📊 Status do Deploy

Você pode acompanhar o progresso em:
**Actions → Deploy to GitHub Pages**

Verde = Sucesso ✅
Amarelo = Em andamento ⏳
Vermelho = Erro ❌

---

## 🔄 Deploy Automático

A partir de agora, **TODA VEZ** que você fizer um push:

```bash
git add .
git commit -m "Descrição"
git push origin main
```

O GitHub **AUTOMATICAMENTE** fará um novo deploy em 2-5 minutos!

---

## 🌐 URLs do Projeto

| Tipo | URL |
|------|-----|
| **Repositório** | https://github.com/rafaellcorreia/tech-news-site |
| **Site (GitHub Pages)** | https://rafaellcorreia.github.io/tech-news-site/ |

---

## 💡 Dica para Apresentação

Para apresentar em sala, você tem 2 opções:

1. **Mostrar o código no GitHub** + **Fazer demo local**:
   ```bash
   npm run dev
   # Acesse: http://localhost:5173
   ```

2. **Mostrar o site no GitHub Pages** (interface visual)
   + Explicar que backend precisa de outra hospedagem

---

## ✅ Checklist

- [x] Repositório criado no GitHub
- [x] Código enviado
- [x] GitHub Actions configurado
- [ ] GitHub Pages ativado (você precisa fazer)
- [ ] Primeiro deploy completado (aguarde)
- [ ] Site acessível na URL

---

## 🆘 Problemas?

### Deploy falha?
- Verifique a aba **Actions** para ver erros
- Confirme que selecionou "GitHub Actions" como fonte

### Site não carrega?
- Aguarde 2-5 minutos após o deploy
- Limpe o cache do navegador (Ctrl + F5)

### Precisa de ajuda?
- Veja os logs em **Actions**
- Verifique se `vite.config.js` tem `base: '/tech-news-site/'`

