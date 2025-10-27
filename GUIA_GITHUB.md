# 🚀 Como Subir o Projeto no GitHub

## Passo a Passo Completo

---

## **1️⃣ Preparar o Projeto**

### Criar arquivo `.gitignore`
Crie um arquivo na raiz do projeto chamado `.gitignore` (se já não existe):

```
# Dependências
node_modules/
npm-debug.log*

# Build
dist/
build/

# Ambiente
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

---

## **2️⃣ Criar Repositório no GitHub**

1. Acesse: https://github.com
2. Faça login na sua conta
3. Clique no botão **"+"** no canto superior direito
4. Selecione **"New repository"**
5. Preencha:
   - **Repository name**: `tech-news-site`
   - **Description**: "Plataforma web de notícias de tecnologia e inovação"
   - **Visibility**: Escolha Public ou Private
   - **NÃO marque** "Add a README file" (já temos arquivos)
6. Clique em **"Create repository"**

---

## **3️⃣ Inicializar Git no Projeto (Terminal)**

Abra o terminal na pasta do projeto e execute:

```bash
# 1. Inicializar repositório Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer commit inicial
git commit -m "Initial commit: TechInov Brasil - plataforma de notícias tech"

# 4. Renomear branch para 'main' (se necessário)
git branch -M main

# 5. Adicionar repositório remoto (SUBSTITUA 'seu-usuario' pelo seu username)
git remote add origin https://github.com/seu-usuario/tech-news-site.git

# 6. Enviar para o GitHub
git push -u origin main
```

---

## **4️⃣ Verificar Upload**

1. Acesse seu repositório: `https://github.com/seu-usuario/tech-news-site`
2. Verifique se todos os arquivos estão lá
3. Confira se o `.gitignore` está funcionando (não deve ter `node_modules/`)

---

## **5️⃣ Comandos Úteis do Git**

### **Ver status dos arquivos:**
```bash
git status
```

### **Adicionar arquivos específicos:**
```bash
git add arquivo.js
git add pasta/
```

### **Fazer commit:**
```bash
git commit -m "Descrição do que foi alterado"
```

### **Enviar para GitHub:**
```bash
git push origin main
```

### **Baixar atualizações:**
```bash
git pull origin main
```

### **Ver histórico de commits:**
```bash
git log
```

---

## **6️⃣ Adicionar README ao Projeto**

Crie um arquivo `README.md` na raiz (se não existir):

```markdown
# TechInov Brasil 🚀

Plataforma web moderna para consumo e exibição de notícias de tecnologia e inovação.

## 🎯 Funcionalidades

- 📰 Notícias de tecnologia em tempo real
- 🎵 Player de música integrado
- 📅 Eventos de tecnologia e inovação
- 📧 Sistema de contato

## 🛠️ Tecnologias

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **APIs**: RSS2JSON para notícias

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📄 Licença

MIT
```

---

## **7️⃣ Atualizar Projeto (Quando Fizer Alterações)**

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar arquivos modificados
git add .

# 3. Criar commit
git commit -m "Mensagem descrevendo as mudanças"

# 4. Enviar para GitHub
git push origin main
```

---

## **8️⃣ Dicas Importantes**

### ⚠️ **Nunca commite:**
- Arquivos `.env` com senhas/chaves
- `node_modules/` (muito pesado)
- Arquivos temporários

### ✅ **Sempre commit:**
- Código fonte (`.js`, `.jsx`, `.css`)
- Arquivos de configuração
- Documentação
- Imagens necessárias

### 🔒 **Segurança:**
Se acidentalmente commitar arquivos sensíveis:
```bash
# Criar novo .env sem informações sensíveis
git add .env
git commit -m "Add example env file"
```

---

## **9️⃣ Estrutura Recomendada no GitHub**

```
tech-news-site/
├── .gitignore
├── README.md
├── APRESENTACAO.md
├── package.json
├── src/
├── server/
└── public/
```

---

## **🔟 Comandos PowerShell (Windows)**

Se estiver usando PowerShell no Windows:

```powershell
# Todas as etapas acima funcionam igual
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/tech-news-site.git
git push -u origin main
```

---

## ❓ **Problemas Comuns**

### **Erro: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/seu-usuario/tech-news-site.git
```

### **Erro: "failed to push"**
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### **Esqueceu senha/username?**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

---

## 🎉 **Pronto!**

Seu projeto está no GitHub! 🚀

**Link do repositório**: `https://github.com/seu-usuario/tech-news-site`

