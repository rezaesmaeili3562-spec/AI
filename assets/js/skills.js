function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach((bar) => {
    const targetWidth = bar.getAttribute('data-width') || '0%';
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 150);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme'));

  document.querySelectorAll('.section-hidden').forEach((section) => {
    section.classList.add('section-visible');
  });

  animateSkillBars();
});

window.addEventListener('message', (event) => {
  if (event.data?.type === 'theme-change') {
    applyTheme(event.data.theme);
  }
});
