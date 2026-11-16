/* =========================================================
   CONTEÚDO DO SITE: vídeos, destaques, marcas, case e depoimentos
   ---------------------------------------------------------
   COMO PEGAR O ID DE UM VÍDEO DO YOUTUBE
   É o código que vem depois de "shorts/" ou de "v=" no link:
     https://youtube.com/shorts/AbC123xYz_0      → 'AbC123xYz_0'
     https://www.youtube.com/watch?v=AbC123xYz_0 → 'AbC123xYz_0'

   Dica: o vídeo pode ser "Não listado" no YouTube. Só NÃO pode
   ser "Privado", senão ele não toca no site.
   ========================================================= */


/* ---------- Nichos do portfólio ----------
   Não mude o "id". Nome, cor e descrição aparecem no site.
   O filtro só mostra os nichos que têm pelo menos 1 vídeo real. */
const NICHOS = [
  { id: 'beleza',       nome: 'Beleza & autocuidado',  cor: 'var(--rosa)',    desc: 'skincare, make, cabelo, body care e perfumaria' },
  { id: 'moda',         nome: 'Moda & acessórios',     cor: 'var(--amarelo)', desc: 'roupas, bolsas, calçados e o look do dia' },
  { id: 'lifestyle',    nome: 'Lifestyle & bem-estar', cor: 'var(--verde)',   desc: 'casa, rotina, alimentação, saúde e movimento' },
  { id: 'criatividade', nome: 'Criatividade',          cor: 'var(--pessego)', desc: 'design, artesanato, papelaria, cerâmica e decoração' },
  { id: 'tech',         nome: 'Tech',                  cor: 'var(--azul)',    desc: 'apps, inteligência artificial e serviços que entram na rotina' },
  { id: 'experiencias', nome: 'Experiências',          cor: 'var(--linha)',   desc: 'lugares, eventos, tour de lojas e serviços para viver de perto' },
];


/* ---------- Vídeos do portfólio ----------
   Cada vídeo: nicho (o "id" lá de cima), título, marca e o ID do YouTube.
   Para adicionar: copie a linha de exemplo, tire as duas barras // do
   começo e troque os dados. Pode colocar quantos quiser, em qualquer ordem.
   Trabalho autoral, sem marca? Escreva marca: 'Autoral'.
   O número ao lado do nome do nicho (ex.: "05") é contado sozinho. */
const VIDEOS = [

  // { nicho: 'beleza', titulo: 'Rotina de skincare', marca: 'Nome da Marca', youtube: 'AbC123xYz_0' },

  // ===== BELEZA & AUTOCUIDADO =====
  { nicho: 'beleza', titulo: 'Biografia Assinatura',      marca: 'Natura',     youtube: 'g99Sa2nNvuw' },
  { nicho: 'beleza', titulo: 'Desodorante',               marca: 'Herbíssimo', youtube: 'XCKvz6t6vbM' },
  { nicho: 'beleza', titulo: 'Bond Repair+ Peptídeo',     marca: 'Dove',       youtube: 'Diu6ibpl98c' },
  { nicho: 'beleza', titulo: 'Delineador Color Trend',    marca: 'Avon',       youtube: 'O7KKMoJJdh0' },

  // ===== MODA & ACESSÓRIOS =====
  { nicho: 'moda', titulo: 'Blusa Hana',                  marca: 'Aori Form',  youtube: 'jTc_OP27FPU' },
  { nicho: 'moda', titulo: 'Óculos',                      marca: 'Zortele',    youtube: 'qTfGlN0M1bA' },

  // ===== LIFESTYLE & BEM-ESTAR =====
  { nicho: 'lifestyle', titulo: 'Garrafa de água',        marca: 'Hilee',      youtube: 'a5x3c7Ui1GY' },

  // ===== CRIATIVIDADE =====
  { nicho: 'criatividade', titulo: 'Diário da grávida',   marca: 'Caprichos de Maria', youtube: '9fzk5cXgEhU' },

  // ===== TECH =====
  // (ainda sem vídeos: o nicho fica escondido)

  // ===== EXPERIÊNCIAS =====
  { nicho: 'experiencias', titulo: 'Experiência de tia',  marca: 'Behap',      youtube: 'StnwwOGpzJE' },

];

/* ---------- "Os vídeos que mais renderam" ----------
   rotulo = etiqueta pequena (ex.: Visualizações)
   valor  = o número grande (ex.: 120 mil). Só números reais!
   texto  = uma frase sobre o resultado
   cor    = a faixinha embaixo do vídeo */
const DESTAQUES = [
  { titulo: 'Título do vídeo', marca: 'Marca', youtube: '', cor: 'var(--rosa)',
    rotulo: 'Visualizações', valor: '00 mil',   texto: 'O que esse vídeo trouxe para a marca, em uma frase.' },
  { titulo: 'Título do vídeo', marca: 'Marca', youtube: '', cor: 'var(--azul)',
    rotulo: 'Roteiro',       valor: 'Aprovado', texto: 'De primeira, sem ajustes.' },
  { titulo: 'Título do vídeo', marca: 'Marca', youtube: '', cor: 'var(--verde)',
    rotulo: 'Feedback',      valor: '“…”',      texto: 'Frase real que a marca te mandou.' },
];


/* ---------- Marcas (carrossel infinito) ----------
   Coloque o arquivo da logo na pasta img/marcas/ e escreva aqui.
   A logo ocupa o círculo inteiro, então use uma imagem quadrada
   (pequena: 240 x 240 px basta). A ordem aqui é a ordem do carrossel.
   Exemplo: { nome: 'Nome da Marca', logo: 'img/marcas/nome-da-marca.png' },
   Enquanto a lista estiver vazia, aparecem os círculos "marca" de exemplo. */
const MARCAS = [
  { nome: 'Natura',             logo: 'img/marcas/natura.jpg' },
  { nome: 'Avon',               logo: 'img/marcas/avon.jpg' },
  { nome: 'Dove',               logo: 'img/marcas/dove.jpg' },
  { nome: 'Herbíssimo',         logo: 'img/marcas/herbissimo.jpg' },
  { nome: 'Aori Form',          logo: 'img/marcas/aori-form.jpg' },
  { nome: 'Zortele',            logo: 'img/marcas/zortele.jpg' },
  { nome: 'Hilee',              logo: 'img/marcas/hilee.jpg' },
  { nome: 'Caprichos de Maria', logo: 'img/marcas/caprichos-de-maria.jpg' },
  { nome: 'Behap',              logo: 'img/marcas/behap.jpg' },
];


/* ---------- Foto de bastidor do "Sobre mim" ----------
   Coloque a foto na pasta img/ e escreva o caminho.
   Exemplo: 'img/bastidor.jpg'
   Vazio ('') = mostra o espaço reservado "sua foto de bastidor". */
const FOTO_SOBRE = {
  arquivo: 'img/bastidor.jpg',
  descricao: 'Bhel Reis fotografando o próprio reflexo no espelho, com a câmera na mão',
};


/* ---------- Case de sucesso ---------- */
const CASE = {
  marca: 'nome da marca',
  titulo: 'Título do case',
  youtube: '',
  tituloVideo: 'Vídeo do case',
  cor: 'var(--amarelo)',
  desafio:   'O que a marca precisava.',
  ideia:     'O que você propôs e por quê.',
  resultado: 'O que aconteceu: views, vendas, aprovação.',
};


/* ---------- Depoimentos ----------
   Só depoimentos reais, com autorização da marca.
   texto = a mensagem. Para quebrar em parágrafos, use \n\n no meio.
   nome  = nome da pessoa ('' = aparece só a marca).
   marca = escreva igual ao nome da lista MARCAS: a logo aparece sozinha.
   cor   = (opcional) cor de fundo do card, ex.: 'var(--rosa)'. Sem cor = cor padrão.
   assinatura = (opcional) texto exato embaixo do depoimento, ex.: 'Time Herbíssimo'.
   Para adicionar mais: copie o bloco { ... }, inteiro, com a vírgula. */
const DEPOIMENTOS = [
  {
    texto: 'Acabei de ver! Ficou muito lindo!',
    nome: '',
    marca: 'Caprichos de Maria',
    cor: 'var(--rosa)', // mesma cor do card 06 (Pagamento) de "Como funciona"
  },
  {
    texto: 'Eu amei em um geral mesmo! Gostei muito que você destacou o foco da marca, acho isso bem legal para as pessoas saberem a essência que quero levar.' +
           '\n\nGostei muito de você ter dado mais de uma opção para a peça, achei sensacional porque as pessoas se limitam muito.' +
           '\n\nGosto do filtro que usou do vídeo também.',
    nome: '',
    marca: 'Aori Form',
  },
  {
    texto: 'A gente viu o conteúdo que você fez, Bhel, e ficou bonito e natural, daquele jeito que só quem usa de verdade consegue mostrar, com muito carinho pela marca.',
    nome: '',
    marca: 'Herbíssimo',
    assinatura: 'Time Herbíssimo',
  },
];
