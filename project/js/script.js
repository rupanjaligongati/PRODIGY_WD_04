// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('projects');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Scroll reveal animations
    function revealOnScroll() {
        const revealer = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealer.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }

    // Add fade-in class to sections for scroll reveal
    const sections = ['.about-section', '.skills-section', '.projects-section', '.contact-section'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('fade-in');
        }
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on page load

    // Skills progress bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.querySelector('.skills-section');
        
        if (!skillsSection) return;
        
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsSectionTop < windowHeight - 100) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            
            // Remove the event listener to prevent repeated animations
            window.removeEventListener('scroll', animateSkillBars);
        }
    }

    window.addEventListener('scroll', animateSkillBars);

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link (since we're using pure HTML/CSS/JS)
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:rupanjaligongati@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client will open with the pre-filled message.');
        
        // Reset form
        contactForm.reset();
    });

    // Typing effect for the home title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Enhanced scroll animations with stagger effect
    function staggerReveal() {
        const elements = document.querySelectorAll('.project-card, .skill-item, .tool-item');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }

    // Initialize stagger animation styles
    document.querySelectorAll('.project-card, .skill-item, .tool-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', staggerReveal);
    staggerReveal(); // Check on page load

    // Parallax effect for home section (subtle)
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const homeSection = document.querySelector('.home-section');
        
        if (homeSection && scrolled < window.innerHeight) {
            homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);

    // Initialize all animations and effects
    highlightActiveSection();
    toggleBackToTop();
    revealOnScroll();
});

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any additional scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});

// Add subtle cursor effects (optional enhancement)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add loading states for external content
function showLoadingState(element) {
    element.innerHTML = '<div class="loading-spinner">Loading...</div>';
}

function hideLoadingState(element, content) {
    element.innerHTML = content;
}

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});