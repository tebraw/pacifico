// Booking System - Villa selection, date management, and booking flow

class BookingSystem {
    constructor() {
        this.selectedVilla = null;
        this.bookingData = {
            villa: null,
            dates: {
                checkin: null,
                checkout: null
            },
            guests: null,
            activities: [],
            guestInfo: {},
            payment: {},
            totals: {
                villa: 0,
                activities: 0,
                taxes: 0,
                total: 0
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadBookingData();
        this.updateUI();
    }

    setupEventListeners() {
        // Villa selection
        const villaSelectButtons = document.querySelectorAll('.villa-select');
        villaSelectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const villaId = button.getAttribute('data-villa');
                this.selectVilla(villaId);
            });
        });

        // Date inputs
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        const guestsSelect = document.getElementById('guests');

        if (checkinInput) {
            checkinInput.addEventListener('change', (e) => {
                this.updateDates('checkin', e.target.value);
            });
        }

        if (checkoutInput) {
            checkoutInput.addEventListener('change', (e) => {
                this.updateDates('checkout', e.target.value);
            });
        }

        if (guestsSelect) {
            guestsSelect.addEventListener('change', (e) => {
                this.updateGuests(e.target.value);
            });
        }

        // Continue to activities button
        const continueButton = document.getElementById('continue-booking');
        if (continueButton) {
            continueButton.addEventListener('click', () => {
                this.proceedToActivities();
            });
        }

        // Complete booking button
        const completeBookingButton = document.getElementById('complete-booking');
        if (completeBookingButton) {
            completeBookingButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.completeBooking();
            });
        }

        // Terms checkbox
        const termsCheckbox = document.getElementById('terms-accepted');
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', () => {
                this.validateFinalBooking();
            });
        }

        // Guest form validation
        const guestForm = document.getElementById('guest-form');
        if (guestForm) {
            const formInputs = guestForm.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                input.addEventListener('input', () => {
                    this.validateGuestForm();
                });
            });
        }

        // Payment method selection
        const paymentOptions = document.querySelectorAll('input[name="payment"]');
        paymentOptions.forEach(option => {
            option.addEventListener('change', () => {
                this.handlePaymentMethodChange(option.value);
            });
        });

        // Credit card form
        this.setupCreditCardForm();
    }

    selectVilla(villaId) {
        this.bookingData.villa = villaId;
        this.selectedVilla = villaId;
        
        // Update UI
        this.updateSelectedVillaDisplay();
        this.calculateVillaPricing();
        this.updateBookingSidebar();
        
        // Save to localStorage
        this.saveBookingData();
        
        // Show notification
        const villaName = villaId === 'pacifica' ? 'Villa Pacifica' : 'Villa Serenidad';
        window.pacificoApp.showNotification(`${villaName} ausgewählt`, 'success');
        
        // Show sidebar
        this.showBookingSidebar();
    }

    updateDates(type, value) {
        this.bookingData.dates[type] = value;
        
        // Validate dates
        if (type === 'checkin') {
            const checkoutInput = document.getElementById('checkout');
            if (checkoutInput) {
                checkoutInput.min = value;
                
                // If checkout is before checkin, clear it
                if (this.bookingData.dates.checkout && this.bookingData.dates.checkout <= value) {
                    this.bookingData.dates.checkout = null;
                    checkoutInput.value = '';
                }
            }
        }
        
        this.calculateVillaPricing();
        this.updateBookingSidebar();
        this.saveBookingData();
    }

    updateGuests(guestCount) {
        this.bookingData.guests = guestCount;
        this.updateBookingSidebar();
        this.saveBookingData();
    }

    calculateVillaPricing() {
        if (!this.bookingData.villa || !this.bookingData.dates.checkin || !this.bookingData.dates.checkout) {
            this.bookingData.totals.villa = 0;
            return;
        }

        const checkin = new Date(this.bookingData.dates.checkin);
        const checkout = new Date(this.bookingData.dates.checkout);
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            this.bookingData.totals.villa = 0;
            return;
        }

        // Villa pricing (simplified - in real app this would come from API)
        const pricing = {
            pacifica: {
                high: 1200,
                low: 800
            },
            serenidad: {
                high: 1000,
                low: 650
            }
        };

        // Simple season detection (June-August = high season)
        const month = checkin.getMonth();
        const isHighSeason = month >= 5 && month <= 7; // June, July, August
        
        const villaData = pricing[this.bookingData.villa];
        const nightlyRate = isHighSeason ? villaData.high : villaData.low;
        
        this.bookingData.totals.villa = nightlyRate * nights;
        this.updateTotals();
    }

    updateTotals() {
        const subtotal = this.bookingData.totals.villa + this.bookingData.totals.activities;
        this.bookingData.totals.taxes = Math.round(subtotal * 0.19); // 19% VAT
        this.bookingData.totals.total = subtotal + this.bookingData.totals.taxes;
        
        this.updatePriceDisplay();
    }

    updatePriceDisplay() {
        const elements = {
            subtotal: document.getElementById('subtotal'),
            villaTotal: document.getElementById('villa-total'),
            activitiesTotal: document.getElementById('activities-total'),
            grandTotal: document.getElementById('grand-total'),
            finalVillaTotal: document.getElementById('final-villa-total'),
            finalActivitiesTotal: document.getElementById('final-activities-total'),
            taxesFees: document.getElementById('taxes-fees'),
            finalGrandTotal: document.getElementById('final-grand-total')
        };

        const totals = this.bookingData.totals;

        if (elements.subtotal) {
            elements.subtotal.textContent = window.pacificoApp.formatCurrency(totals.villa + totals.activities);
        }
        if (elements.villaTotal) {
            elements.villaTotal.textContent = window.pacificoApp.formatCurrency(totals.villa);
        }
        if (elements.activitiesTotal) {
            elements.activitiesTotal.textContent = window.pacificoApp.formatCurrency(totals.activities);
        }
        if (elements.grandTotal) {
            elements.grandTotal.textContent = window.pacificoApp.formatCurrency(totals.total);
        }
        if (elements.finalVillaTotal) {
            elements.finalVillaTotal.textContent = window.pacificoApp.formatCurrency(totals.villa);
        }
        if (elements.finalActivitiesTotal) {
            elements.finalActivitiesTotal.textContent = window.pacificoApp.formatCurrency(totals.activities);
        }
        if (elements.taxesFees) {
            elements.taxesFees.textContent = window.pacificoApp.formatCurrency(totals.taxes);
        }
        if (elements.finalGrandTotal) {
            elements.finalGrandTotal.textContent = window.pacificoApp.formatCurrency(totals.total);
        }
    }

    updateSelectedVillaDisplay() {
        const selectedVillaElement = document.getElementById('selected-villa');
        if (!selectedVillaElement) return;

        if (this.bookingData.villa) {
            const villaInfo = {
                pacifica: {
                    name: 'Villa Pacifica',
                    capacity: 'Bis zu 16 Gäste',
                    features: 'Meerblick, Privater Pool, Strandzugang'
                },
                serenidad: {
                    name: 'Villa Serenidad',
                    capacity: 'Bis zu 14 Gäste',
                    features: 'Tropischer Garten, Spa-Bereich, Yoga-Pavillon'
                }
            };

            const villa = villaInfo[this.bookingData.villa];
            selectedVillaElement.innerHTML = `
                <h4>${villa.name}</h4>
                <p>${villa.capacity}</p>
                <p class="villa-features">${villa.features}</p>
            `;
        } else {
            selectedVillaElement.innerHTML = '<p>Wählen Sie eine Villa aus</p>';
        }
    }

    updateBookingSidebar() {
        const continueButton = document.getElementById('continue-booking');
        if (!continueButton) return;

        const hasVilla = this.bookingData.villa;
        const hasDates = this.bookingData.dates.checkin && this.bookingData.dates.checkout;
        const hasGuests = this.bookingData.guests;

        continueButton.disabled = !(hasVilla && hasDates && hasGuests);
        
        if (continueButton.disabled) {
            continueButton.textContent = 'Daten vervollständigen';
        } else {
            continueButton.textContent = 'Weiter zu Aktivitäten';
        }
    }

    showBookingSidebar() {
        const sidebar = document.getElementById('booking-sidebar');
        if (sidebar) {
            sidebar.classList.add('active');
        }
    }

    proceedToActivities() {
        if (!this.validateBookingData()) {
            window.pacificoApp.showNotification('Bitte vervollständigen Sie alle Angaben', 'error');
            return;
        }

        // Save current booking data
        this.saveBookingData();
        
        // Redirect to activities page
        window.location.href = 'activities.html';
    }

    validateBookingData() {
        return this.bookingData.villa && 
               this.bookingData.dates.checkin && 
               this.bookingData.dates.checkout && 
               this.bookingData.guests;
    }

    validateGuestForm() {
        const form = document.getElementById('guest-form');
        if (!form) return true;

        const requiredFields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });

        // Validate email
        const emailField = document.getElementById('email');
        if (emailField && emailField.value && !window.pacificoApp.validateEmail(emailField.value)) {
            isValid = false;
        }

        // Validate phone
        const phoneField = document.getElementById('phone');
        if (phoneField && phoneField.value && !window.pacificoApp.validatePhone(phoneField.value)) {
            isValid = false;
        }

        return isValid;
    }

    validateFinalBooking() {
        const termsAccepted = document.getElementById('terms-accepted')?.checked;
        const guestFormValid = this.validateGuestForm();
        const completeButton = document.getElementById('complete-booking');

        if (completeButton) {
            completeButton.disabled = !(termsAccepted && guestFormValid);
        }
    }

    handlePaymentMethodChange(method) {
        const creditCardForm = document.getElementById('credit-card-form');
        if (creditCardForm) {
            creditCardForm.style.display = method === 'credit-card' ? 'block' : 'none';
        }
        
        this.bookingData.payment.method = method;
        this.saveBookingData();
    }

    setupCreditCardForm() {
        const cardNumberInput = document.getElementById('card-number');
        const expiryInput = document.getElementById('expiry');
        const cvvInput = document.getElementById('cvv');

        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                // Format card number (add spaces every 4 digits)
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                value = value.substring(0, 16);
                value = value.replace(/(.{4})/g, '$1 ').trim();
                e.target.value = value;
            });
        }

        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => {
                // Format expiry date (MM/YY)
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                // Limit CVV to 3 digits
                e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
            });
        }
    }

    completeBooking() {
        if (!this.validateFinalBooking()) {
            window.pacificoApp.showNotification('Bitte vervollständigen Sie alle Angaben', 'error');
            return;
        }

        // Collect guest information
        const guestForm = document.getElementById('guest-form');
        if (guestForm) {
            const formData = new FormData(guestForm);
            this.bookingData.guestInfo = Object.fromEntries(formData);
        }

        // Collect payment information
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
        this.bookingData.payment.method = paymentMethod;

        if (paymentMethod === 'credit-card') {
            this.bookingData.payment.cardData = {
                number: document.getElementById('card-number')?.value,
                expiry: document.getElementById('expiry')?.value,
                cvv: document.getElementById('cvv')?.value,
                name: document.getElementById('card-name')?.value
            };
        }

        // Generate booking reference
        const bookingReference = window.pacificoApp.generateBookingReference();
        this.bookingData.reference = bookingReference;
        this.bookingData.date = new Date().toISOString();

        // In a real application, this would send data to the server
        console.log('Booking Data:', this.bookingData);

        // Show confirmation modal
        this.showBookingConfirmation(bookingReference);

        // Save final booking data
        this.saveBookingData();
        
        // Clear booking data after successful booking
        setTimeout(() => {
            this.clearBookingData();
        }, 5000);
    }

    showBookingConfirmation(reference) {
        const modal = document.getElementById('confirmation-modal');
        const referenceElement = document.getElementById('booking-reference');
        
        if (modal && referenceElement) {
            referenceElement.textContent = reference;
            modal.classList.add('active');
            
            // Close modal functionality
            const closeButton = modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            }
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        window.pacificoApp.showNotification('Buchung erfolgreich abgeschlossen!', 'success');
    }

    loadBookingData() {
        const stored = localStorage.getItem('pacifico_booking');
        if (stored) {
            this.bookingData = { ...this.bookingData, ...JSON.parse(stored) };
            this.selectedVilla = this.bookingData.villa;
        }
        
        // Load booking summary data
        this.loadBookingSummary();
    }

    loadBookingSummary() {
        // Populate villa summary on booking page
        const villaNameElement = document.getElementById('selected-villa-name');
        const villaCapacityElement = document.getElementById('villa-capacity');
        const villaDatesElement = document.getElementById('villa-dates');
        const villaGuestsElement = document.getElementById('villa-guests');
        const villaTotalElement = document.getElementById('villa-total-price');

        if (this.bookingData.villa && villaNameElement) {
            const villaNames = {
                pacifica: 'Villa Pacifica',
                serenidad: 'Villa Serenidad'
            };
            
            const villaCapacities = {
                pacifica: 'Bis zu 16 Gäste',
                serenidad: 'Bis zu 14 Gäste'
            };

            villaNameElement.textContent = villaNames[this.bookingData.villa];
            
            if (villaCapacityElement) {
                villaCapacityElement.textContent = villaCapacities[this.bookingData.villa];
            }
            
            if (villaDatesElement && this.bookingData.dates.checkin && this.bookingData.dates.checkout) {
                const checkin = window.pacificoApp.formatDate(this.bookingData.dates.checkin);
                const checkout = window.pacificoApp.formatDate(this.bookingData.dates.checkout);
                villaDatesElement.textContent = `${checkin} - ${checkout}`;
            }
            
            if (villaGuestsElement && this.bookingData.guests) {
                villaGuestsElement.textContent = this.bookingData.guests.replace('-', ' bis ') + ' Gäste';
            }
        }

        // Update all price displays
        this.updateTotals();
    }

    saveBookingData() {
        localStorage.setItem('pacifico_booking', JSON.stringify(this.bookingData));
    }

    clearBookingData() {
        this.bookingData = {
            villa: null,
            dates: { checkin: null, checkout: null },
            guests: null,
            activities: [],
            guestInfo: {},
            payment: {},
            totals: { villa: 0, activities: 0, taxes: 0, total: 0 }
        };
        localStorage.removeItem('pacifico_booking');
    }

    updateUI() {
        this.updateSelectedVillaDisplay();
        this.updateBookingSidebar();
        this.updatePriceDisplay();
        this.loadBookingSummary();
        
        // Set date minimums
        const today = new Date().toISOString().split('T')[0];
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput) {
            checkinInput.min = today;
            if (this.bookingData.dates.checkin) {
                checkinInput.value = this.bookingData.dates.checkin;
            }
        }
        
        if (checkoutInput && this.bookingData.dates.checkout) {
            checkoutInput.value = this.bookingData.dates.checkout;
        }
        
        const guestsSelect = document.getElementById('guests');
        if (guestsSelect && this.bookingData.guests) {
            guestsSelect.value = this.bookingData.guests;
        }
    }
}

// Initialize booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bookingSystem = new BookingSystem();
});