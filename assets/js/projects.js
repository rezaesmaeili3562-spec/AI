(function () {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  cards.forEach((card) => observer.observe(card));
})();
