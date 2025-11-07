(function () {
  const typewriterTarget = document.getElementById('typewriter');
  if (typewriterTarget) {
    const texts = ['سلام! من سجادم'];
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = texts[textIndex];
      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typewriterTarget.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex === current.length) {
        setTimeout(() => (deleting = true), 1800);
      } else if (deleting && charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      const speed = deleting ? 60 : 120;
      setTimeout(type, speed);
    };

    type();
  }

  const stats = document.querySelectorAll('.hero-stat');
  if (stats.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(stats[0]);
  }

  function animateStats() {
    stats.forEach((stat) => {
      const target = Number(stat.dataset.count || '0');
      const valueElement = stat.querySelector('strong');
      const suffix = valueElement && valueElement.textContent.includes('%') ? '%' : '+';
      let current = 0;
      const step = Math.max(1, Math.round(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (valueElement) {
          valueElement.textContent = `${current}${suffix}`;
        }
      }, 30);
    });
  }
})();
