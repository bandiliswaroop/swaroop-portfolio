(function () {
  'use strict';

  // ===== Config: Update these with your real profile URLs =====
  const LINKS = {
    github: 'https://github.com',      // e.g. https://github.com/yourusername
    linkedin: 'https://linkedin.com',  // e.g. https://linkedin.com/in/yourprofile
  };

  // ===== DOM =====
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const yearEl = document.getElementById('year');

  // ===== Apply profile links =====
  function applyLinks() {
    const gh = document.getElementById('link-github');
    const li = document.getElementById('link-linkedin');
    const cGh = document.getElementById('contact-github');
    const cLi = document.getElementById('contact-linkedin');
    if (gh) gh.href = LINKS.github;
    if (li) li.href = LINKS.linkedin;
    if (cGh) {
      cGh.href = LINKS.github;
      const val = cGh.querySelector('.contact-value');
      if (val) val.textContent = LINKS.github.replace(/^https?:\/\//, '').split('/')[0];
    }
    if (cLi) {
      cLi.href = LINKS.linkedin;
      const val = cLi.querySelector('.contact-value');
      if (val) val.textContent = LINKS.linkedin.replace(/^https?:\/\//, '').split('/')[0];
    }
  }

  // ===== Mobile menu =====
  function initNav() {
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Header scroll =====
  function initHeaderScroll() {
    if (!header) return;
    let lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 80) {
        header.style.background = 'rgba(15, 20, 25, 0.95)';
      } else {
        header.style.background = 'rgba(15, 20, 25, 0.85)';
      }
      lastY = y;
    }, { passive: true });
  }

  // ===== Scroll reveal =====
  function initReveal() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== Smooth scroll for anchor links =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===== Footer year =====
  function setYear() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ===== Run =====
  applyLinks();
  initNav();
  initHeaderScroll();
  initReveal();
  initSmoothScroll();
  setYear();
})();
