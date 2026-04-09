const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

function animateMetric(card) {
  const valueEl = card.querySelector('.metric-value');
  const target = Number(card.dataset.target || 0);
  const prefix = card.dataset.prefix || '';
  const suffix = card.dataset.suffix || '';
  const duration = 1100;
  const start = performance.now();
  card.classList.add('is-active');

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    const formatted = current >= 1000 ? Math.round(current).toLocaleString() : (target % 1 !== 0 ? current.toFixed(1) : Math.round(current));
    valueEl.textContent = `${prefix}${formatted}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
  setTimeout(() => card.classList.remove('is-active'), 1600);
}

document.querySelectorAll('.metric-card').forEach((card) => {
  card.addEventListener('click', () => animateMetric(card));
});
