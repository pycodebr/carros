/**
 * Futuristic Car Management JavaScript Enhancements
 * Modern interactions and animations for the car management application
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    function initializeApp() {
        setupAnimations();
        setupInteractions();
        setupFormEnhancements();
        setupSearchEnhancements();
    }

    // ======================================================================
    // ANIMATIONS
    // ======================================================================
    function setupAnimations() {
        // Stagger animations for grid items
        const gridItems = document.querySelectorAll('.car-grid .car-card, .grid > *');
        gridItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-fade-in');
        });

        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.card, .form-container').forEach(el => {
                observer.observe(el);
            });
        }
    }

    // ======================================================================
    // INTERACTIONS
    // ======================================================================
    function setupInteractions() {
        // Enhanced button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Card hover sound effect (optional - requires audio context)
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle glow effect
                this.style.boxShadow = '0 20px 40px rgba(74, 144, 226, 0.3), 0 0 0 1px rgba(74, 144, 226, 0.4)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ======================================================================
    // FORM ENHANCEMENTS
    // ======================================================================
    function setupFormEnhancements() {
        // Auto-apply form styling to dynamically generated fields
        function styleFormElements() {
            document.querySelectorAll('input, select, textarea').forEach(element => {
                if (!element.classList.contains('styled')) {
                    if (element.type === 'file') {
                        element.classList.add('form-input');
                    } else if (element.tagName === 'SELECT') {
                        element.classList.add('form-select');
                    } else if (element.tagName === 'TEXTAREA') {
                        element.classList.add('form-textarea');
                    } else if (element.type !== 'hidden' && element.type !== 'submit' && element.type !== 'button') {
                        element.classList.add('form-input');
                    }
                    element.classList.add('styled');
                }
            });
        }

        // Initial styling
        styleFormElements();

        // Enhanced form validation feedback
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitButton = this.querySelector('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                    submitButton.style.transform = 'scale(0.95)';
                    submitButton.style.opacity = '0.8';
                    
                    // Add loading indicator
                    const originalText = submitButton.textContent || submitButton.value;
                    if (submitButton.tagName === 'BUTTON') {
                        submitButton.innerHTML = '<span>⏳</span> Processando...';
                    }
                    
                    // Reset after delay (in case form doesn't submit)
                    setTimeout(() => {
                        submitButton.style.transform = '';
                        submitButton.style.opacity = '';
                        if (submitButton.tagName === 'BUTTON') {
                            submitButton.innerHTML = originalText;
                        }
                    }, 3000);
                }
            });
        });

        // Real-time validation feedback
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    }

    // ======================================================================
    // SEARCH ENHANCEMENTS
    // ======================================================================
    function setupSearchEnhancements() {
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput) {
            let searchTimeout;

            // Add search icon animation
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                
                // Add typing indicator
                this.style.background = 'rgba(255, 255, 255, 0.15)';
                
                // Debounce search
                searchTimeout = setTimeout(() => {
                    this.style.background = '';
                }, 500);
            });

            // Auto-focus search on keyboard shortcut
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    searchInput.focus();
                    searchInput.select();
                }
            });
        }
    }

    // ======================================================================
    // UTILITY FUNCTIONS
    // ======================================================================
    
    // Smooth page transitions
    function smoothPageTransition() {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 50);
    }

    // Initialize smooth transitions
    smoothPageTransition();

    // ======================================================================
    // THEME ENHANCEMENTS
    // ======================================================================
    
    // Dynamic background particles (optional enhancement)
    function createBackgroundParticles() {
        const particleCount = window.innerWidth < 768 ? 20 : 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '-1';
            
            // Random position
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        // Animate particles
        function animateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });

            requestAnimationFrame(animateParticles);
        }

        // Start animation (only on desktop for performance)
        if (window.innerWidth > 768) {
            animateParticles();
        }
    }

    // Initialize particles (commented out for performance - enable if needed)
    // createBackgroundParticles();

    // ======================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ======================================================================
    
    // Skip to main content
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            const firstFocusable = document.querySelector('main a, main button, main input, main select, main textarea');
            if (document.activeElement === document.body && firstFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });

    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Export utilities to global scope if needed
    window.CarrosApp = {
        announceToScreenReader,
        smoothPageTransition
    };

})();