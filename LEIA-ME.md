# Site Bhel Reis · UGC creator

Site em HTML, CSS e JavaScript puros: sem framework e sem instalar nada.

## Onde fica cada coisa

| Arquivo | O que tem | Você edita? |
|---|---|---|
| `js/config.js` | WhatsApp e mensagem pronta, e-mail do botão "Mandar e-mail", vídeos de exemplo (deixe `false` antes de publicar), **liga/desliga das seções** | Sim |
| `js/dados.js` | Vídeos do YouTube por nicho, destaques, marcas, foto do Sobre, case e depoimentos | Sim |
| `index.html` | Textos fixos (capa, sobre, serviços, vantagens, perguntas) e SEO | Às vezes (textos) |
| `css/estilo.css` | O design aprovado | Não |
| `js/main.js` | O funcionamento (filtro, carrosséis, player, WhatsApp) | Não |
| `img/` | Fotos, logos, favicon, cursor, pattern e a imagem de prévia do link | Para adicionar fotos/logos |
| `_referencia/index-preview.html` | Cópia do preview original, só para consulta | Não |
| `TEXTOS-PENDENTES.md` | Lista do que falta escrever | — |

## Como ver o site no computador

Dê dois cliques no `index.html`. Ele abre no navegador.
(Os vídeos do YouTube funcionam melhor com o site publicado.)

## Como adicionar um vídeo do YouTube

1. Suba o vídeo no YouTube como **Short** ou **Não listado** (nunca "Privado").
2. Copie o link. O ID é o código depois de `shorts/` ou de `v=`:
   `https://youtube.com/shorts/AbC123xYz_0` → `AbC123xYz_0`
3. Em `js/dados.js`, na lista `VIDEOS`, escreva uma linha assim (o `nicho` pode ser `beleza`, `moda`, `lifestyle`, `criatividade`, `tech` ou `experiencias`):
   ```js
   { nicho: 'beleza', titulo: 'Rotina de skincare', marca: 'Nome da Marca', youtube: 'AbC123xYz_0' },
   ```
4. Salve. A capa do vídeo aparece no card e o player só carrega quando a pessoa clica.

O mesmo vale para `DESTAQUES` e para o `CASE` (campo `youtube`).

## Como esconder uma seção sem conteúdo

Em `js/config.js`, dentro de `mostrar`, troque `true` por `false`:

```js
mostrar: {
  marcas: false,        // esconde a faixa de marcas
  fotoSobre: true,
  destaques: true,
  caseDeSucesso: false, // esconde o case
  depoimentos: false,   // esconde os depoimentos
},
```
Se o case e os depoimentos estiverem `false`, a seção "Prova social" inteira some, junto com a faixa preta que vem antes dela.

## WhatsApp com mensagem pronta

Quando a marca clica em qualquer botão de WhatsApp do site, o WhatsApp abre já com esta mensagem escrita:

> Oi, Bhel, tudo bem? Vi seu portfólio, tenho muito interesse em fechar uma parceria contigo. Vamos conversar?

Ela só precisa apertar "enviar". Para trocar o texto ou o número, abra `js/config.js` e mude `whatsappMensagem` ou `whatsapp`.

## Prévia do link (WhatsApp e Instagram)

Configurada em `index.html`, com a imagem `img/og-imagem.jpg` (sua foto + logo),
apontando para **https://bhelreis.com/**.

## Domínio bhelreis.com

- O arquivo `CNAME` (com o texto `bhelreis.com`) diz ao GitHub qual é o domínio. Não apague.
- Na Hostinger (DNS do bhelreis.com) ficam: 4 registros **A** com nome `@` apontando para
  185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153,
  e 1 **CNAME** `www` apontando para `bhelreis.github.io`. Não mexa neles.
- O endereço antigo bhelreis.github.io continua funcionando e leva sozinho para bhelreis.com.

## Publicação

- Site no ar: **https://bhelreis.com/**
- Repositório: https://github.com/bhelreis/bhelreis.github.io (GitHub Pages, branch `main`)
- Para atualizar: salve as mudanças nesta pasta e rode, no terminal desta pasta:
  ```
  git add -A
  git commit -m "o que mudou"
  git push
  ```
  Em 1 ou 2 minutos o site atualiza. (Ou peça ao Claude: "publica de novo".)
- As anotações (`TEXTOS-*.md`, `PROMPT-CLAUDE-CODE.md`, `_referencia/`) não vão para o GitHub:
  estão no `.gitignore`.