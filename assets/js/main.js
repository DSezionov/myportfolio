/* ============================================================
   PORTFOLIO MAIN.JS — Animations & Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ─── CUSTOM CURSOR ─────────────────────────────────────── */
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursor && cursorRing && window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, .case-card, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ─── PAGE TRANSITION ───────────────────────────────────── */
  const overlay = document.querySelector('.page-transition');

  function navigateTo(href) {
    if (!overlay) { location.href = href; return; }
    overlay.classList.remove('leaving');
    overlay.classList.add('entering');
    overlay.addEventListener('animationend', () => {
      location.href = href;
    }, { once: true });
  }

  // Leaving animation (enter from new page)
  window.addEventListener('pageshow', e => {
    if (overlay) {
      overlay.classList.remove('entering');
      void overlay.offsetWidth; // reflow
      overlay.classList.add('leaving');
    }
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(href);
    });
  });

  /* ─── NAVBAR SCROLL ─────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE MENU ───────────────────────────────────────── */
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── ANIMATE ON SCROLL (AOS) ───────────────────────────── */
  function initAOS() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('aos-animate');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }
  initAOS();

  /* ─── HERO TEXT ANIMATION ───────────────────────────────── */
  function splitAndAnimate(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    const text = el.innerText;
    el.innerHTML = '';
    el.style.opacity = '1';

    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.cssText = `
        display: inline-block;
        opacity: 0;
        transform: translateY(0.4em) rotate(${(Math.random() - 0.5) * 8}deg);
        transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.03}s,
                    transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.03}s;
      `;
      el.appendChild(span);
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelectorAll('span').forEach(s => {
        s.style.opacity = '1';
        s.style.transform = 'translateY(0) rotate(0deg)';
      });
    }));
  }

  // Stagger the hero elements
  const heroEls = document.querySelectorAll('.hero-tag, .hero-role, .hero-desc, .hero-actions, .hero-bottom');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });

  splitAndAnimate('.hero-name');

  /* ─── TOOL BARS ANIMATION ───────────────────────────────── */
  const bars = document.querySelectorAll('.tool-bar');
  if (bars.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('animated');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(b => io.observe(b));
  }

  /* ─── WORK FILTER ───────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards  = document.querySelectorAll('.case-card[data-cat]');

  if (filterBtns.length && caseCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;

        caseCards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.opacity = show ? '1' : '0.25';
          card.style.pointerEvents = show ? '' : 'none';
          card.style.transform = show ? '' : 'scale(0.97)';
        });
      });
    });
  }

  /* ─── PARALLAX HERO BG TEXT ─────────────────────────────── */
  const bgText = document.querySelector('.hero-bg-text');
  if (bgText) {
    window.addEventListener('scroll', () => {
      bgText.style.transform = `translateY(${scrollY * 0.18}px)`;
    }, { passive: true });
  }

  /* ─── MARQUEE DUPLICATE ─────────────────────────────────── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    const items = track.innerHTML;
    track.innerHTML = items + items; // seamless loop
  }

  /* ─── COUNT UP ──────────────────────────────────────────── */
  function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1200;
    const start  = performance.now();
    const suffix = el.dataset.suffix || '';

    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          countUp(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.8 });
    counters.forEach(c => io.observe(c));
  }

  /* ─── MAGNETIC HOVER ────────────────────────────────────── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── ACTIVE NAV LINK ───────────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const aPage = a.getAttribute('href').split('/').pop();
    if (aPage === page) a.classList.add('active');
  });

  /* ─── HERO CANVAS ANIMATION ─────────────────────────────── */
  (function initHeroCanvas() {
    const canvas = document.querySelector('.hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes;
    const ACCENT = 'rgba(201,184,138,';
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildNodes();
    }
    function buildNodes() {
      const count = Math.floor((W * H) / 18000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.5, pulse: Math.random() * Math.PI * 2,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.012;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
      });
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = ACCENT + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT + (0.08 + pulse * 0.12) + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();
    draw();
  })();

})();
