// Main Portfolio Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initDarkMode();
    initTypewriterEffect();
    initContactForm();
  });
  
  // Navigation Controller
  const initNavigation = () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
  
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.hash) {
          e.preventDefault();
          scrollToSection(link.hash);
          
          // Close mobile menu if open
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
          }
        }
      });
    });
  
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
  };
  
  // Smooth scroll to section
  const scrollToSection = (selector) => {
    const target = document.querySelector(selector);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Account for fixed header
        behavior: 'smooth'
      });
      history.pushState(null, null, selector);
    }
  };
  
  // Scroll Animations
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // Set initial state for animated elements
    animatedElements.forEach(el => {
      const animationType = el.dataset.animate || 'fade-up';
      el.style.opacity = '0';
      
      if (animationType.includes('up')) {
        el.style.transform = 'translateY(20px)';
      } else if (animationType.includes('down')) {
        el.style.transform = 'translateY(-20px)';
      } else if (animationType.includes('left')) {
        el.style.transform = 'translateX(20px)';
      } else if (animationType.includes('right')) {
        el.style.transform = 'translateX(-20px)';
      }
      
      el.style.transition = 'all 0.6s ease-out';
    });
  
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translate(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    animatedElements.forEach(el => observer.observe(el));
  };
  
  // Dark Mode Toggle
  const initDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
    // Create toggle if it doesn't exist
    if (!darkModeToggle) {
      const toggle = document.createElement('button');
      toggle.className = 'dark-mode-toggle';
      toggle.innerHTML = '🌓';
      toggle.title = 'Toggle Dark Mode';
      document.body.appendChild(toggle);
      toggle.addEventListener('click', toggleDarkMode);
    } else {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }
  
    // Check system preference
    const checkDarkModePreference = () => {
      if (localStorage.getItem('darkMode') === 'enabled' || 
          (localStorage.getItem('darkMode') !== 'disabled' && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        updateToggleIcon(true);
      }
    };
  
    // Toggle dark mode
    const toggleDarkMode = () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
      updateToggleIcon(isDark);
    };
  
    // Update toggle icon
    const updateToggleIcon = (isDark) => {
      const toggle = document.querySelector('.dark-mode-toggle');
      if (toggle) {
        toggle.innerHTML = isDark ? '☀️' : '🌓';
      }
    };
  
    // Listen for system preference changes
    prefersDarkScheme.addListener((e) => {
      if (localStorage.getItem('darkMode') === null) {
        document.body.classList.toggle('dark-mode', e.matches);
        updateToggleIcon(e.matches);
      }
    });
  
    // Initialize
    checkDarkModePreference();
  };
  
  // Typewriter Effect
  const initTypewriterEffect = () => {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.display = 'inline-block'; // Prevent layout shift
      
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          const delay = text.charAt(i) === ' ' ? 50 : 100; // Faster for spaces
          setTimeout(type, delay);
        }
      };
      
      // Start with slight delay
      setTimeout(type, 500);
    });
  };
  
  // Contact Form Handling
  const initContactForm = () => {
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
  
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        // Simulate API call (replace with actual fetch)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        contactForm.innerHTML = `
          <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        `;
      } catch (error) {
        // Show error message
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = 'Failed to send message. Please try again.';
        contactForm.insertBefore(errorElement, submitBtn);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.classList.remove('loading');
      }
    });
  };
  
  // Floating element animation
  const initFloatingElements = () => {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(el => {
      const duration = el.dataset.duration || '3s';
      const delay = el.dataset.delay || '0s';
      
      el.style.animation = `float ${duration} ease-in-out infinite ${delay}`;
    });
  };
  
  // Helper function for debouncing
  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  // Initialize on load
  window.addEventListener('load', () => {
    initFloatingElements();
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLink));
  });
  
  // Update active navigation link based on scroll position
  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
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
      if (link.hash === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };