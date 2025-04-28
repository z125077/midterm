document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functionality
  initNavigation();
  initScrollAnimations();
  initTypewriterEffect();
  initContactForm();
  initFloatingElements();
});

// Navigation Controller
const initNavigation = () => {
  const navLinks = document.querySelectorAll('nav a');
  
  // Set active link based on current page
  const currentPage = location.pathname.split('/').pop().split('.')[0] || 'index';
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('.')[0];
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
};

// Scroll Animations
const initScrollAnimations = () => {
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
};

// Typewriter Effect for Hero Text
const initTypewriterEffect = () => {
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
};

// Contact Form Handling
const initContactForm = () => {
  const contactForm = document.querySelector('form');
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
};

// Floating elements animation
const initFloatingElements = () => {
  const floatingElements = document.querySelectorAll('.floating');
  
  floatingElements.forEach(el => {
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    el.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
  });
};

// Floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(style);