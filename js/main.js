// ========================================
// Caelus Andromeda, Lda. - Complete JS
// Features: EN/PT Toggle, iOS Dark Mode Switch, Alternating Mottos (4 texts), Smooth Scroll
// ========================================

const translations = {
  en: {
    // Top bar mottos (alternating)
    motto1: "Excellence in Financial Services",
    motto2: "Lisbon Metropolitan Area, Portugal",
    // Nav
    navFirm: "The Firm", navServices: "Services", navContact: "Contact",
    // Hero
    heroTitle: "Financial Excellence is our Practice",
    heroSubtitle: "Expert accounting, auditing, consulting, and tax solutions",
    ctaButton: "Discover our offer",
    // Cards
    card1Title: "Professional Services",
    card1Text: "Expert accountant, economist and financial auditor with over 30 years of experience in the business.",
    card2Title: "Data-Driven Strategy",
    card2Text: "Leverage analytics and insights to make informed decisions that drive results.",
    card3Title: "New Technologies",
    card3Text: "Integrate new technologies in our practice to modernize and individualize the approach.",
    card4Title: "Trusted Partner",
    card4Text: "Reliable, transparent partnerships built on integrity and proven track record.",
    // About
    aboutTitle: "About Us",
    aboutP1: "Welcome to Caelus Andromeda. We specialize in providing innovative financial solutions that help businesses thrive in today's competitive landscape.",
    aboutP2: "With over 30 years of expertise, our team is dedicated to delivering exceptional results and building long-term partnerships.",
    // Footer
    copyright: "© 2026 Caelus Andromeda, Lda. All rights reserved."
  },
  pt: {
    // Top bar mottos (alternating - Portuguese versions)
    motto1: "Excelência em Serviços Financeiros",
    motto2: "Área Metropolitana de Lisboa, Portugal",
    // Nav
    navFirm: "A Firma", navServices: "Serviços", navContact: "Contacto",
    // Hero
    heroTitle: "Excelência Financeira é a nossa Prática",
    heroSubtitle: "Soluções especializadas em contabilidade, auditoria, consultoria e impostos",
    ctaButton: "Descubra a nossa oferta",
    // Cards
    card1Title: "Serviços Profissionais",
    card1Text: "Contabilista, economista e auditor financeiro, com mais de 30 anos de experiência no ramo.",
    card2Title: "Estratégia Baseada em Dados",
    card2Text: "Aproveitar análises e insights para tomar decisões que impulsionam resultados.",
    card3Title: "Novas Tecnologias",
    card3Text: "Integração de novas tecnologias para modernizar e individualizar a abordagem.",
    card4Title: "Parceiro Confiável",
    card4Text: "Parcerias confiáveis e transparentes construídas sobre integridade e histórico comprovado.",
    // About
    aboutTitle: "Sobre Nós",
    aboutP1: "Bem-vindo à Caelus Andromeda. Especializamo-nos em fornecer soluções financeiras inovadoras que ajudam os negócios a prosperar no cenário competitivo atual.",
    aboutP2: "Com mais de 30 anos de experiência, a nossa equipa está dedicada a entregar resultados excepcionais e construir parcerias de longo prazo.",
    // Footer
    copyright: "© 2026 Caelus Andromeda, Lda. Todos os direitos reservados."
  }
};

let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let mottoIndex = 0;

// Language Switch
function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[onclick="switchLang('${lang}')"]`)?.classList.add('active');
  updateMottoDisplay();
}

// Dark Mode Toggle
function switchTheme(theme) {
  currentTheme = theme || (currentTheme === 'dark' ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  const checkbox = document.getElementById('theme-toggle-checkbox');
  if (checkbox) checkbox.checked = (currentTheme === 'dark');
}

// Alternating Mottos (2 per language)
function updateMottoDisplay() {
  document.querySelectorAll('.motto-text').forEach((text, i) => {
    text.style.display = i === mottoIndex ? 'inline' : 'none';
  });
}

function cycleMotto() {
  mottoIndex = 1 - mottoIndex; // Toggle between 0 and 1
  updateMottoDisplay();
}

// Init on Page Load
document.addEventListener('DOMContentLoaded', () => {
  switchLang(currentLang);
  switchTheme(currentTheme);
  setInterval(cycleMotto, 5000); // Cycle every 5 seconds

  // iOS Toggle Listener
  const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', () => switchTheme());
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // System theme change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) switchTheme(e.matches ? 'dark' : 'light');
  });
});

