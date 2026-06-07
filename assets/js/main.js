// 1. Mobile nav toggle
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// 2. Scroll-triggered fade-up animation
(function () {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

// 3. Active nav link highlighting
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const page = href.split('/').pop();
    if (page === current || (current === '' && page === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// 4. Formspree AJAX form submission
(function () {
  function handleForm(form) {
    if (!form) return;

    const successEl = form.querySelector('.form-message.success');
    const errorEl = form.querySelector('.form-message.error');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (successEl) successEl.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';

      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.reset();
          if (successEl) {
            successEl.style.display = 'block';
          }
        } else {
          throw new Error('Server error');
        }
      } catch {
        if (errorEl) {
          errorEl.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  document.querySelectorAll('form[data-formspree]').forEach(handleForm);
})();

// 5. Smooth scroll for anchor links
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// Breath wave SVG animation helper — called from index.html
function initBreathWave(svgId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  let t = 0;
  const paths = svg.querySelectorAll('.wave-path');

  function tick() {
    t += 0.012;
    paths.forEach((path, i) => {
      const offset = (i * Math.PI * 2) / 3;
      const amplitude = 18 + i * 4;
      const freq = 0.018 + i * 0.003;
      const points = [];
      for (let x = 0; x <= 1200; x += 12) {
        const y = 50 + amplitude * Math.sin(x * freq + t + offset);
        points.push(`${x},${y}`);
      }
      path.setAttribute('points', points.join(' '));
    });
    requestAnimationFrame(tick);
  }
  tick();
}
