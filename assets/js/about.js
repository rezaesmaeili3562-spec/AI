(function () {
  const panels = document.querySelectorAll('.glass-panel');
  if (!panels.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  panels.forEach((panel) => observer.observe(panel));
})();
