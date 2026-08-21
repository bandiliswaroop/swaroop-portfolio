/**
 * 21st.dev Modern Developer Interactions
 * Santhi Swaroop Bandili Portfolio
 */

(function () {
  'use strict';

  // ===== Profile Configuration =====
  const LINKS = {
    github: 'https://github.com/bandiliswaroop',
    linkedin: 'https://linkedin.com',
  };

  // ===== DOM Elements =====
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const yearEl = document.getElementById('year');
  const toastEl = document.getElementById('toast');

  let toastTimer = null;

  // ===== Toast Notification Helper =====
  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>${message}</span>
    `;
    toastEl.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2600);
  }

  // ===== 1-Click Copy to Clipboard =====
  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // If clicking a link that has data-copy, allow or prevent depending on tag
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(function () {
            showToast(`Copied "${textToCopy}" to clipboard!`);
          }).catch(function () {
            fallbackCopy(textToCopy);
          });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const tempInput = document.createElement('textarea');
      tempInput.value = text;
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        showToast(`Copied to clipboard!`);
      } catch (err) {
        showToast(`Failed to copy`);
      }
      document.body.removeChild(tempInput);
    }
  }

  // ===== Spotlight Effect on Cards (21st.dev) =====
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // ===== Project Filter Tabs =====
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-showcase-card');
    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        // Toggle active button
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter projects
        projectCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hide');
            // Re-trigger visual fade
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(function () {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }

  // ===== Mobile Navigation =====
  function initNav() {
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link, .resume-btn').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Header Scroll Blur & Shadow =====
  function initHeaderScroll() {
    if (!header) return;
    function checkScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // ===== Scroll Spy (Active Navigation Item) =====
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function () {
      let current = '';
      const scrollPos = window.scrollY + 180;

      sections.forEach(function (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ===== Scroll Reveal (AOS alternative) =====
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

  // ===== 3D Avatar Tilt =====
  function initHero3D() {
    const heroWrap = document.querySelector('.hero-card-3d-wrap');
    const heroCard = document.querySelector('.hero-card-3d');
    if (!heroWrap || !heroCard) return;

    const maxRotate = 14;

    heroWrap.addEventListener('mousemove', function (e) {
      const rect = heroWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * maxRotate * 2;
      const rotateX = ((y / rect.height) - 0.5) * -maxRotate * 2;

      heroCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
    });

    heroWrap.addEventListener('mouseleave', function () {
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  }

  // ===== Typewriter Effect on Hero Name =====
  function initHeroTyping() {
    const mainEl = document.getElementById('hero-title-main');
    const accentEl = document.getElementById('hero-title-accent');
    if (!mainEl || !accentEl) return;

    const mainText = mainEl.getAttribute('data-full') || mainEl.textContent.trim();
    const accentText = accentEl.getAttribute('data-full') || accentEl.textContent.trim();
    mainEl.setAttribute('data-full', mainText);
    accentEl.setAttribute('data-full', accentText);

    const speed = 100;
    const loopPause = 2400;

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

  // ===== Auto Play Loop Project Videos =====
  function initProjectVideos() {
    const videos = document.querySelectorAll('.project-video');
    videos.forEach(function (video) {
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.play().catch(function () {});
    });
  }

  // ===== 3D Interactive Three.js Scene =====
  function initThreeScene() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, heroSection.clientWidth / heroSection.clientHeight, 0.1, 1000);
    camera.position.z = 4.2;

    // 2. WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Central 3D Wireframe Icosahedron & Torus Mesh Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // Inner Icosahedron Geometry
    const icoGeometry = new THREE.IcosahedronGeometry(1.15, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    meshGroup.add(icoMesh);

    // Outer Torus Knot
    const torusGeometry = new THREE.TorusKnotGeometry(1.5, 0.035, 100, 16, 2, 3);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    meshGroup.add(torusMesh);

    // Orbiting Dodecahedron ring
    const dodecGeometry = new THREE.DodecahedronGeometry(2.0, 0);
    const dodecMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.14
    });
    const dodecMesh = new THREE.Mesh(dodecGeometry, dodecMaterial);
    meshGroup.add(dodecMesh);

    // Position mesh group
    function updateGroupPosition() {
      if (window.innerWidth > 1024) {
        meshGroup.position.set(1.4, 0.1, 0);
      } else {
        meshGroup.position.set(0, 0.4, -0.4);
      }
    }
    updateGroupPosition();

    // 4. Floating 3D Star / Particle Galaxy Field
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x6366f1); // Indigo
    const c2 = new THREE.Color(0x06b6d4); // Cyan
    const c3 = new THREE.Color(0x10b981); // Emerald

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 11;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 8;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 6;

      const mixed = Math.random() < 0.5 ? c1 : (Math.random() < 0.5 ? c2 : c3);
      particleColors[idx] = mixed.r;
      particleColors[idx + 1] = mixed.g;
      particleColors[idx + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Interactive Mouse & Touch Lerp
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    function onPointerMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = heroSection.getBoundingClientRect();
      targetMouseX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = -((clientY - rect.top) / rect.height - 0.5) * 2;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // 6. Resize Handler
    function onResize() {
      if (!heroSection || !renderer) return;
      const width = heroSection.clientWidth;
      const height = heroSection.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateGroupPosition();
    }
    window.addEventListener('resize', onResize);

    // 7. Visibility Observer (Pause when off-screen for performance)
    let isVisible = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    // 8. 60fps Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth damping (lerp)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Rotate 3D meshes
      icoMesh.rotation.x = elapsedTime * 0.22;
      icoMesh.rotation.y = elapsedTime * 0.32;

      torusMesh.rotation.x = elapsedTime * 0.28 + currentMouseY * 0.35;
      torusMesh.rotation.y = elapsedTime * 0.18 + currentMouseX * 0.35;

      dodecMesh.rotation.x = -elapsedTime * 0.12;
      dodecMesh.rotation.z = elapsedTime * 0.12;

      meshGroup.rotation.y = currentMouseX * 0.35;
      meshGroup.rotation.x = -currentMouseY * 0.25;

      // Animate particles floating wave
      particles.rotation.y = elapsedTime * 0.025 + currentMouseX * 0.08;
      particles.rotation.x = elapsedTime * 0.015 - currentMouseY * 0.05;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ===== Footer Year =====
  function setYear() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ===== Initialize Everything =====
  function initAll() {
    initNav();
    initHeaderScroll();
    initScrollSpy();
    initReveal();
    initCopyButtons();
    initSpotlightCards();
    initProjectFilters();
    initHero3D();
    initHeroTyping();
    initProjectVideos();
    initThreeScene();
    setYear();
  }

  document.addEventListener('DOMContentLoaded', initAll);

  // Run immediate in case DOMContentLoaded already fired
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAll();
  }
})();


