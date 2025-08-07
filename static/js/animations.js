// ===================================================
// CARROS FUTURISTIC - JavaScript Animations & Interactions
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    // ===================================================
    // 1. ANIMATED BACKGROUND PARTICLES
    // ===================================================
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 20}s linear infinite;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Create floating particles animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) translateX(0); }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // ===================================================
    // 2. SCROLL ANIMATIONS
    // ===================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and form containers
    document.querySelectorAll('.car-card, .form-container, .detail-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // ===================================================
    // 3. DYNAMIC NAVIGATION EFFECTS
    // ===================================================
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 50) {
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
        } else {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        }
    });
    
    // ===================================================
    // 4. CARD HOVER EFFECTS
    // ===================================================
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Create glow effect
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            glow.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: expand 0.5s ease-out forwards;
            `;
            card.appendChild(glow);
            
            setTimeout(() => glow.remove(), 500);
        });
    });
    
    // Glow expansion animation
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        @keyframes expand {
            0% { width: 0; height: 0; opacity: 1; }
            100% { width: 300px; height: 300px; opacity: 0; }
        }
    `;
    document.head.appendChild(glowStyle);
    
    // ===================================================
    // 5. FORM ENHANCEMENTS
    // ===================================================
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="password"], textarea, select');
    
    inputs.forEach(input => {
        // Create floating label effect
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        wrapper.style.position = 'relative';
        
        if (input.parentNode.tagName === 'TD') {
            // For table-based forms
            input.parentNode.style.position = 'relative';
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add ripple effect on focus
        input.addEventListener('focus', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'input-ripple';
            ripple.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 50%;
                height: 2px;
                width: 0;
                background: linear-gradient(90deg, transparent, #00d4ff, transparent);
                transition: width 0.3s ease, left 0.3s ease;
            `;
            this.parentElement.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '100%';
                ripple.style.left = '0';
            }, 10);
        });
        
        input.addEventListener('blur', function() {
            const ripple = this.parentElement.querySelector('.input-ripple');
            if (ripple) {
                ripple.style.opacity = '0';
                setTimeout(() => ripple.remove(), 300);
            }
        });
    });
    
    // ===================================================
    // 6. BUTTON RIPPLE EFFECTS
    // ===================================================
    document.querySelectorAll('.btn, button[type="submit"], input[type="submit"]').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'button-ripple';
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                width: 0;
                height: 0;
                top: ${y}px;
                left: ${x}px;
                animation: rippleEffect 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ===================================================
    // 7. SEARCH BAR ENHANCEMENTS
    // ===================================================
    const searchForm = document.querySelector('.search-form, form[action*="cars_list"]');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="text"]');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                if (this.value.length > 0) {
                    searchForm.classList.add('has-value');
                } else {
                    searchForm.classList.remove('has-value');
                }
            });
            
            // Add search suggestions animation
            searchInput.addEventListener('focus', function() {
                searchForm.classList.add('search-focused');
            });
            
            searchInput.addEventListener('blur', function() {
                setTimeout(() => {
                    searchForm.classList.remove('search-focused');
                }, 200);
            });
        }
    }
    
    // ===================================================
    // 8. IMAGE LAZY LOADING WITH FADE
    // ===================================================
    const images = document.querySelectorAll('.car-card img, .detail-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    this.style.transition = 'opacity 0.5s ease';
                    this.style.opacity = '1';
                });
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================================
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
    
    // ===================================================
    // 10. TOAST NOTIFICATIONS
    // ===================================================
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88, #00cc66)' : 
                          type === 'error' ? 'linear-gradient(135deg, #ff0055, #cc0044)' : 
                          'linear-gradient(135deg, #00d4ff, #0099ff)'};
            color: #0a0e27;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
    
    // ===================================================
    // 11. LOADING SPINNER
    // ===================================================
    window.showLoader = function() {
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Carregando...</div>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10,14,39,0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .loader-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(0,212,255,0.2);
                border-top: 3px solid #00d4ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            .loader-text {
                color: #00d4ff;
                font-size: 1.2rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .loader-content {
                text-align: center;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loaderStyle);
        document.body.appendChild(loader);
    };
    
    window.hideLoader = function() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    };
    
    // ===================================================
    // 12. FORM VALIDATION FEEDBACK
    // ===================================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.style.borderColor = '#ff0055';
                    
                    // Remove error state after user starts typing
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showToast('Por favor, preencha todos os campos obrigatórios', 'error');
            }
        });
    });
    
    // ===================================================
    // 13. DYNAMIC PAGE TRANSITIONS
    // ===================================================
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.includes('#') && !link.target) {
            e.preventDefault();
            const href = link.href;
            
            // Create fade out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
    
    // Fade in on page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('🚗 Carros Futuristic System - Ready');