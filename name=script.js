// script.js
// Vanilla JS for interactivity: mobile menu, smooth scrolling, reveal-on-scroll animations,
// and wiring YouTube CTA links. Keep this file light and easy to customize.

/* ====== Configuration: replace these with your actual channels/contacts ====== */
const CONFIG = {
  YT_CHANNEL_URL: 'https://youtube.com/@thrivesphereglobal?si=5IwSIPf4_Ii4OJVh', // updated to your channel URL
  FEATURED_VIDEO_ID: 'ysz5S6PUM-U',           // replace with your featured video ID (only the video id)
  PROFESSIONAL_EMAIL: 'professional@example.com' // replace with real contact
};

/* ====== DOM helpers ====== */
document.addEventListener('DOMContentLoaded', () => {
  // Wire up year in both pages
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const yearAbout = document.getElementById('year-about');
  if (yearAbout) yearAbout.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuOpen = document.getElementById('menu-open');
  const menuClose = document.getElementById('menu-close');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      // toggle icons
      menuOpen.classList.toggle('hidden');
      menuClose.classList.toggle('hidden');
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu on navigation
        if (mobileNav && !mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
      }
    });
  });

  // Wire YouTube CTAs
  const ytCtas = [document.getElementById('cta-yt'), document.getElementById('yt-cta'), document.getElementById('mobile-yt'), document.getElementById('more-on-yt')];
  ytCtas.forEach(node => {
    if (node) {
      node.setAttribute('href', CONFIG.YT_CHANNEL_URL);
      node.addEventListener('click', (e) => {
        if (node.target !== '_blank') node.setAttribute('target', '_blank');
      });
    }
  });

  // Replace featured video iframe if script runs on index.html
  const featuredIframe = document.getElementById('featured-video');
  if (featuredIframe) {
    // Set src with configured video id
    featuredIframe.src = `https://www.youtube.com/embed/${CONFIG.FEATURED_VIDEO_ID}`;
  }

  // Lazy reveal on scroll using IntersectionObserver
  const revealElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => io.observe(el));
  } else {
    // Fallback: reveal all
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Small accessibility: ensure mailto links are populated
  const mailtoEls = document.querySelectorAll('a[href^="mailto:"]');
  mailtoEls.forEach(a => {
    if (a.getAttribute('href') === 'mailto:professional@example.com') {
      a.setAttribute('href', `mailto:${CONFIG.PROFESSIONAL_EMAIL}`);
    }
  });
});
