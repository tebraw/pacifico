// Main JavaScript - Global functionality and utilities

class PacificoApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.loadStoredData();
    }

    setupEventListeners() {
        // Navigation toggle for mobile
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Villa favorite functionality
        const favoriteButtons = document.querySelectorAll('.villa-favorite');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleFavorite(button);
            });
        });

        // Gallery image switching
        const galleryThumbs = document.querySelectorAll('.gallery-thumb');
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                this.switchGalleryImage(thumb);
            });
        });
    }

    initializeComponents() {
        // Initialize any components that need setup
        this.initScrollAnimation();
        this.initImageLazyLoading();
    }

    loadStoredData() {
        // Load any data from localStorage
        const favorites = this.getFavorites();
        this.updateFavoriteButtons(favorites);
    }

    // Favorite functionality
    toggleFavorite(button) {
        const villa = button.closest('.villa-detail-card').id;
        let favorites = this.getFavorites();
        
        if (favorites.includes(villa)) {
            favorites = favorites.filter(fav => fav !== villa);
            button.innerHTML = '♡ Zu Favoriten';
            button.classList.remove('active');
        } else {
            favorites.push(villa);
            button.innerHTML = '♥ Favorit';
            button.classList.add('active');
        }
        
        localStorage.setItem('pacifico_favorites', JSON.stringify(favorites));
        this.showNotification(`${villa === 'villa-pacifica' ? 'Villa Pacifica' : 'Villa Serenidad'} ${favorites.includes(villa) ? 'zu Favoriten hinzugefügt' : 'aus Favoriten entfernt'}`);
    }

    getFavorites() {
        const stored = localStorage.getItem('pacifico_favorites');
        return stored ? JSON.parse(stored) : [];
    }

    updateFavoriteButtons(favorites) {
        const favoriteButtons = document.querySelectorAll('.villa-favorite');
        favoriteButtons.forEach(button => {
            const villa = button.closest('.villa-detail-card').id;
            if (favorites.includes(villa)) {
                button.innerHTML = '♥ Favorit';
                button.classList.add('active');
            }
        });
    }

    // Gallery functionality
    switchGalleryImage(thumb) {
        const gallery = thumb.closest('.villa-images');
        const mainImage = gallery.querySelector('.main-image .placeholder-image span');
        const newImageText = thumb.querySelector('span').textContent;
        
        // Remove active class from all thumbs
        gallery.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumb
        thumb.classList.add('active');
        
        // Update main image
        mainImage.textContent = newImageText;
        
        // Add animation effect
        const mainImageContainer = gallery.querySelector('.main-image .placeholder-image');
        mainImageContainer.style.opacity = '0.7';
        setTimeout(() => {
            mainImageContainer.style.opacity = '1';
        }, 150);
    }

    // Scroll animations
    initScrollAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.villa-card, .activity-card, .booking-section');
        animateElements.forEach(el => {
            el.classList.add('animate-fade-up');
            observer.observe(el);
        });
    }

    // Lazy loading for images (placeholder for real images)
    initImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        const placeholderImages = document.querySelectorAll('.placeholder-image');
        placeholderImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Utility functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '1070',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '300px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out'
        });
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.padding = '0';
        closeBtn.style.marginLeft = 'auto';
        
        const closeNotification = () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeNotification);
        
        // Auto close after 5 seconds
        setTimeout(closeNotification, 5000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date));
    }

    generateBookingReference() {
        const prefix = 'PAC';
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 9000) + 1000;
        return `${prefix}-${year}-${random}`;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    debounce(func, wait) {
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
}

// Animation CSS for scroll effects
const animationCSS = `
.animate-fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-fade-up.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.placeholder-image {
    transition: opacity 0.3s ease;
}

.placeholder-image.loaded {
    opacity: 1;
}

.notification {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.villa-favorite.active {
    background: var(--accent-color) !important;
    color: white !important;
    border-color: var(--accent-color) !important;
}
`;

// Add animation styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pacificoApp = new PacificoApp();
});

// Export for use in other files
window.PacificoApp = PacificoApp;