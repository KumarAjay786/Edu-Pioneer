// Sticky Navbar on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Search Bar Toggle (Mobile)
// const searchBtn = document.querySelector('.search-btn');
// const searchInput = document.querySelector('.search-input');

// searchBtn.addEventListener('click', function() {
//     if (window.innerWidth < 992) {
//         searchInput.classList.toggle('active');
//         if (searchInput.classList.contains('active')) {
//             searchInput.style.width = '100%';
//             searchInput.style.padding = '8px 15px';
//             searchInput.style.opacity = '1';
//         } else {
//             searchInput.style.width = '0';
//             searchInput.style.padding = '0';
//             searchInput.style.opacity = '0';
//         }
//     }
// });

// Typing Animation for Hero Title
const typewriter = document.getElementById('typewriter');
const text = "Unlock Your Academic Potential with Expert Guidance";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriter.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = typeWriter;

// Start animation when page loads
window.addEventListener('load', typeWriter);

// Scroll Animation for Service Cards
const serviceCards = document.querySelectorAll('.service-card');

function checkScroll() {
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}

// Run on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Why Choose Us - Unique JS
document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    function wcAnimateCounters() {
      const counters = document.querySelectorAll('.wc-counter');
      const speed = 200;
      
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText.replace('+', '');
        const increment = target / speed;
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(wcAnimateCounters, 1);
        } else {
          counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
        }
      });
    }
  
    // Scroll Animation Trigger
    function wcCheckScroll() {
      const statCards = document.querySelectorAll('.wc-stat-card');
      const testimonialCards = document.querySelectorAll('.wc-testimonial-card');
      const triggerPoint = window.innerHeight / 5 * 4;
  
      // Animate stat cards
      statCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerPoint) {
          card.classList.add('wc-visible');
          wcAnimateCounters();
        }
      });
  
      // Animate testimonial cards with delay
      testimonialCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerPoint) {
          setTimeout(() => {
            card.classList.add('wc-visible');
          }, index * 150);
        }
      });
    }
  
    // Initial check
    wcCheckScroll();
    
    // Check on scroll
    window.addEventListener('scroll', wcCheckScroll);
  });

  // Success Stories Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.ss-tab-btn');
    const tabContents = document.querySelectorAll('.ss-tab-content');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons/contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // Testimonial card hover effect enhancement
    const testimonialCards = document.querySelectorAll('.ss-testimonial-card');
    
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 40px rgba(78, 154, 241, 0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
      });
    });
  });

  // Enhanced About Us Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate features on scroll
    const features = document.querySelectorAll('.au-features li');
    const stats = document.querySelectorAll('.au-stat-item');
    
    function animateElements() {
      const triggerBottom = window.innerHeight / 5 * 4;
      
      features.forEach((feature, index) => {
        const featureTop = feature.getBoundingClientRect().top;
        if (featureTop < triggerBottom) {
          setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
      
      stats.forEach((stat, index) => {
        const statTop = stat.getBoundingClientRect().top;
        if (statTop < triggerBottom) {
          setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'scale(1)';
          }, index * 150);
        }
      });
    }
    
    // Set initial state
    features.forEach(feature => {
      feature.style.opacity = '0';
      feature.style.transform = 'translateY(20px)';
      feature.style.transition = 'all 0.5s ease';
    });
    
    stats.forEach(stat => {
      stat.style.opacity = '0';
      stat.style.transform = 'scale(0.9)';
      stat.style.transition = 'all 0.5s ease';
    });
    
    // Run animations
    animateElements();
    window.addEventListener('scroll', animateElements);
    
    // Team member hover effects
    const members = document.querySelectorAll('.au-member');
    members.forEach(member => {
      member.addEventListener('mouseenter', () => {
        member.querySelector('.au-member-img').style.transform = 'rotate(-2deg)';
      });
      member.addEventListener('mouseleave', () => {
        member.querySelector('.au-member-img').style.transform = 'rotate(0)';
      });
    });
  });

  // Contact Form Animation
document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    
    // Animate form elements on scroll
    function animateForm() {
      formGroups.forEach((group, index) => {
        const groupTop = group.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (groupTop < windowHeight - 100) {
          setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }
    
    // Set initial state
    formGroups.forEach(group => {
      group.style.opacity = '0';
      group.style.transform = 'translateY(20px)';
      group.style.transition = 'all 0.5s ease';
    });
    
    // Run on load and scroll
    animateForm();
    window.addEventListener('scroll', animateForm);
    
    // Contact info item animation
    const contactItems = document.querySelectorAll('.contact-info-item');
    contactItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 200);
    });
  });

  // Footer Animation
document.addEventListener('DOMContentLoaded', function() {
  // Floating social icons
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach((link, index) => {
    link.style.animation = `float 3s ease-in-out ${index * 0.1}s infinite alternate`;
  });
  
  // Add wave animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
  
  // Animate badges on scroll
  const badges = document.querySelectorAll('.footer-badges span');
  
  function animateBadges() {
    badges.forEach((badge, index) => {
      const badgeTop = badge.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (badgeTop < windowHeight - 50) {
        setTimeout(() => {
          badge.style.opacity = '1';
          badge.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }
  
  // Set initial state
  badges.forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    badge.style.transition = 'all 0.5s ease';
  });
  
  // Run animations
  animateBadges();
  window.addEventListener('scroll', animateBadges);
});

// Typewriter effect for subheading
document.addEventListener('DOMContentLoaded', function() {
      const subheading = document.querySelector('.about_page-subheading');
      const text = "Guiding Your Educational Journey with Expertise & Passion ";
      let i = 0;
      
      function typeWriter() {
        if (i < text.length) {
          subheading.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }
      
      // Start after heading animation completes
      setTimeout(typeWriter, 1800);
      
      // Parallax effect on scroll
      window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const bg = document.querySelector('.about_page-bg');
        bg.style.transform = `scale(${1.05 + scrollPosition * 0.0002})`;
      });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Counter animation for stats
        const counters = document.querySelectorAll('.about_page-stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText;
          const increment = target / speed;
          
          if(count < target) {
            const updateCount = () => {
              const newCount = Math.ceil(count + increment);
              counter.innerText = newCount;
              if(newCount < target) {
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target + '+';
              }
            };
            setTimeout(updateCount, 1500);
          }
        });
        
        // Image hover effect
        const imageWrapper = document.querySelector('.about_page-wwa-image-wrapper');
        if(imageWrapper) {
          imageWrapper.addEventListener('mouseenter', () => {
            imageWrapper.querySelector('.about_page-wwa-image').style.transform = 'scale(1.05)';
          });
          imageWrapper.addEventListener('mouseleave', () => {
            imageWrapper.querySelector('.about_page-wwa-image').style.transform = 'scale(1)';
          });
        }
      });

      document.addEventListener('DOMContentLoaded', function() {
        // Floating particles animation
        const particleOverlay = document.querySelector('.about_page-mv-particle-overlay');
        if (particleOverlay) {
          for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            particle.style.background = i % 2 === 0 ? '#4CAF50' : '#1a3a8f';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            particleOverlay.appendChild(particle);
            
            // Animate particles
            animateParticle(particle);
          }
        }
        
        function animateParticle(particle) {
          const duration = Math.random() * 20000 + 10000;
          const xMovement = Math.random() * 100 - 50;
          const yMovement = Math.random() * 100 - 50;
          
          particle.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${xMovement}px, ${yMovement}px)` }
          ], {
            duration: duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
          });
        }
        
        // 3D tilt effect on blocks
        const blocks = document.querySelectorAll('.about_page-mission-block, .about_page-vision-block');
        blocks.forEach(block => {
          block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 25;
            const angleY = (centerX - x) / 25;
            
            block.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
          });
          
          block.addEventListener('mouseleave', () => {
            block.style.transform = 'rotateX(0) rotateY(0) translateY(-10px)';
          });
        });
      });

      document.addEventListener('DOMContentLoaded', function() {
        // Add hover effect to image wrapper
        const imgWrapper = document.querySelector('.ep-img-wrapper');
        if(imgWrapper) {
            imgWrapper.addEventListener('mouseenter', function() {
                this.querySelector('.ep-content-img').style.transform = 'scale(1.03)';
            });
            imgWrapper.addEventListener('mouseleave', function() {
                this.querySelector('.ep-content-img').style.transform = 'scale(1)';
            });
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
      // Add animation class to elements when they come into view
      const animateOnScroll = function() {
          const elements = document.querySelectorAll('.edup-animate');
          elements.forEach(element => {
              const elementPosition = element.getBoundingClientRect().top;
              const windowHeight = window.innerHeight;
              
              if (elementPosition < windowHeight - 100) {
                  element.style.animationDelay = element.dataset.delay || '0s';
                  element.classList.add('edup-animate');
              }
          });
      };

      // Run once on load
      animateOnScroll();
      
      // Run on scroll
      window.addEventListener('scroll', animateOnScroll);
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Animation for section divider on scroll
    const divider = document.querySelector('.edup-section-divider');
    
    const animateDivider = function() {
      if (isElementInViewport(divider)) {
        divider.style.width = '150px';
        window.removeEventListener('scroll', animateDivider);
      }
    };

    window.addEventListener('scroll', animateDivider);
    animateDivider(); // Run once on load

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach((card, index) => {
        // Add delay based on index
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Initially hide cards for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // Animate cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    benefitCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.innerHTML = '<i class="fas fa-calendar-alt me-2"></i> Book Free Consultation';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.textContent = 'Book Free Consultation';
        });
    }
});