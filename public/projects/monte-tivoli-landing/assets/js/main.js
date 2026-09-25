/* ============================================================
   MONTE TIVOLI — Landing page
   Produzido por Veryon Imóveis
   ============================================================ */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     CONFIG — ALTERE AQUI
     ══════════════════════════════════════════════════════
     WHATSAPP: número no formato internacional, só dígitos.
       55 = Brasil, 27 = DDD do ES, depois o número.
       Atual: +55 27 99944-3049 (Veryon Imóveis)
     ══════════════════════════════════════════════════════ */
  var CONFIG = {
    WHATSAPP: '5527999443049',
    EMPREENDIMENTO: 'Monte Tivoli',
    // Código do imóvel: vai no fim de TODA mensagem, para a assistente
    // do WhatsApp saber exatamente de qual unidade o lead está falando.
    // O Monte Tivoli é um anúncio só, então o código é sempre o mesmo.
    CODIGO_IMOVEL: 'AP0075',
    MSG_PADRAO: 'Olá! Vim pelo site do Monte Tivoli e quero mais informações.'
  };

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── monta o link do WhatsApp ───────────────────────── */
  function waLink(text) {
    var msg = (text || CONFIG.MSG_PADRAO).replace(/\s+$/, '') +
              '\n\nCódigo do imóvel: ' + CONFIG.CODIGO_IMOVEL;
    return 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(msg);
  }

  function openWa(text) {
    window.open(waLink(text), '_blank', 'noopener');
  }

  /* ══════════════════════════════════════════════════════
     1. SCROLL REVEAL — site inteiro
     ══════════════════════════════════════════════════════ */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    items.forEach(function (el) {
      var d = el.getAttribute('data-reveal-delay');
      if (d) el.style.setProperty('--rd', d);
    });

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ══════════════════════════════════════════════════════
     2. HEADER + MENU MOBILE
     ══════════════════════════════════════════════════════ */
  function initHeader() {
    var header = $('#header');
    var burger = $('#burger');
    var nav    = $('#nav');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!burger || !nav) return;

    var close = function () {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
    };

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    $$('a', nav).forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ══════════════════════════════════════════════════════
     3. BOTÃO FLUTUANTE DO WHATSAPP
     ══════════════════════════════════════════════════════ */
  function initWaFloat() {
    var fab = $('#wa-float');
    if (!fab) return;

    fab.href = waLink(fab.getAttribute('data-wa'));

    var show = function () {
      fab.classList.toggle('is-in', window.scrollY > 320);
    };
    show();
    window.addEventListener('scroll', show, { passive: true });
  }

  /* ══════════════════════════════════════════════════════
     4. CTAs COM MENSAGEM PRÓPRIA  (data-wa)
     ══════════════════════════════════════════════════════
     Cada CTA espalhado pela página abre o WhatsApp direto,
     já com uma mensagem de contexto (a seção de onde veio).
     Se a pessoa já mexeu no simulador, os números vão junto. */
  function initCtas() {
    $$('[data-wa]').forEach(function (el) {
      if (el.id === 'wa-float') return;

      var msg = el.getAttribute('data-wa');

      el.setAttribute('href', waLink(msg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');

      // no clique, reconstrói o link para anexar a simulação (se houver)
      el.addEventListener('click', function () {
        el.setAttribute('href', waLink(comSimulacao(msg)));
      });
    });
  }

  /* anexa a simulação à mensagem quando a pessoa já usou o simulador */
  function comSimulacao(msg) {
    if (!simTocado || !sim.parcela) return msg;
    return msg + '\n\n' + textoSimulacao();
  }

  /* ══════════════════════════════════════════════════════
     5. ABAS DAS PLANTAS
     ══════════════════════════════════════════════════════ */
  function initTabs() {
    var tabs = $$('.tab');
    if (!tabs.length) return;

    function activate(tab) {
      tabs.forEach(function (t) {
        var on   = t === tab;
        var pane = document.getElementById(t.getAttribute('aria-controls'));
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-selected', String(on));
        if (pane) {
          pane.hidden = !on;
          pane.classList.toggle('is-on', on);
        }
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
        if (n < 0 || n >= tabs.length) return;
        e.preventDefault();
        tabs[n].focus();
        activate(tabs[n]);
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     6. SIMULADOR — PLANO DIRETO COM A CONSTRUTORA
     ══════════════════════════════════════════════════════ */
  // Plano direto com a construtora: 40% do imóvel é pago até a entrega —
  // 8% fixo em reforços anuais mais 32% flexível, dividido entre entrada
  // (slider) e parcelas mensais. Os 60% restantes são financiados com o
  // banco e mostrados como valor único: projetar uma parcela bancária
  // exigiria inventar taxa e prazo. Reforço anual e parcela mensal
  // compartilham a linha do tempo (anos = meses ÷ 12).
  var ATE_ENTREGA_PCT = 0.40;
  var REFORCO_PCT     = 0.08;

  var sim = {
    preco: 511680, entradaPct: 10, meses: 36,
    entrada: 0, parcela: 0, reforco: 0, anos: 0, ateEntrega: 0, banco: 0
  };
  var simTocado = false;   // true assim que a pessoa mexe no simulador

  var brl = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', maximumFractionDigits: 0
  });

  function initSimulador() {
    var f = $('#sim-form');
    if (!f) return;

    var preco   = Number(f.getAttribute('data-price')) || 511680;
    var down    = $('#calc-down');
    var meses   = $('#calc-months');
    var el = {
      preco:      $('#calc-price'),
      downPct:    $('#calc-down-pct'),
      downOut:    $('#calc-down-out'),
      parcela:    $('#res-parcela'),
      entrada:    $('#res-entrada'),
      reforco:    $('#res-reforco'),
      ateEntrega: $('#res-ateentrega'),
      banco:      $('#res-banco'),
      hint:       $('#res-hint')
    };

    function calc() {
      var pct  = Number(down.value) / 100;
      var n    = Number(meses.value);
      var anos = n / 12;

      var entrada    = preco * pct;
      var reforcoTot = preco * REFORCO_PCT;
      var reforco    = reforcoTot / anos;
      var mensalTot  = preco * (ATE_ENTREGA_PCT - REFORCO_PCT) - entrada;
      var parcela    = mensalTot / n;
      var banco      = preco * (1 - ATE_ENTREGA_PCT);

      sim = {
        preco: preco, entradaPct: Number(down.value), meses: n, anos: anos,
        entrada: entrada, parcela: parcela, reforco: reforco,
        ateEntrega: preco * ATE_ENTREGA_PCT, banco: banco
      };

      el.preco.textContent      = brl.format(preco);
      el.downPct.textContent    = '(' + down.value + '%)';
      el.downOut.textContent    = brl.format(entrada);
      // na entrada máxima (32%) a parte flexível é quitada de uma vez e
      // não sobra parcela: "R$ 0" em destaque pareceria erro
      el.parcela.textContent    = parcela > 0 ? brl.format(parcela) : 'Sem parcelas';
      if (el.hint) {
        el.hint.textContent = parcela > 0
          ? n + 'x — junto com o reforço anual, compõe os 40% pagos até a entrega.'
          : 'Com 32% de entrada a parte mensal é quitada de uma vez; resta só o reforço anual.';
      }
      el.entrada.textContent    = brl.format(entrada);
      el.reforco.textContent    = anos + 'x de ' + brl.format(reforco);
      el.ateEntrega.textContent = brl.format(preco * ATE_ENTREGA_PCT);
      el.banco.textContent      = brl.format(banco);

      paintRange(down);
    }

    function paintRange(r) {
      var p = (r.value - r.min) / (r.max - r.min) * 100;
      // backgroundImage, não o atalho `background`: o atalho zeraria o
      // background-clip:content-box que mantém a trilha fina no celular
      r.style.backgroundImage =
        'linear-gradient(90deg, var(--terra) 0%, var(--terra) ' + p + '%, rgba(228,211,164,.25) ' + p + '%)';
    }

    f.addEventListener('input',  function () { simTocado = true; calc(); });
    f.addEventListener('change', function () { simTocado = true; calc(); });
    f.addEventListener('submit', function (e) { e.preventDefault(); });
    calc();
  }

  /* texto da simulação usado nas mensagens de WhatsApp */
  function textoSimulacao() {
    return [
      'Simulação que montei no site:',
      '• Valor do imóvel: ' + brl.format(sim.preco),
      '• Entrada: ' + brl.format(sim.entrada) + ' (' + sim.entradaPct + '%)',
      '• Parcela mensal: ' + sim.meses + 'x de ' + brl.format(sim.parcela),
      '• Reforço anual: ' + sim.anos + 'x de ' + brl.format(sim.reforco),
      '• Pago até a entrega (40%): ' + brl.format(sim.ateEntrega),
      '• Financiado com o banco (60%): ' + brl.format(sim.banco)
    ].join('\n');
  }

  /* ══════════════════════════════════════════════════════
     7. FORMULÁRIOS → WHATSAPP
     ══════════════════════════════════════════════════════ */
  function required(input) {
    var ok = input.value.trim().length >= 2;
    input.classList.toggle('is-error', !ok);
    if (!ok) { input.focus(); }
    return ok;
  }

  /* 7a. formulário logo abaixo do simulador — usa os resultados */
  function initFormSimulacao() {
    var form = $('#form-simulacao');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome  = $('#sim-nome');
      var renda = $('#sim-renda');
      if (!required(nome)) return;

      var linhas = [
        'Olá! Meu nome é ' + nome.value.trim() + ' e vim pelo site do ' + CONFIG.EMPREENDIMENTO + '.',
        'Gostaria de saber se minha renda é compatível com o financiamento.',
        '',
        textoSimulacao()
      ];

      if (renda) linhas.push('', 'Renda familiar aproximada: ' + renda.value + '.');

      openWa(linhas.join('\n'));
    });
  }

  /* 7b. formulário final da página */
  function initFormContato() {
    var form = $('#form-contato');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = $('#ct-nome');
      if (!required(nome)) return;

      var interesse = $('#ct-interesse');
      var momento   = $('#ct-momento');
      var msg       = $('#ct-msg');

      var linhas = [
        'Olá! Meu nome é ' + nome.value.trim() + '.',
        'Vim pelo site do ' + CONFIG.EMPREENDIMENTO + ' (Cocal, Vila Velha) e quero mais informações.',
        ''
      ];

      if (interesse) linhas.push('• Interesse: ' + interesse.value);
      if (momento)   linhas.push('• Momento: ' + momento.value);
      if (msg && msg.value.trim()) linhas.push('', msg.value.trim());

      // se a pessoa mexeu no simulador, leva os números junto
      if (simTocado && sim.parcela > 0) {
        linhas.push('', textoSimulacao());
      }

      openWa(linhas.join('\n'));
    });

    // limpa o estado de erro ao digitar
    $$('input, textarea', form).forEach(function (i) {
      i.addEventListener('input', function () { i.classList.remove('is-error'); });
    });
  }

  /* ══════════════════════════════════════════════════════
     8. PARALLAX SUAVE NA SEÇÃO DA FACHADA
     ══════════════════════════════════════════════════════ */
  function initParallax() {
    var sec = $('.parallax');
    if (!sec) return;
    var img = $('img', sec);
    if (!img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 901) return;

    var ticking = false;
    function update() {
      var r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) { ticking = false; return; }
      var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.transform = 'translateY(' + (p * -8).toFixed(2) + '%)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════════════════
     8b. VÍDEO — fachada de player
     ══════════════════════════════════════════════════════
     A página mostra só a capa (servida daqui). O iframe do
     YouTube só entra no clique: quem não aperta o play não
     paga o peso nem os cookies do player.
     youtube-nocookie + rel=0 para não sugerir vídeos de
     terceiros no fim. */
  function initVideo() {
    var btn = $('.video-play');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-video');
      if (!id) return;

      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id +
                  '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      frame.title = 'Vídeo de apresentação do Monte Tivoli';
      frame.allow = 'accelerometer; autoplay; clipboard-write; ' +
                    'encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;

      btn.replaceWith(frame);
      frame.focus();
    });
  }

  /* ══════════════════════════════════════════════════════
     9. MAPA ARRASTÁVEL (mobile)
     ══════════════════════════════════════════════════════
     O mapa é largo demais para caber legível num celular, então
     rola na horizontal. Sem sinalização ele parece uma imagem
     cortada — daí o selo "arraste" e o degradê na borda:
       · o selo some no primeiro arraste
       · o degradê some ao chegar no fim */
  function initMapa() {
    var wrap = $('.mapa-wrap');
    var box  = $('#mapa');
    if (!wrap || !box) return;

    function update() {
      if (box.scrollLeft > 4) wrap.classList.add('is-scrolled');
      var fim = box.scrollLeft + box.clientWidth >= box.scrollWidth - 4;
      wrap.classList.toggle('is-end', fim);
    }

    box.addEventListener('scroll', update, { passive: true });

    // se não há o que rolar (telas largas), nada de selo nem degradê
    function medir() {
      var rola = box.scrollWidth > box.clientWidth + 4;
      wrap.classList.toggle('is-scrolled', !rola);
      wrap.classList.toggle('is-end', !rola);
      if (rola) update();
    }
    window.addEventListener('resize', medir);
    var img = $('img', box);
    if (img && !img.complete) img.addEventListener('load', medir);
    medir();
  }

  /* ══════════════════════════════════════════════════════
     10. MISC
     ══════════════════════════════════════════════════════ */
  function initMisc() {
    var ano = $('#ano');
    if (ano) ano.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════════════════════
     BOOT
     ══════════════════════════════════════════════════════ */
  function boot() {
    initHeader();
    initReveal();
    initWaFloat();
    initCtas();
    initTabs();
    initSimulador();
    initFormSimulacao();
    initFormContato();
    initParallax();
    initVideo();
    initMapa();
    initMisc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
