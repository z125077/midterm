document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('page-loader').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('page-loader').style.display = 'none';
    }, 500);
  }, 1500);
});

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 500);
});