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

Já configurada em `index.html`, com a imagem `img/og-imagem.jpg` (sua foto + logo).
Ela só aparece depois que o site estiver publicado no domínio **bhelreis.com**.
Se você trocar o domínio, troque `https://bhelreis.com/` em `index.html`, `robots.txt` e `sitemap.xml`.

## Publicação (próxima etapa)

Vamos fazer juntas depois de fechar os textos:
1. Criar o repositório no GitHub e subir esta pasta.
2. Publicar (GitHub Pages ou Vercel, ambos gratuitos).
3. Apontar o domínio **bhelreis.com** da Hostinger para o site.
