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

  /* ─── HERO CANVAS ANIMATION — Flowing Mesh Gradient ─────── */
  (function initHeroCanvas() {
    const canvas = document.querySelector('.hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, t = 0;

    const STOPS = [
      { r: 201, g: 184, b: 138 },
      { r:  42, g:  42, b:  47 },
      { r:  90, g:  90, b:  98 },
      { r:  17, g:  17, b:  19 },
    ];

    const ORBS = [
      { cx: 0.72, cy: 0.25, r: 0.55, si: 0, speed: 0.00018, amp: 0.10, phase: 0.00 },
      { cx: 0.55, cy: 0.70, r: 0.50, si: 2, speed: 0.00024, amp: 0.08, phase: 1.80 },
      { cx: 0.88, cy: 0.55, r: 0.45, si: 0, speed: 0.00020, amp: 0.12, phase: 3.60 },
      { cx: 0.40, cy: 0.35, r: 0.40, si: 1, speed: 0.00016, amp: 0.09, phase: 5.10 },
      { cx: 0.80, cy: 0.80, r: 0.48, si: 2, speed: 0.00022, amp: 0.07, phase: 2.40 },
    ];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function rgba(stop, alpha) {
      return `rgba(${stop.r},${stop.g},${stop.b},${alpha.toFixed(3)})`;
    }

    function draw() {
      t++;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'screen';

      ORBS.forEach(orb => {
        const driftX = Math.sin(t * orb.speed * 1.3 + orb.phase) * orb.amp;
        const driftY = Math.cos(t * orb.speed       + orb.phase) * orb.amp * 0.7;
        const cx = (orb.cx + driftX) * W;
        const cy = (orb.cy + driftY) * H;
        const r  =  orb.r * Math.max(W, H);
        const stop = STOPS[orb.si];
        const breath = 0.5 + 0.5 * Math.sin(t * orb.speed * 60 + orb.phase);
        const alphaCenter = 0.07 + breath * 0.06;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0.00, rgba(stop, alphaCenter));
        grad.addColorStop(0.45, rgba(stop, alphaCenter * 0.5));
        grad.addColorStop(1.00, rgba(stop, 0));

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      const vignette = ctx.createRadialGradient(
        W * 0.65, H * 0.5, H * 0.1,
        W * 0.65, H * 0.5, H * 1.1
      );
      vignette.addColorStop(0.0, 'rgba(9,9,10,0.00)');
      vignette.addColorStop(1.0, 'rgba(9,9,10,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();
  })();

})();
