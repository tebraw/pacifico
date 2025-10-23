// Activities System - Drag & Drop, Filtering, and Cart Management

class ActivitiesSystem {
    constructor() {
        this.activities = {
            'atv-tour': { name: 'ATV Adventure Tour', price: 120, category: 'adventure' },
            'zip-line': { name: 'Canopy Zip Line', price: 85, category: 'adventure' },
            'yoga-session': { name: 'Private Yoga Session', price: 80, category: 'wellness' },
            'massage': { name: 'Wellness Massage', price: 150, category: 'wellness' },
            'meditation': { name: 'Guided Meditation', price: 60, category: 'wellness' },
            'catamaran-tour': { name: 'Catamaran Sunset Tour', price: 200, category: 'water' },
            'snorkeling': { name: 'Snorkeling Expedition', price: 95, category: 'water' },
            'cooking-class': { name: 'Local Cooking Class', price: 120, category: 'culture' },
            'village-tour': { name: 'Cultural Village Tour', price: 75, category: 'culture' }
        };
        
        this.cart = [];
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.loadCartData();
        this.updateUI();
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filterActivities(button.getAttribute('data-category'));
            });
        });

        // Cart toggle
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => {
                this.toggleCart();
            });
        }

        // Clear cart
        const clearCartButton = document.getElementById('clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
                this.clearCart();
            });
        }

        // Proceed to booking
        const proceedButton = document.getElementById('proceed-booking');
        if (proceedButton) {
            proceedButton.addEventListener('click', () => {
                this.proceedToBooking();
            });
        }

        // Activity cards click (as alternative to drag)
        const activityCards = document.querySelectorAll('.activity-card');
        activityCards.forEach(card => {
            // Double-click to add to cart
            card.addEventListener('dblclick', () => {
                const activityId = card.getAttribute('data-activity');
                this.addToCart(activityId);
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('dragging')) {
                    card.style.transform = 'translateY(-8px)';
                    card.style.boxShadow = 'var(--shadow-luxury)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('dragging')) {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }
            });
        });
    }

    setupDragAndDrop() {
        const draggableCards = document.querySelectorAll('.activity-card.draggable');
        const dropZone = document.querySelector('.drop-zone');
        const cartItems = document.getElementById('cart-items');

        // Make cards draggable
        draggableCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                card.classList.add('dragging');
                e.dataTransfer.setData('text/plain', card.getAttribute('data-activity'));
                e.dataTransfer.effectAllowed = 'copy';
                
                // Create custom drag image
                const dragImage = card.cloneNode(true);
                dragImage.style.transform = 'rotate(5deg)';
                dragImage.style.opacity = '0.8';
                document.body.appendChild(dragImage);
                e.dataTransfer.setDragImage(dragImage, e.offsetX, e.offsetY);
                
                // Remove the drag image after a short delay
                setTimeout(() => {
                    document.body.removeChild(dragImage);
                }, 0);
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        });

        // Setup drop zones
        [dropZone, cartItems].forEach(zone => {
            if (!zone) return;
            
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                // Only remove drag-over if we're actually leaving the zone
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove('drag-over');
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const activityId = e.dataTransfer.getData('text/plain');
                this.addToCart(activityId);
            });
        });

        // Prevent default drag behavior on document
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('drop', (e) => {
            e.preventDefault();
        });
    }

    filterActivities(category) {
        this.currentFilter = category;
        
        // Update filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-category') === category) {
                button.classList.add('active');
            }
        });

        // Filter activity cards
        const activityCards = document.querySelectorAll('.activity-card');
        activityCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Animate in
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    addToCart(activityId) {
        if (!this.activities[activityId]) {
            console.error('Activity not found:', activityId);
            return;
        }

        // Check if already in cart
        const existingItem = this.cart.find(item => item.id === activityId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: activityId,
                name: this.activities[activityId].name,
                price: this.activities[activityId].price,
                quantity: 1
            });
        }

        this.updateCartUI();
        this.saveCartData();
        this.showCartNotification(this.activities[activityId].name);
        
        // Auto-show cart
        this.showCart();
        
        // Add visual feedback to the card
        const card = document.querySelector(`[data-activity="${activityId}"]`);
        if (card) {
            this.addCardAnimation(card);
        }
    }

    removeFromCart(activityId) {
        this.cart = this.cart.filter(item => item.id !== activityId);
        this.updateCartUI();
        this.saveCartData();
        
        const activityName = this.activities[activityId]?.name || 'Aktivität';
        window.pacificoApp.showNotification(`${activityName} aus dem Warenkorb entfernt`, 'info');
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.querySelector('.cart-empty');
        const activitiesTotal = document.getElementById('activities-total');
        const grandTotal = document.getElementById('grand-total');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }

        // Update cart items display
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <p>Ziehen Sie Aktivitäten hierher</p>
                        <div class="drop-zone">
                            <span class="drop-icon">⬇️</span>
                            <span>Drop Zone</span>
                        </div>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item" data-activity="${item.id}">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${window.pacificoApp.formatCurrency(item.price)} ${item.quantity > 1 ? `x ${item.quantity}` : ''}</div>
                        </div>
                        <button class="cart-item-remove" onclick="window.activitiesSystem.removeFromCart('${item.id}')">
                            ×
                        </button>
                    </div>
                `).join('');
                
                // Re-setup drop zone for cart items
                this.setupDropZoneForCartItems();
            }
        }

        // Update totals
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (activitiesTotal) {
            activitiesTotal.textContent = window.pacificoApp.formatCurrency(total);
        }

        // Update booking system if available
        if (window.bookingSystem) {
            window.bookingSystem.bookingData.totals.activities = total;
            window.bookingSystem.bookingData.activities = this.cart;
            window.bookingSystem.updateTotals();
            window.bookingSystem.saveBookingData();
        }

        // Update proceed button state
        const proceedButton = document.getElementById('proceed-booking');
        if (proceedButton) {
            proceedButton.disabled = this.cart.length === 0;
            proceedButton.textContent = this.cart.length === 0 ? 'Aktivitäten hinzufügen' : 'Zur Buchung';
        }
    }

    setupDropZoneForCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        cartItems.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            cartItems.classList.add('drag-over');
        });

        cartItems.addEventListener('dragleave', (e) => {
            if (!cartItems.contains(e.relatedTarget)) {
                cartItems.classList.remove('drag-over');
            }
        });

        cartItems.addEventListener('drop', (e) => {
            e.preventDefault();
            cartItems.classList.remove('drag-over');
            
            const activityId = e.dataTransfer.getData('text/plain');
            this.addToCart(activityId);
        });
    }

    addCardAnimation(card) {
        // Create a clone for animation
        const clone = card.cloneNode(true);
        const cartToggle = document.getElementById('cart-toggle');
        
        if (!cartToggle) return;

        // Position clone at card position
        const cardRect = card.getBoundingClientRect();
        const cartRect = cartToggle.getBoundingClientRect();
        
        clone.style.position = 'fixed';
        clone.style.top = cardRect.top + 'px';
        clone.style.left = cardRect.left + 'px';
        clone.style.width = cardRect.width + 'px';
        clone.style.height = cardRect.height + 'px';
        clone.style.zIndex = '9999';
        clone.style.pointerEvents = 'none';
        clone.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        document.body.appendChild(clone);
        
        // Animate to cart
        setTimeout(() => {
            clone.style.transform = `translate(${cartRect.left - cardRect.left}px, ${cartRect.top - cardRect.top}px) scale(0.1)`;
            clone.style.opacity = '0';
        }, 50);
        
        // Remove clone after animation
        setTimeout(() => {
            document.body.removeChild(clone);
        }, 650);
        
        // Add bounce effect to original card
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    showCartNotification(activityName) {
        window.pacificoApp.showNotification(`${activityName} zum Warenkorb hinzugefügt`, 'success');
    }

    toggleCart() {
        const cart = document.getElementById('activity-cart');
        if (cart) {
            cart.classList.toggle('active');
        }
    }

    showCart() {
        const cart = document.getElementById('activity-cart');
        if (cart) {
            cart.classList.add('active');
        }
    }

    hideCart() {
        const cart = document.getElementById('activity-cart');
        if (cart) {
            cart.classList.remove('active');
        }
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        const confirmClear = confirm('Möchten Sie wirklich alle Aktivitäten aus dem Warenkorb entfernen?');
        if (confirmClear) {
            this.cart = [];
            this.updateCartUI();
            this.saveCartData();
            window.pacificoApp.showNotification('Warenkorb geleert', 'info');
        }
    }

    proceedToBooking() {
        if (this.cart.length === 0) {
            window.pacificoApp.showNotification('Bitte wählen Sie mindestens eine Aktivität aus', 'error');
            return;
        }

        // Save current cart data
        this.saveCartData();
        
        // Update booking system
        if (window.bookingSystem) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            window.bookingSystem.bookingData.activities = this.cart;
            window.bookingSystem.bookingData.totals.activities = total;
            window.bookingSystem.updateTotals();
            window.bookingSystem.saveBookingData();
        }
        
        // Redirect to booking page
        window.location.href = 'booking.html';
    }

    loadCartData() {
        const stored = localStorage.getItem('pacifico_activities_cart');
        if (stored) {
            this.cart = JSON.parse(stored);
        }
        
        // Also load from booking system if available
        if (window.bookingSystem && window.bookingSystem.bookingData.activities) {
            this.cart = window.bookingSystem.bookingData.activities;
        }
    }

    saveCartData() {
        localStorage.setItem('pacifico_activities_cart', JSON.stringify(this.cart));
    }

    updateUI() {
        this.updateCartUI();
        
        // Show cart if on activities page and has items
        if (this.cart.length > 0 && document.getElementById('activity-cart')) {
            setTimeout(() => {
                this.showCart();
            }, 1000);
        }
    }

    // Method to load activities summary on booking page
    loadActivitiesSummary() {
        const activitiesSummary = document.getElementById('activities-summary');
        const noActivities = document.querySelector('.no-activities');
        
        if (!activitiesSummary) return;
        
        if (this.cart.length === 0) {
            if (noActivities) {
                noActivities.style.display = 'block';
            }
            activitiesSummary.innerHTML = '<p class="no-activities">Keine Aktivitäten ausgewählt</p>';
        } else {
            if (noActivities) {
                noActivities.style.display = 'none';
            }
            
            activitiesSummary.innerHTML = this.cart.map(item => `
                <div class="activity-summary-item">
                    <div class="activity-summary-info">
                        <h4>${item.name}</h4>
                        <p>${item.quantity > 1 ? `${item.quantity}x ` : ''}${window.pacificoApp.formatCurrency(item.price)}${item.quantity > 1 ? ` (${window.pacificoApp.formatCurrency(item.price * item.quantity)} gesamt)` : ''}</p>
                    </div>
                </div>
            `).join('');
        }
        
        // Update activities total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const activitiesTotalElement = document.getElementById('activities-total-price');
        if (activitiesTotalElement) {
            activitiesTotalElement.textContent = window.pacificoApp.formatCurrency(total);
        }
    }
}

// Add CSS for animations
const activitiesAnimationCSS = `
.activity-card {
    transition: all 0.3s ease;
}

.activity-card.dragging {
    opacity: 0.5;
    transform: rotate(5deg) scale(1.05);
    z-index: 1000;
}

.drop-zone.drag-over {
    transform: scale(1.02);
    border-color: var(--accent-color);
    background: rgba(16, 185, 129, 0.1);
}

.cart-item {
    animation: slideInCart 0.3s ease-out;
}

@keyframes slideInCart {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.cart-items.drag-over {
    background: rgba(37, 99, 235, 0.05);
    border-radius: var(--radius-lg);
}

.activity-summary-item {
    background: var(--gray-50);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-3);
}

.activity-summary-item h4 {
    margin-bottom: var(--space-2);
    color: var(--gray-900);
}

.activity-summary-item p {
    margin: 0;
    color: var(--gray-600);
    font-size: var(--font-size-sm);
}
`;

// Add activities animation styles to head
const activitiesStyleSheet = document.createElement('style');
activitiesStyleSheet.textContent = activitiesAnimationCSS;
document.head.appendChild(activitiesStyleSheet);

// Initialize activities system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.activitiesSystem = new ActivitiesSystem();
    
    // Load activities summary if on booking page
    if (document.getElementById('activities-summary')) {
        setTimeout(() => {
            window.activitiesSystem.loadActivitiesSummary();
        }, 100);
    }
});