document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('page-loader').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('page-loader').style.display = 'none';
    }, 500);
  }, 1500);
});

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  for (const reveal of reveals) {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    } else {
      reveal.classList.remove('active');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
