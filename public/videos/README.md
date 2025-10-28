# Pasta de Vídeos

Esta pasta contém os vídeos de fundo para o site.

## Como adicionar um vídeo:

1. **Coloque seu arquivo de vídeo nesta pasta** (`public/videos/`)
2. **Renomeie o arquivo para** `background-video.mp4`
3. **Formatos suportados:**
   - MP4 (recomendado)
   - WebM (alternativa)

## Exemplo de estrutura:
```
public/
  videos/
    background-video.mp4  ← Seu vídeo aqui
    README.md
```

## Características recomendadas do vídeo:
- **Resolução:** 1920x1080 (Full HD) ou maior
- **Duração:** 10-30 segundos (será reproduzido em loop)
- **Tamanho:** Máximo 50MB para melhor performance
- **Formato:** MP4 com codec H.264
- **Sem áudio:** O vídeo será reproduzido sem som

## Como trocar o vídeo:
1. Substitua o arquivo `background-video.mp4` pelo seu vídeo
2. Mantenha o mesmo nome do arquivo
3. Faça o build da aplicação: `npm run build`
4. Reinicie o servidor: `npm start`

## Fallback:
Se o vídeo não carregar, será exibida uma imagem de fundo como alternativa.


