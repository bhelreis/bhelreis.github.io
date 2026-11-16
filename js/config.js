/* =========================================================
   CONFIGURAÇÕES DO SITE
   Este é o arquivo que você edita no dia a dia.
   Depois de mudar, salve e recarregue a página.
   ========================================================= */

const CONFIG = {

  /* ---------- WhatsApp ----------
     Só números: 55 (Brasil) + DDD + número.
     Todos os botões de WhatsApp do site usam este número. */
  whatsapp: '5511969792743',

  /* Mensagem que já aparece escrita quando a marca abre o WhatsApp.
     Pode trocar à vontade, só não apague as aspas do começo e do fim. */
  whatsappMensagem: 'Oi, Bhel, tudo bem? Vi seu portfólio, tenho muito interesse em fechar uma parceria contigo. Vamos conversar?',

  /* ---------- E-mail ----------
     Usado no botão "Mandar e-mail". O endereço não aparece escrito no site. */
  email: 'contatobhelreis@gmail.com',

  /* ---------- Vídeos de exemplo no portfólio ----------
     true  = nichos sem vídeo real mostram cards cinza de exemplo
             (só para você ver o desenho enquanto monta o site)
     false = só aparecem os nichos que têm vídeo real do YouTube
     ANTES DE PUBLICAR, deixe false. */
  mostrarVideosDeExemplo: false,

  /* ---------- Mostrar ou esconder seções ----------
     true  = aparece no site
     false = fica escondida (some do site, sem deixar buraco)
     Use false enquanto a seção ainda não tiver conteúdo real. */
  mostrar: {
    marcas:        true,   // faixa "Marcas que confiaram no meu trabalho"
    fotoSobre:     true,   // foto de bastidor no "Sobre mim"
    destaques:     false,  // "Os vídeos que mais renderam" (volta quando tiver resultado real)
    caseDeSucesso: false,  // case (desafio / ideia / resultado)
    depoimentos:   false,  // depoimentos de marcas
    // Se caseDeSucesso E depoimentos estiverem false, a seção
    // "Prova social" inteira some (junto com a faixa preta antes dela).
    // Quando voltar, ela aparece logo depois de "Como funciona".
  },
};
