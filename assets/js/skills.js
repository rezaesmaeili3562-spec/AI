(function () {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;

  const bars = skillsGrid.querySelectorAll('.skill-bar');
  bars.forEach((bar) => {
    const target = bar.dataset.skill || '0';
    bar.style.width = '0%';
    bar.dataset.targetWidth = target;
  });

  const animateBars = () => {
    bars.forEach((bar) => {
      const width = bar.dataset.targetWidth;
      const card = bar.closest('.skills-card');
      if (card) {
        card.classList.add('section-visible');
      }
      requestAnimationFrame(() => {
        bar.style.width = width + '%';
      });
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsGrid);
})();
