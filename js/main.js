document.addEventListener('DOMContentLoaded', () => {
  // Set active navigation link
  setActiveNavLink();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize animations
  initAnimations();
  
  // Initialize contact form
  initContactForm();
});

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Simple animations for project cards
function initAnimations() {
  const animateOnScroll = () => {
    const projectArticles = document.querySelectorAll('article');
    const windowHeight = window.innerHeight;
    
    projectArticles.forEach((article, index) => {
      const articlePosition = article.getBoundingClientRect().top;
      const animationPoint = windowHeight - 100;
      
      if (articlePosition < animationPoint) {
        setTimeout(() => {
          article.style.opacity = '1';
          article.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  };
  
  // Set initial state
  document.querySelectorAll('article').forEach(article => {
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    article.style.transition = 'all 0.5s ease-out';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}

// Contact form handling
function initContactForm() {
  const contactForm = document.querySelector('form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual fetch in production)
    setTimeout(() => {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      successMessage.style.marginTop = '1rem';
      successMessage.style.color = 'green';
      
      contactForm.appendChild(successMessage);
      
      // Reset form
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }, 1500);
  });
}

// Update active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop - 100 && 
        window.scrollY < sectionTop + sectionHeight - 100) {
      currentSection = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Initialize on load
window.addEventListener('load', () => {
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
});