/* ── SCROLL REVEAL ── */
const shots = document.querySelectorAll('.shot');

// Assign stagger index as CSS custom property
shots.forEach((shot, i) => shot.style.setProperty('--i', i));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
);

shots.forEach(shot => revealObserver.observe(shot));

/* ── HERO PARALLAX ── */
const heroBgText = document.querySelector('.hero-bg-text');

if (heroBgText) {
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    heroBgText.style.transform = `translateY(calc(-50% + ${y * 0.28}px))`;
  }, { passive: true });
}

/* ── STATS STRIP REVEAL ── */
const statItems = document.querySelectorAll('.stat-item');

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
);

statItems.forEach(item => statObserver.observe(item));

/* ── SCROLL-TO-TOP ── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.pageYOffset > 500);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── NAV ACTIVE STATE ON SCROLL ── */
const navLinks = document.querySelectorAll('nav ul a');
const sections = document.querySelectorAll('main section');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${entry.target.id}`) {
          navLinks.forEach(l => l.removeAttribute('data-active'));
          link.setAttribute('data-active', '');
        }
      });
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));
