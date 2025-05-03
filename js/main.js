document.addEventListener('DOMContentLoaded', () => {
  // Set active navigation link
  setActiveNavLink();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize animations
  initScrollAnimations();
  
  // Initialize typewriter effect
  initTypewriterEffect();
  
  // Initialize contact form
  initContactForm();
});

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Remove .html extension for comparison
    const cleanCurrentPath = currentPath.replace('.html', '').replace('/', '');
    const cleanLinkPath = linkPath.replace('.html', '').replace('/', '');
    
    // Handle index/home page
    if ((cleanCurrentPath === '' || cleanCurrentPath === 'index') && 
        (cleanLinkPath === '' || cleanLinkPath === 'index')) {
      link.classList.add('active');
      return;
    }
    
    // Handle other pages
    if (cleanCurrentPath.includes(cleanLinkPath) && cleanLinkPath !== '') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
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
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('section, article');
    const windowHeight = window.innerHeight;
    
    elements.forEach(el => {
      const elementPosition = el.getBoundingClientRect().top;
      const animationPoint = windowHeight - 100;
      
      if (elementPosition < animationPoint) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  document.querySelectorAll('section, article').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}

// Typewriter effect for hero text
function initTypewriterEffect() {
  const heroText = document.querySelector('.hero p');
  if (!heroText) return;
  
  const text = heroText.textContent;
  heroText.textContent = '';
  
  let i = 0;
  const type = () => {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(type, Math.random() * 50 + 50);
    }
  };
  
  setTimeout(type, 500);
}

// Contact form handling
function initContactForm() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      contactForm.innerHTML = `
        <div class="form-success">
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      `;
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      alert('Failed to send message. Please try again.');
    }
  });
}