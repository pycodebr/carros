// Theme toggle with localStorage
(function () {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme:carros');
  if (saved === 'dark') {
    document.body.classList.add('theme-default');
  }
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('theme-default');
      const isDark = document.body.classList.contains('theme-default');
      localStorage.setItem('theme:carros', isDark ? 'dark' : 'light');
    });
  }
})();

// Small ripple effect on buttons
document.addEventListener('click', function (e) {
  const target = e.target.closest('.btn');
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  const ripple = target.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  target.appendChild(circle);
});

