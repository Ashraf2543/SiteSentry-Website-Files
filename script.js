document.addEventListener('DOMContentLoaded', function() {
  // Set current year in the footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
  
  // FAQ Accordion
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      // Close all accordions
      accordionButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.nextElementSibling.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        this.classList.add('active');
        content.classList.add('active');
      }
    });
  });
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip links that don't actually link to anything
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate header height
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        // Scroll to element with header offset
        const yOffset = -headerHeight - 20; // Extra 20px for padding
        const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
  // Add active state to buttons on hover
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  // Add scroll class to header when scrolling
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  // Initialize animation on scroll
  const animatedElements = document.querySelectorAll('.feature-card, .step-card');
  
  function checkIfInView() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.classList.add('animate-in');
      }
    });
  }
  // Add CSS for animation
  const style = document.createElement('style');
  style.textContent = `
    .feature-card, .step-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  // Run on load and scroll
  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);
  window.addEventListener('load', checkIfInView);
  
  // Initialize animation with delay for staggered effect
  setTimeout(checkIfInView, 100);
});