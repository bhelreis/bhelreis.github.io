/* =========================================================
   Funcionamento do site. Você não precisa editar este arquivo:
   os dados ficam em js/config.js e js/dados.js.
   ========================================================= */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mostrar = (CONFIG && CONFIG.mostrar) || {};

  /* ---------- WhatsApp: um número só para todos os botões ---------- */
  const msgWpp = String(CONFIG.whatsappMensagem || '').trim();
  const linkWpp = 'https://wa.me/' + String(CONFIG.whatsapp).replace(/\D/g, '') +
    (msgWpp ? '?text=' + encodeURIComponent(msgWpp) : '');
  $$('[data-wpp]').forEach((a) => (a.href = linkWpp));

  /* ---------- E-mail: o endereço só existe no link, não aparece escrito ---------- */
  const email = String(CONFIG.email || '').trim();
  $$('[data-email]').forEach((a) => { if (email) a.href = 'mailto:' + email; else a.hidden = true; });

  /* ---------- Card de vídeo ----------
     Com ID do YouTube: mostra a capa e só carrega o player ao clicar.
     Sem ID: card de exemplo, igual ao preview. */
  const PLAY = '<span class="play"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M5 3l11 6-11 6z" fill="#34343B"/></svg></span>';
  const idValido = (id) => /^[\w-]{6,20}$/.test(String(id || '').trim());

  function cardVideo(v, tag = 'article') {
    const id = String(v.youtube || '').trim();
    const miolo = `<span class="tag">${esc(v.marca)}</span>${PLAY}<h4>${esc(v.titulo)}</h4><i class="cor" style="background:${esc(v.cor)}"></i>`;
    if (!idValido(id)) return `<${tag} class="video">${miolo}</${tag}>`;
    return `<${tag} class="video tem-capa" data-yt="${id}">${miolo}` +
      `<button class="abrir" type="button" aria-label="Assistir: ${esc(v.titulo)}${v.marca ? ' · ' + esc(v.marca) : ''}"></button></${tag}>`;
  }

  /* ---------- Tela grande do vídeo ----------
     Só abre quando a pessoa clica num vídeo. Fecha no X, no Esc ou clicando fora.
     Player maior = o YouTube manda uma qualidade melhor. */
  const tela = document.createElement('dialog');
  tela.className = 'tela';
  tela.innerHTML = '<button class="fechar" type="button">Fechar ✕</button><div class="quadro"></div>';
  document.body.append(tela);
  const quadro = $('.quadro', tela);
  let voltarFoco = null;

  document.addEventListener('click', (e) => {
    const bt = e.target.closest('.video .abrir');
    if (!bt) return;
    const id = bt.closest('.video').dataset.yt;
    const titulo = bt.getAttribute('aria-label') || 'Vídeo';
    voltarFoco = bt;
    tela.setAttribute('aria-label', titulo);
    quadro.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1" title="${esc(titulo)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    document.documentElement.classList.add('travado');
    tela.showModal();
  });
  $('.fechar', tela).addEventListener('click', () => tela.close());
  tela.addEventListener('click', (e) => { if (e.target === tela) tela.close(); });
  tela.addEventListener('close', () => {
    quadro.innerHTML = ''; // para o vídeo
    document.documentElement.classList.remove('travado');
    if (voltarFoco) voltarFoco.focus();
  });
  // Capa do vídeo: usa a melhor que o YouTube tiver.
  // 1º a capa vertical em alta (Shorts), depois as horizontais, da maior para a menor.
  // Se uma não existir (o YouTube manda uma imagem cinza de 120px), tenta a próxima.
  // Só carrega quando o card está perto de aparecer na tela, para o site ficar leve.
  const CAPAS = ['oardefault', 'maxresdefault', 'sddefault', 'hqdefault', 'hq2', 'hq1'];
  function carregarCapa(card) {
    const id = card.dataset.yt;
    const tentar = (n) => {
      if (n >= CAPAS.length) return;
      const img = new Image();
      img.onload = () => (img.naturalWidth <= 120 ? tentar(n + 1) : (card.style.backgroundImage = `url('${img.src}')`));
      img.onerror = () => tentar(n + 1);
      img.src = `https://i.ytimg.com/vi/${id}/${CAPAS[n]}.jpg`;
    };
    tentar(0);
  }
  function conferirCapas() {
    const cards = $$('.video.tem-capa');
    if (!('IntersectionObserver' in window)) return cards.forEach(carregarCapa);
    const obs = new IntersectionObserver((es) => es.forEach((x) => {
      if (x.isIntersecting) { carregarCapa(x.target); obs.unobserve(x.target); }
    }), { rootMargin: '400px' });
    cards.forEach((c) => obs.observe(c));
  }

  /* ---------- Marcas ---------- */
  const secMarcas = $('#marcas');
  if (mostrar.marcas === false) {
    secMarcas.hidden = true;
  } else {
    const lista = (typeof MARCAS !== 'undefined' && MARCAS.length) ? MARCAS : null;
    let itens;
    if (lista) {
      // repete as logos até encher a faixa, para o carrossel não ter buraco
      const base = [];
      while (base.length < 12) base.push(...lista);
      itens = base.map((m) => `<span class="bola tem-logo"><img src="${esc(m.logo)}" alt="${esc(m.nome)}" title="${esc(m.nome)}" width="78" height="78" loading="lazy"></span>`);
    } else {
      itens = Array(12).fill('<span class="bola">marca</span>');
    }
    // duas cópias seguidas = volta infinita sem emenda
    $('#marcasTrilho').innerHTML = itens.join('') + itens.join('');
  }

  /* ---------- Foto do "Sobre mim" ---------- */
  const foto = $('#fotoSobre');
  if (mostrar.fotoSobre === false) {
    foto.hidden = true;
  } else if (typeof FOTO_SOBRE !== 'undefined' && FOTO_SOBRE.arquivo) {
    foto.innerHTML = `<img src="${esc(FOTO_SOBRE.arquivo)}" alt="${esc(FOTO_SOBRE.descricao)}" loading="lazy">`;
  }

  /* ---------- Os vídeos que mais renderam ---------- */
  if (mostrar.destaques === false || !DESTAQUES.length) {
    $('#destaques').hidden = true;
  } else {
    $('#pDest').innerHTML = DESTAQUES.map((d) =>
      `<article class="dest">${cardVideo(d, 'div')}<div class="info"><span class="rot">${esc(d.rotulo)}</span><b>${esc(d.valor)}</b><p>${esc(d.texto)}</p></div></article>`
    ).join('');
  }

  /* ---------- Portfólio por nicho ----------
     Só entram vídeos com ID do YouTube. Nicho sem vídeo real não aparece
     (nem no filtro), a não ser no modo de exemplo do config.js. */
  const exemplos = CONFIG.mostrarVideosDeExemplo === true;
  const nichosNoSite = NICHOS.map((n) => {
    let vids = VIDEOS.filter((v) => v.nicho === n.id && idValido(v.youtube));
    if (!vids.length && exemplos) {
      vids = [1, 2, 3, 4, 5].map((i) => ({ titulo: `Vídeo ${String(i).padStart(2, '0')} · exemplo`, marca: 'Marca', youtube: '' }));
    }
    return { ...n, vids };
  }).filter((n) => n.vids.length);

  $('#filtros').innerHTML = nichosNoSite.length
    ? '<button aria-pressed="true" data-f="todos">Todos</button>' +
      nichosNoSite.map((n) => `<button aria-pressed="false" data-f="${n.id}"><i style="background:${n.cor}"></i>${esc(n.nome)}</button>`).join('')
    : '';
  $('#nichos').innerHTML = nichosNoSite.map((n) => {
    const cards = n.vids.map((v) => cardVideo({ ...v, cor: n.cor })).join('');
    return `<div class="nicho" data-nicho="${n.id}"><div class="topo-car"><div><h3>${esc(n.nome)}<small>${String(n.vids.length).padStart(2, '0')}</small></h3><p>${esc(n.desc)}</p></div>` +
      `<div class="setas" data-alvo="p-${n.id}"><button aria-label="Voltar">←</button><button aria-label="Avançar">→</button></div></div>` +
      `<div class="carrossel"><div class="pista" id="p-${n.id}">${cards}</div></div></div>`;
  }).join('');

  // filtro: mostra só o nicho escolhido (sem rolar a página)
  $$('.filtros button').forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.f;
    $$('.filtros button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    $$('.nicho').forEach((n) => {
      n.hidden = !(f === 'todos' || n.dataset.nicho === f);
      if (!n.hidden) { n.style.animation = 'none'; n.offsetHeight; n.style.animation = ''; }
    });  }));

  /* ---------- Prova social: case e depoimentos ---------- */
  const temCase = mostrar.caseDeSucesso !== false && typeof CASE !== 'undefined';
  const temDepos = mostrar.depoimentos !== false && typeof DEPOIMENTOS !== 'undefined' && DEPOIMENTOS.length;
  if (temCase) {
    $('#caseBox').innerHTML =
      cardVideo({ marca: CASE.marca && CASE.marca !== 'nome da marca' ? CASE.marca : 'Marca', titulo: CASE.tituloVideo, youtube: CASE.youtube, cor: CASE.cor }, 'div') +
      `<div><span class="rot">Case · ${esc(CASE.marca)}</span><h3>${esc(CASE.titulo)}</h3>` +
      `<div class="bloco"><b>O desafio</b><p>${esc(CASE.desafio)}</p></div>` +
      `<div class="bloco"><b>A ideia</b><p>${esc(CASE.ideia)}</p></div>` +
      `<div class="bloco"><b>O resultado</b><p>${esc(CASE.resultado)}</p></div></div>`;
  } else {
    $('#caseBox').hidden = true;
  }
  if (temDepos) {
    // a logo vem da lista MARCAS (pelo nome da marca); sem estrelas: ninguém deu nota
    const logoDa = (marca) => ((typeof MARCAS !== 'undefined' && MARCAS.find((m) => m.nome === marca)) || {}).logo;
    $('#depos').innerHTML = DEPOIMENTOS.map((d) => {
      const paragrafos = String(d.texto).split(/\n\s*\n/).map((p) => `<p>${esc(p.trim())}</p>`).join('');
      const assinatura = [d.nome, d.marca].filter(Boolean).map(esc).join(' · ');
      const logo = logoDa(d.marca);
      const fundo = d.cor ? ` style="background:${esc(d.cor)}"` : '';
      return `<figure class="depo rev"${fundo}><blockquote>${paragrafos}</blockquote>` +
        `<figcaption>${logo ? `<img class="depo-logo" src="${esc(logo)}" alt="" width="44" height="44" loading="lazy">` : ''}<cite>${assinatura}</cite></figcaption></figure>`;
    }).join('');
  } else {
    $('#depos').hidden = true;
  }
  if (!temCase && !temDepos) {
    $('#prova').hidden = true;
    $('#faixaProva').hidden = true;
  }

  /* ---------- Setas dos carrosséis ---------- */
  document.addEventListener('click', (e) => {
    const bt = e.target.closest('.setas button'); if (!bt) return;
    const pista = document.getElementById(bt.parentElement.dataset.alvo); if (!pista) return;
    const passo = (pista.firstElementChild?.getBoundingClientRect().width || 260) + 22;
    pista.scrollBy({ left: bt === bt.parentElement.firstElementChild ? -passo : passo, behavior: 'smooth' });
  });

  /* ---------- Menu do celular ---------- */
  const mb = $('#menuBtn'), nav = $('#nav');
  mb.addEventListener('click', () => { const o = nav.classList.toggle('aberto'); mb.setAttribute('aria-expanded', o); });
  $$('a', nav).forEach((a) => a.addEventListener('click', () => { nav.classList.remove('aberto'); mb.setAttribute('aria-expanded', 'false'); }));

  conferirCapas();

  /* ---------- Revelação suave ao rolar ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('ok'); io.unobserve(x.target); } }), { threshold: 0.12 })
    : null;
  $$('.rev').forEach((el) => (io ? io.observe(el) : el.classList.add('ok')));
})();
