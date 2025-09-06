// Furniture Business Website - Complete JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Configuration
  const config = {
    whatsappNumber: '+919876543210', // Replace with your WhatsApp number
    phoneNumber: '+919876543210'     // Replace with your phone number
  };

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Navbar scroll effects
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Background opacity based on scroll
    if (scrollTop > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(15px)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Gallery filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // Filter gallery items with animation
        galleryItems.forEach((item, index) => {
          item.style.transition = 'all 0.3s ease';

          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            setTimeout(() => {
              item.style.display = 'block';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, index * 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Product enquiry functionality
  document.querySelectorAll('.btn-enquire').forEach(button => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.product-price').textContent;

      const message = `🛋️ *Furniture Inquiry*

*Product:* ${productName}
*Price Range:* ${productPrice}

Hi! I'm interested in this furniture piece. Could you please provide more details about:
- Available designs and colors
- Material specifications
- Delivery timeframe
- Custom size options

Thank you!`;

      const encodedMessage = encodeURIComponent(message);

      // Add loading state
      button.classList.add('loading');
      button.textContent = 'Opening WhatsApp...';

      setTimeout(() => {
        window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
        button.classList.remove('loading');
        button.textContent = 'Enquire Now';
      }, 1000);
    });
  });

  // Custom furniture form handling
  const customForm = document.querySelector('#customForm');
  if (customForm) {
    customForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const name = this.querySelector('input[type="text"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const furnitureType = this.querySelector('select').value;
      const size = this.querySelectorAll('input[type="text"]')[1].value;
      const material = this.querySelectorAll('select')[1].value;
      const description = this.querySelector('textarea').value;

      // Basic validation
      if (!name || !phone || !email || !furnitureType || !description) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Submit button loading state
      const submitBtn = this.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending Quote Request...';

      // Create WhatsApp message
      const whatsappMessage = `🛠️ *Custom Furniture Quote Request*

*Customer Details:*
Name: ${name}
Phone: ${phone}
Email: ${email}

*Furniture Specifications:*
Type: ${furnitureType}
Size: ${size || 'To be discussed'}
Material: ${material || 'To be discussed'}

*Description:*
${description}

Please provide a detailed quote for this custom furniture request. Thank you!`;

      const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

      // Simulate form processing
      setTimeout(() => {
        // Open WhatsApp
        window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedWhatsAppMessage}`, '_blank');

        // Reset form and button
        this.reset();
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;

        showNotification('Quote request sent successfully! We\'ll contact you soon.', 'success');
      }, 2000);
    });
  }

  // Contact form handling
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const inquiryType = this.querySelector('select').value;
      const message = this.querySelector('textarea').value;

      // Basic validation
      if (!name || !email || !phone || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Submit button loading state
      const submitBtn = this.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending Message...';

      // Create WhatsApp message
      const whatsappMessage = `📞 *Contact Form Submission*

*Customer Details:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Inquiry Type: ${inquiryType || 'General Inquiry'}

*Message:*
${message}

Please respond to this inquiry at your earliest convenience.`;

      const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

      // Simulate form processing
      setTimeout(() => {
        // Open WhatsApp
        window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedWhatsAppMessage}`, '_blank');

        // Reset form and button
        this.reset();
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;

        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      }, 2000);
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector('#backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Enhanced lightbox functionality with real images
  window.openLightbox = function (imageUrl) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');

    if (lightbox && lightboxImage) {
      // Create new image element
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Gallery Image';
      img.style.cssText = 'max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 10px;';

      // Clear previous content and add new image
      lightboxImage.innerHTML = '';
      lightboxImage.appendChild(img);

      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Image lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.product-card, .service-card, .testimonial-card, .gallery-item, .info-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // Enhanced floating action buttons
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const callFloat = document.querySelector('.call-float');

  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function (e) {
      e.preventDefault();

      const defaultMessage = `🛋️ Hi! I found your furniture business online and I'm interested in your products and services.

I would like to know more about:
- Available furniture collections
- Custom furniture options
- Pricing and delivery
- Showroom visit timing

Please let me know your availability. Thank you!`;

      const encodedMessage = encodeURIComponent(defaultMessage);
      window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

    // Add notification styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#8B4513' : type === 'error' ? '#DC2626' : '#8B4513'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            font-family: var(--font-secondary);
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Add CSS animations for notifications
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(notificationStyles);

  // Scroll event listeners with debouncing
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(highlightNavigation, 10);
  });

  // Performance optimization
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      highlightNavigation();
    }, 250);
  });

  // Initialize everything
  highlightNavigation();

  // Show welcome message
  setTimeout(() => {
    showNotification('Welcome to WoodCraft Furniture! 🛋️', 'success');
  }, 2000);

  // Keyboard navigation support
  document.addEventListener('keydown', function (e) {
    // Close lightbox with Escape key
    if (e.key === 'Escape') {
      const lightbox = document.getElementById('lightbox');
      if (lightbox && lightbox.style.display === 'block') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('SW registered: ', registration);
      })
      .catch(function (registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Error handling
window.addEventListener('error', function (e) {
  console.error('JavaScript Error:', e.error);
});

// Utility functions
const utils = {
  // Format phone number
  formatPhoneNumber: function (phone) {
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  },

  // Validate email
  validateEmail: function (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Get device type
  getDeviceType: function () {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  }
};

// Export utils for external use if needed
window.FurnitureWebsiteUtils = utils;
