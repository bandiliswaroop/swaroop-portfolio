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

  // ===== Hero image 3D tilt =====
  function initHero3D() {
    const heroWrap = document.querySelector('.hero-image-wrap');
    const heroImg = document.querySelector('.hero-image');
    if (!heroWrap || !heroImg) return;

    const maxRotate = 18; // degrees

    heroWrap.addEventListener('mousemove', function (e) {
      const rect = heroWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * maxRotate * 2;
      const rotateX = ((y / rect.height) - 0.5) * -maxRotate * 2;

      heroImg.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(20px)`;
    });

    heroWrap.addEventListener('mouseleave', function () {
      heroImg.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  }

  // ===== Hero name typing effect =====
  function initHeroTyping() {
    const mainEl = document.getElementById('hero-title-main');
    const accentEl = document.getElementById('hero-title-accent');
    if (!mainEl || !accentEl) return;

    const mainText = mainEl.getAttribute('data-full') || mainEl.textContent.trim();
    const accentText = accentEl.getAttribute('data-full') || accentEl.textContent.trim();
    mainEl.setAttribute('data-full', mainText);
    accentEl.setAttribute('data-full', accentText);

    const speed = 120; // ms per character (medium / natural)
    const loopPause = 1200; // pause after full name before restarting

    function runOnce() {
      mainEl.textContent = '';
      accentEl.textContent = '';

      let i = 0;
      let j = 0;

      function typeNext() {
        if (i < mainText.length) {
          mainEl.textContent += mainText.charAt(i++);
          setTimeout(typeNext, speed);
        } else if (j < accentText.length) {
          accentEl.textContent += accentText.charAt(j++);
          setTimeout(typeNext, speed);
        } else {
          setTimeout(runOnce, loopPause);
        }
      }

      setTimeout(typeNext, 400);
    }

    runOnce();
  }

  // ===== Project preview videos (auto play loop) =====
  function initProjectVideos() {
    const videos = document.querySelectorAll('.project-video');
    videos.forEach(function (video) {
      if (!video) return;
      video.loop = true;
      video.muted = true;
      video.play().catch(function () {});
    });
  }

  // ===== Education timeline animation on scroll =====
  function initEducationAnimation() {
    const educationSection = document.getElementById('education');
    if (!educationSection || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            educationSection.classList.add('education-animate');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(educationSection);
  }

  // ===== Run =====
  applyLinks();
  initNav();
  initHeaderScroll();
  initReveal();
  initSmoothScroll();
  setYear();
  initHero3D();
  initHeroTyping();
  initProjectVideos();
  initEducationAnimation();
})();
