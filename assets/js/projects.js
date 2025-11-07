function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme'));
  document.querySelectorAll('.section-hidden').forEach((section) => {
    section.classList.add('section-visible');
  });
});

window.addEventListener('message', (event) => {
  if (event.data?.type === 'theme-change') {
    applyTheme(event.data.theme);
  }
});
