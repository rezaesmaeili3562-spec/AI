document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('contentFrame');
  const buttons = document.querySelectorAll('.page-link');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const url = button.getAttribute('data-page');
      if (frame && url) {
        frame.src = url;
        buttons.forEach((btn) => btn.classList.remove('ring-2', 'ring-primaryEnd'));
        button.classList.add('ring-2', 'ring-primaryEnd');
        if (window.notificationSystem) {
          window.notificationSystem.show('صفحه با موفقیت بارگذاری شد.', 'info');
        }
      }
    });
  });

  if (buttons.length > 0) {
    buttons[0].classList.add('ring-2', 'ring-primaryEnd');
  }
});
