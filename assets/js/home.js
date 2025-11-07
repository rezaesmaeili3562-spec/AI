function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

class TypeWriter {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    if (!this.element) return;
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      setTimeout(() => (this.isDeleting = true), 1800);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
    }

    setTimeout(() => this.type(), this.isDeleting ? this.speed / 2 : this.speed);
  }
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    const isPercentage = counter.textContent.includes('%');
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = `${target}${isPercentage ? '%' : '+'}`;
        clearInterval(timer);
      } else {
        counter.textContent = `${Math.floor(current)}${isPercentage ? '%' : '+'}`;
      }
    }, 16);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme);

  new TypeWriter(document.getElementById('typewriter'), ['سلام! من سجادم']);
  animateCounters();
});

window.addEventListener('message', (event) => {
  if (event.data?.type === 'theme-change') {
    applyTheme(event.data.theme);
  }
});
