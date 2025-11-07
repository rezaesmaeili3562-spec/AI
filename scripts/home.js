function runTypewriter() {
  const lines = [
    { id: 'line1', delay: 500, duration: "typing 2s steps(30, end) 0.5s forwards, blink-caret 0.75s step-end infinite" },
    { id: 'line2', delay: 3000, duration: "typing 2.5s steps(40, end) 3s forwards, blink-caret 0.75s step-end infinite" },
    { id: 'line3', delay: 6000, duration: "typing 3s steps(50, end) 6s forwards, blink-caret 0.75s step-end infinite" }
  ];

  lines.forEach((line) => {
    const element = document.getElementById(line.id);
    if (!element) return;
    element.style.width = '0';
    setTimeout(() => {
      element.style.animation = line.duration;
    }, line.delay);
  });
}

function bindActions() {
  document.querySelectorAll('.view-projects-btn').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = 'projects.html';
    });
  });

  document.querySelectorAll('.contact-btn').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  });

  const notification = window.notificationSystem;
  if (notification) {
    notification.show('خوش آمدید! برای مشاهده بخش‌های دیگر از منوی بالا استفاده کنید.', 'info', 4000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  runTypewriter();
  bindActions();
});
