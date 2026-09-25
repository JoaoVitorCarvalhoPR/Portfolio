// ---------------------------------------------------------------------------
// WhatsApp number for all CTAs on the page.
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = "5527999443049";

// Property codes so the WhatsApp AI assistant (Vera) knows exactly which
// unit a lead is asking about, since Vivenda Coqueiral isn't yet in the
// scraped listings table her other flows resolve codes from. One code per
// unit type (they're different apartments, not the same listing) — pass
// the matching one to buildWhatsappLink, or omit it entirely when the
// button/form has no specific-unit reference (generic WhatsApp CTAs).
const PROPERTY_CODE_BY_UNITS = {
  "2 quartos": "AP0109",
  "3 quartos": "AP0111",
};

function buildWhatsappLink(message, propertyCode) {
  const fullMessage = propertyCode
    ? `${message.trimEnd()}\n\nCódigo do imóvel: ${propertyCode}`
    : message.trimEnd();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
}

// Meta Pixel event helper — guarded in case an ad blocker stripped fbq,
// so a blocked pixel never breaks the actual WhatsApp handoff.
function trackMetaEvent(eventName) {
  if (typeof fbq === "function") fbq("track", eventName);
}

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileNav.classList.remove("open"))
    );
  }

  // Tabs (floor plans + financing) — scoped per section so the two tab
  // groups on the page don't clear each other's active state.
  document.querySelectorAll(".plan-tabs").forEach((tabGroup) => {
    const scope = tabGroup.closest("section");
    const tabs = scope.querySelectorAll(".plan-tab");
    const panels = scope.querySelectorAll(".plan-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const targetId = tab.dataset.plan || tab.dataset.finance;
        document.getElementById(targetId).classList.add("active");
      });
    });
  });

  // Map plan id ("p1".."p4") -> human label, sourced from the existing
  // .plan-tab buttons so the two stay in sync automatically.
  const planLabels = {};
  document.querySelectorAll("#plantas .plan-tab[data-plan]").forEach((tab) => {
    planLabels[tab.dataset.plan] = tab.textContent.trim().replace(/\s+/g, " ");
  });

  // Which unit-type category ("2 quartos"/"3 quartos") each floorplan
  // belongs to, so a specific-plan click resolves to the right property
  // code even though the lead form's own dropdown is coarser (2Q/3Q/Ainda
  // não sei) than the 4 individual floorplans.
  const PLAN_UNITS = { p1: "3 quartos", p2: "2 quartos", p3: "2 quartos", p4: "2 quartos" };

  // Floor plan CTA -> remember which plan was clicked, so the lead form
  // (further down the page) can attach it on submit.
  const planInterestInput = document.getElementById("planInterest");
  document.querySelectorAll(".plan-panel .btn[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (planInterestInput) planInterestInput.value = btn.dataset.plan;
    });
  });

  // Financing calculator. 40% of the price is paid before delivery
  // (BEFORE_DELIVERY_PCT): a fixed 8% annual reinforcement (ANNUAL_PCT)
  // plus a 32% "flexible" bucket split between the down payment (customer
  // slider, 0-32% of price) and the monthly installment (whatever's left
  // of that 32%). The remaining 60% is bank-financed — shown as a flat
  // figure, never broken into a projected monthly payment, since that
  // would require inventing a rate/term. The annual reinforcement shares
  // its timeline with the monthly installments (years = months / 12), so
  // there's no separate "years" control. Property prices live on each
  // .calc element's data-price in index.html.
  const BEFORE_DELIVERY_PCT = 0.40;
  const ANNUAL_PCT = 0.08;
  const currencyFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  // Paints the slider's filled portion by percent-of-range, so it reaches
  // exactly to both edges — the native accent-color fill tracks the thumb's
  // center, which always leaves a visible gap at the max end.
  function paintSliderFill(slider) {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const pct = ((Number(slider.value) - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--teal) ${pct}%, var(--cream) ${pct}%)`;
  }

  document.querySelectorAll(".calc").forEach((calc) => {
    const price = Number(calc.dataset.price);
    const priceOut = calc.querySelector(".calc-price-out");
    const downSlider = calc.querySelector(".calc-down-slider");
    const downPctOut = calc.querySelector(".calc-down-pct-out");
    const downOut = calc.querySelector(".calc-down-out");
    const installmentsSelect = calc.querySelector(".calc-installments");
    const installmentOut = calc.querySelector(".calc-installment-out");
    const annualOut = calc.querySelector(".calc-annual-out");
    const bankOut = calc.querySelector(".calc-bank-out");

    function update() {
      paintSliderFill(downSlider);
      const downPct = Number(downSlider.value) / 100;
      const n = Number(installmentsSelect.value);
      const years = n / 12;

      const downValue = price * downPct;
      const annualTotal = price * ANNUAL_PCT;
      const annualValue = annualTotal / years;
      const monthlyTotal = price * (BEFORE_DELIVERY_PCT - ANNUAL_PCT) - downValue;
      const installmentValue = monthlyTotal / n;
      const bankValue = price * (1 - BEFORE_DELIVERY_PCT);

      priceOut.textContent = currencyFmt.format(price);
      downPctOut.textContent = `${downSlider.value}%`;
      downOut.textContent = currencyFmt.format(downValue);
      annualOut.textContent = `${years}x de ${currencyFmt.format(annualValue)}`;
      installmentOut.textContent = `${n}x de ${currencyFmt.format(installmentValue)}`;
      bankOut.textContent = currencyFmt.format(bankValue);
    }

    downSlider.addEventListener("input", update);
    installmentsSelect.addEventListener("change", update);
    update();
  });

  // "Minha renda é compatível?" buttons -> pre-select the matching unit
  // type in the financing form below.
  document.querySelectorAll(".plan-panel .btn[data-finance-units]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const financeForm = document.getElementById("financeForm");
      if (financeForm) financeForm.funits.value = btn.dataset.financeUnits;
    });
  });

  // Reads the live numbers off a unit type's calculator, so the finance
  // form can hand them to WhatsApp instead of asking the customer to
  // re-type a simulation they already built above.
  const FINANCE_PANEL_BY_UNITS = { "2 quartos": "f2q", "3 quartos": "f3q" };
  function getCalcSnapshot(units) {
    const panelId = FINANCE_PANEL_BY_UNITS[units];
    const calc = panelId && document.querySelector(`#${panelId} .calc`);
    if (!calc) return null;
    return {
      price: calc.querySelector(".calc-price-out").textContent,
      downPct: calc.querySelector(".calc-down-pct-out").textContent,
      down: calc.querySelector(".calc-down-out").textContent,
      installment: calc.querySelector(".calc-installment-out").textContent,
      annual: calc.querySelector(".calc-annual-out").textContent,
      bank: calc.querySelector(".calc-bank-out").textContent,
    };
  }

  // Video tour: lazy-loads the YouTube iframe only on click, so the page
  // never pays YouTube's script cost until someone actually wants to
  // watch. Until a real video-id is set (see index.html data-video-id),
  // the facade just shows the "Em breve" badge and does nothing on click.
  const videoEmbed = document.getElementById("videoEmbed");
  if (videoEmbed) {
    videoEmbed.addEventListener("click", () => {
      const videoId = videoEmbed.dataset.videoId;
      if (!videoId || videoId.startsWith("TODO")) return;
      videoEmbed.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="Vídeo de apresentação do Vivenda Coqueiral" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  // Lightbox for zoomable images
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".js-zoom").forEach((el) => {
    const img = el.tagName === "IMG" ? el : el.querySelector("img");
    if (!img) return;
    el.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
    });
  });
  function closeLightbox() { lightbox.classList.remove("open"); lightboxImg.src = ""; }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // Hero + floating WhatsApp buttons -> generic message
  const genericMsg = "Olá! Vim pelo site do Vivenda Coqueiral e gostaria de mais informações.";
  const heroWhatsapp = document.getElementById("heroWhatsapp");
  const floatWhatsapp = document.getElementById("floatWhatsapp");
  if (heroWhatsapp) {
    heroWhatsapp.href = buildWhatsappLink(genericMsg);
    heroWhatsapp.addEventListener("click", () => trackMetaEvent("Contact"));
  }
  if (floatWhatsapp) {
    floatWhatsapp.href = buildWhatsappLink(genericMsg);
    floatWhatsapp.addEventListener("click", () => trackMetaEvent("Contact"));
  }

  // "Agendar Visita" button -> its own pre-filled message
  const scheduleVisit = document.getElementById("scheduleVisit");
  if (scheduleVisit) {
    scheduleVisit.href = buildWhatsappLink(
      "Olá! Vim pelo site do Vivenda Coqueiral e gostaria de agendar uma visita ao apartamento decorado."
    );
    scheduleVisit.addEventListener("click", () => trackMetaEvent("Schedule"));
  }

  // Lead form -> builds a pre-filled WhatsApp message
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = leadForm.name.value.trim();
      const email = leadForm.email.value.trim();
      const interest = leadForm.interest.value;
      const message = leadForm.message.value.trim();
      const planId = leadForm.plan.value || null;
      const planLabel = planId ? planLabels[planId] || null : null;
      // Prefer the specific floorplan clicked (most precise); fall back to
      // the interest dropdown; "Ainda não sei" and no-plan both correctly
      // resolve to undefined, so no code is sent when there's no real
      // unit-specific reference.
      const propertyCode = PROPERTY_CODE_BY_UNITS[planId ? PLAN_UNITS[planId] : interest];

      let text = `Olá! Meu nome é ${name} e vim pelo site do Vivenda Coqueiral.\n`;
      text += `Tenho interesse em: ${interest}.\n`;
      if (planLabel) text += `Planta específica: ${planLabel}.\n`;
      if (email) text += `E-mail: ${email}.\n`;
      if (message) text += `Mensagem: ${message}`;

      trackMetaEvent("Lead");
      window.open(buildWhatsappLink(text, propertyCode), "_blank", "noopener");
    });
  }

  // "Minha renda é compatível?" form -> hands the customer's own live
  // calculator numbers to WhatsApp instead of asking them to redo the math.
  const financeForm = document.getElementById("financeForm");
  if (financeForm) {
    financeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = financeForm.fname.value.trim();
      const units = financeForm.funits.value;
      const income = financeForm.income.value;
      const snapshot = getCalcSnapshot(units);

      let text = `Olá! Meu nome é ${name} e vim pelo site do Vivenda Coqueiral.\n`;
      text += `Gostaria de saber se minha renda é compatível com o financiamento de um apartamento de ${units}.\n`;
      if (snapshot) {
        text += `Simulação feita no site: imóvel de ${snapshot.price}, entrada de ${snapshot.downPct} (${snapshot.down}), parcela mensal de ${snapshot.installment}, reforço anual de ${snapshot.annual}, saldo financiado com o banco de ${snapshot.bank}.\n`;
      }
      text += `Renda familiar aproximada: ${income}.`;

      trackMetaEvent("Lead");
      window.open(buildWhatsappLink(text, PROPERTY_CODE_BY_UNITS[units]), "_blank", "noopener");
    });
  }

  // Header shadow on scroll
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) header.style.boxShadow = "0 10px 30px -20px rgba(0,0,0,.5)";
    else header.style.boxShadow = "none";
  });

  // Scroll-reveal: fade + rise elements in as they enter the viewport.
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
