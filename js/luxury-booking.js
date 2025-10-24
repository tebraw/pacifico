// ============================================
// LUXURY BOOKING SYSTEM - JAVASCRIPT
// ============================================

// Activity Data
const activities = [
    {
        id: 1,
        name: "ATV Adventure",
        category: "adventure",
        duration: "3 hours",
        price: 120,
        image: "images/activities/ATVTourRainbowMountain.jpg"
    },
    {
        id: 2,
        name: "Zip Line Canopy Tour",
        category: "adventure",
        duration: "4 hours",
        price: 150,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Sunrise Yoga Session",
        category: "wellness",
        duration: "1.5 hours",
        price: 60,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Luxury Spa Massage",
        category: "wellness",
        duration: "2 hours",
        price: 180,
        image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        name: "Beach Meditation",
        category: "wellness",
        duration: "1 hour",
        price: 50,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        name: "Catamaran Sunset Tour",
        category: "water",
        duration: "3 hours",
        price: 200,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        name: "Snorkeling Adventure",
        category: "water",
        duration: "2.5 hours",
        price: 90,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        name: "Cooking Class",
        category: "culture",
        duration: "3 hours",
        price: 100,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 9,
        name: "Village Cultural Tour",
        category: "culture",
        duration: "4 hours",
        price: 80,
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 10,
        name: "Surfing Lessons",
        category: "water",
        duration: "2 hours",
        price: 110,
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 11,
        name: "Horseback Riding",
        category: "adventure",
        duration: "2 hours",
        price: 130,
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 12,
        name: "Private Chef Dinner",
        category: "culture",
        duration: "3 hours",
        price: 250,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

// Villa Data
const villas = {
    palacio: {
        name: "Palacio Tropical",
        guests: "Up to 16 guests",
        pricePerNight: 1200,
        description: "Palacio Tropical is a stunning luxury estate featuring breathtaking views and world-class amenities. This luxurious 8-bedroom villa offers the perfect blend of modern comfort and tropical elegance, ideal for large groups and families seeking an unforgettable Costa Rican experience.",
        bedrooms: 8,
        bathrooms: 6,
        images: [
            "images/villas/Palacio Tropical/Slider5-1.jpg",
            "images/villas/Palacio Tropical/ICON-Purple-Room-1.jpg",
            "images/villas/Palacio Tropical/unnamed.jpg",
            "images/villas/Palacio Tropical/unnamed (1).jpg",
            "images/villas/Palacio Tropical/unnamed (2).jpg"
        ],
        amenities: [
            "Infinity Pool with Ocean View",
            "Direct Beach Access",
            "Fully Equipped Gourmet Kitchen",
            "Air Conditioning Throughout",
            "High-Speed WiFi",
            "Entertainment System",
            "Outdoor BBQ Area",
            "Private Chef Available",
            "Daily Housekeeping",
            "24/7 Concierge Service"
        ]
    },
    residencia: {
        name: "Residencia Pacifico",
        guests: "Up to 14 guests",
        pricePerNight: 1000,
        description: "Residencia Pacifico is a wellness-focused retreat nestled in lush tropical gardens. With its private spa, yoga pavilion, and serene atmosphere, this 7-bedroom villa is perfect for those seeking relaxation, rejuvenation, and connection with nature.",
        bedrooms: 7,
        bathrooms: 5,
        images: [
            "images/villas/Residencia Pacifico/+Pacifica_DSC_4756 (1).jpg",
            "images/villas/Residencia Pacifico/Pacifica_DSC_4188.JPG",
            "images/villas/Residencia Pacifico/+Cuarto 3 DSC_3345.jpg",
            "images/villas/Residencia Pacifico/unnamed.jpg"
        ],
        amenities: [
            "Private Spa & Massage Room",
            "Yoga Pavilion",
            "Meditation Garden",
            "Saltwater Pool",
            "Organic Garden",
            "Wellness Library",
            "Steam Room & Sauna",
            "Healthy Meal Prep Kitchen",
            "Tranquil Water Features",
            "Nature Walking Trails"
        ]
    }
};

// Booking State
let bookingState = {
    selectedVilla: null,
    selectedActivities: {},
    currentSlot: null,
    nights: 3
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing...');
    
    initializeVillaSelection();
    renderActivitiesGrid();
    initializeModal();
    updateBookingSummary();
    
    // Initialize Date & Guests Selection
    initializeDateAndGuests();
    
    // Initialize Airport Shuttle
    initializeAirportShuttle();
    
    // Initialize Villa Modal
    initializeVillaModal();
    
    // Initialize Book Both Villas Button
    initializeBookBothButton();
});

// ============================================
// DATE & GUESTS INITIALIZATION
// ============================================
function initializeDateAndGuests() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin-date').min = today;
    document.getElementById('checkout-date').min = today;
    
    // Guests buttons
    const guestsInput = document.getElementById('num-guests');
    const minusBtn = document.getElementById('guests-minus');
    const plusBtn = document.getElementById('guests-plus');
    
    minusBtn.addEventListener('click', () => {
        const current = parseInt(guestsInput.value);
        if (current > 1) {
            guestsInput.value = current - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        const current = parseInt(guestsInput.value);
        if (current < 30) {
            guestsInput.value = current + 1;
        }
    });
    
    // Update checkout min date when checkin changes
    document.getElementById('checkin-date').addEventListener('change', (e) => {
        const checkinDate = new Date(e.target.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        document.getElementById('checkout-date').min = checkinDate.toISOString().split('T')[0];
    });
}

// ============================================
// BOOK BOTH VILLAS INITIALIZATION
// ============================================
function initializeBookBothButton() {
    document.getElementById('book-both-btn').addEventListener('click', () => {
        // Select both villas
        const pacificaCard = document.querySelector('.villa-card[data-villa="pacifica"]');
        const serenidadCard = document.querySelector('.villa-card[data-villa="serenidad"]');
        
        // Mark both as selected visually
        document.querySelectorAll('.villa-card').forEach(c => {
            c.classList.add('selected');
            c.querySelector('.select-btn').textContent = '✓ Selected';
        });
        
        // Update state to "both"
        bookingState.selectedVilla = 'both';
        
        // Show selected villa display with both villas
        const display = document.getElementById('selected-villa-display');
        display.style.display = 'flex';
        
        document.getElementById('selected-villa-name').textContent = 'Both Villas';
        document.getElementById('selected-villa-guests').textContent = 'Up to 30 guests (16+14)';
        
        // Update summary
        updateBookingSummary();
        
        // Scroll to shuttle
        setTimeout(() => {
            document.getElementById('shuttle').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        
        // Optional: Show a nice confirmation
        const btn = document.getElementById('book-both-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓ Both Villas Selected!</span>';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// ============================================
// AIRPORT SHUTTLE INITIALIZATION
// ============================================
function initializeAirportShuttle() {
    const onewayCheckbox = document.getElementById('shuttle-oneway');
    const roundtripCheckbox = document.getElementById('shuttle-roundtrip');
    const addShuttleBtn = document.getElementById('add-shuttle-btn');
    
    // Only one can be selected at a time
    onewayCheckbox.addEventListener('change', () => {
        if (onewayCheckbox.checked) {
            roundtripCheckbox.checked = false;
        }
        updateShuttleButton();
    });
    
    roundtripCheckbox.addEventListener('change', () => {
        if (roundtripCheckbox.checked) {
            onewayCheckbox.checked = false;
        }
        updateShuttleButton();
    });
    
    function updateShuttleButton() {
        const isSelected = onewayCheckbox.checked || roundtripCheckbox.checked;
        addShuttleBtn.disabled = !isSelected;
        
        if (isSelected) {
            const type = onewayCheckbox.checked ? 'One Way' : 'Round Trip';
            addShuttleBtn.textContent = `Add ${type} Shuttle`;
        } else {
            addShuttleBtn.textContent = 'Add Airport Shuttle';
        }
    }
    
    addShuttleBtn.addEventListener('click', () => {
        const type = onewayCheckbox.checked ? 'One Way Transfer' : 'Round Trip Transfer';
        
        // Add shuttle to selected activities section
        const container = document.getElementById('selected-activities-container');
        const emptyState = container.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Check if shuttle already added
        const existingShuttle = container.querySelector('[data-shuttle]');
        if (existingShuttle) {
            existingShuttle.remove();
        }
        
        const shuttleCard = document.createElement('div');
        shuttleCard.className = 'selected-activity-card';
        shuttleCard.dataset.shuttle = 'true';
        shuttleCard.innerHTML = `
            <div class="selected-activity-image">
                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Airport Shuttle">
            </div>
            <div class="selected-activity-content">
                <div class="selected-activity-header">
                    <span class="selected-activity-category">TRANSFER</span>
                    <h4>Airport Shuttle</h4>
                    <p class="selected-activity-duration">${type}</p>
                </div>
                <div class="selected-activity-footer">
                    <button class="remove-activity-btn" onclick="this.closest('.selected-activity-card').remove()">Remove</button>
                </div>
            </div>
        `;
        
        container.appendChild(shuttleCard);
        
        // Disable checkboxes after adding
        onewayCheckbox.checked = false;
        roundtripCheckbox.checked = false;
        addShuttleBtn.disabled = true;
        addShuttleBtn.textContent = 'Shuttle Added ✓';
        
        setTimeout(() => {
            addShuttleBtn.textContent = 'Add Airport Shuttle';
        }, 2000);
    });
}

// ============================================
// VILLA MODAL INITIALIZATION
// ============================================
function initializeVillaModal() {
    console.log('Initializing villa modal listeners...');
    
    // Initialize Villa Read More buttons
    const villaReadMoreBtns = document.querySelectorAll('.villa-read-more-btn');
    console.log('Found villa read more buttons:', villaReadMoreBtns.length);
    
    villaReadMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Villa Read More clicked!');
            const villaCard = e.target.closest('.villa-card');
            console.log('Villa card:', villaCard);
            const villaId = villaCard ? villaCard.dataset.villa : null;
            console.log('Villa ID:', villaId);
            if (villaId) {
                showVillaDetails(villaId);
            }
        });
    });
    
    // Villa modal close functionality
    const villaModal = document.getElementById('villa-modal');
    const villaCloseBtn = villaModal.querySelector('.close-modal');
    
    villaCloseBtn.addEventListener('click', closeVillaModal);
    
    villaModal.addEventListener('click', (e) => {
        if (e.target === villaModal) {
            closeVillaModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && villaModal.classList.contains('active')) {
            closeVillaModal();
        }
    });
}

// ============================================
// VILLA SELECTION
// ============================================
function initializeVillaSelection() {
    const villaCards = document.querySelectorAll('.villa-card');
    
    villaCards.forEach(card => {
        const selectBtn = card.querySelector('.select-btn');
        
        selectBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const villaId = card.dataset.villa;
            selectVilla(villaId, card);
        });
    });
    
    // Change villa button
    const changeBtn = document.querySelector('.change-btn');
    if (changeBtn) {
        changeBtn.addEventListener('click', () => {
            deselectVilla();
        });
    }
}

function selectVilla(villaId, card) {
    // Remove previous selection
    document.querySelectorAll('.villa-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.select-btn').textContent = 'Select Villa';
    });
    
    // Add new selection
    card.classList.add('selected');
    card.querySelector('.select-btn').textContent = '✓ Selected';
    
    bookingState.selectedVilla = villaId;
    
    // Show selected villa display
    const display = document.getElementById('selected-villa-display');
    display.style.display = 'flex';
    
    const villa = villas[villaId];
    document.getElementById('selected-villa-name').textContent = villa.name;
    document.getElementById('selected-villa-guests').textContent = villa.guests;
    
    // Update summary
    updateBookingSummary();
    
    // Smooth scroll to shuttle section (not activities)
    setTimeout(() => {
        document.getElementById('shuttle').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

function deselectVilla() {
    document.querySelectorAll('.villa-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.select-btn').textContent = 'Select Villa';
    });
    
    const display = document.getElementById('selected-villa-display');
    display.style.display = 'none';
    
    bookingState.selectedVilla = null;
    updateBookingSummary();
    
    // Scroll back to villas
    document.getElementById('villas').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// ACTIVITIES GRID - RENDER ALL ACTIVITIES
// ============================================
function renderActivitiesGrid() {
    const grid = document.getElementById('activities-grid');
    
    if (!grid) {
        console.error('Activities grid element not found!');
        return;
    }
    
    console.log('=== RENDERING ACTIVITIES GRID ===');
    console.log('Grid element:', grid);
    console.log('Total activities:', activities.length);
    
    // Clear existing content
    grid.innerHTML = '';
    
    activities.forEach((activity, index) => {
        console.log(`Creating card ${index + 1}:`, activity.name);
        
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.dataset.activityId = activity.id;
        card.style.cssText = 'display: flex !important; flex-direction: row !important; min-height: 180px !important; height: auto !important; overflow: visible !important;';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'activity-card-image';
        imageDiv.style.cssText = 'width: 180px !important; min-width: 180px !important; flex-shrink: 0 !important; overflow: hidden !important;';
        
        const img = document.createElement('img');
        img.src = activity.image;
        img.alt = activity.name;
        img.style.cssText = 'width: 100% !important; height: 100% !important; min-height: 180px !important; object-fit: cover !important; display: block !important;';
        imageDiv.appendChild(img);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'activity-card-content';
        contentDiv.style.cssText = 'flex: 1 !important; padding: 20px 24px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important;';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'activity-card-header';
        headerDiv.style.cssText = 'flex: 0 0 auto !important; margin-bottom: 12px !important;';
        
        const category = document.createElement('span');
        category.className = 'activity-card-category';
        category.textContent = activity.category;
        category.style.cssText = 'display: inline-block !important; font-size: 10px !important; padding: 4px 10px !important; background: rgba(201, 169, 97, 0.1) !important; color: #C9A961 !important; border-radius: 4px !important; margin-bottom: 8px !important; text-transform: uppercase !important; font-weight: 600 !important;';
        
        const title = document.createElement('h3');
        title.className = 'activity-card-title';
        title.textContent = activity.name;
        title.style.cssText = 'font-size: 18px !important; font-weight: 600 !important; color: #2d2d2d !important; margin-bottom: 6px !important; line-height: 1.3 !important;';
        
        const duration = document.createElement('p');
        duration.className = 'activity-card-duration';
        duration.textContent = `⏱ ${activity.duration}`;
        duration.style.cssText = 'font-size: 14px !important; color: #666 !important; margin: 0 !important;';
        
        headerDiv.appendChild(category);
        headerDiv.appendChild(title);
        headerDiv.appendChild(duration);
        
        const footerDiv = document.createElement('div');
        footerDiv.className = 'activity-card-footer';
        footerDiv.style.cssText = 'flex: 0 0 auto !important; display: flex !important; justify-content: flex-end !important; align-items: center !important; gap: 12px !important; margin-top: auto !important;';
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'activity-buttons-container';
        buttonsDiv.style.cssText = 'display: flex !important; gap: 8px !important; flex-shrink: 0 !important; align-items: center !important;';
        
        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'activity-read-more-btn';
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.style.cssText = 'font-size: 13px !important; color: #2d2d2d !important; font-weight: 600 !important; padding: 8px 16px !important; background: #f8f8f8 !important; border: 1px solid #ddd !important; border-radius: 8px !important; cursor: pointer !important; white-space: nowrap !important; flex-shrink: 0 !important;';
        readMoreBtn.onclick = (e) => {
            e.stopPropagation();
            console.log('Read More clicked for:', activity.name);
            showActivityDetails(activity);
        };
        
        const addBtn = document.createElement('button');
        addBtn.className = 'activity-card-action';
        addBtn.textContent = 'Add';
        addBtn.style.cssText = 'font-size: 13px !important; color: white !important; font-weight: 600 !important; padding: 8px 16px !important; background: #C9A961 !important; border: none !important; border-radius: 8px !important; cursor: pointer !important; white-space: nowrap !important; flex-shrink: 0 !important;';
        addBtn.onclick = (e) => {
            e.stopPropagation();
            console.log('Add clicked for:', activity.name);
            addActivity(activity, card);
        };
        
        buttonsDiv.appendChild(readMoreBtn);
        buttonsDiv.appendChild(addBtn);
        
        console.log('Buttons created for:', activity.name, 'Read More:', readMoreBtn, 'Add:', addBtn);
        
        footerDiv.appendChild(buttonsDiv);
        
        contentDiv.appendChild(headerDiv);
        contentDiv.appendChild(footerDiv);
        
        card.appendChild(imageDiv);
        card.appendChild(contentDiv);
        
        // Remove the old click listener on the entire card
        // card.addEventListener('click', () => {
        //     addActivity(activity, card);
        // });
        
        grid.appendChild(card);
        console.log(`Card ${index + 1} added to grid`);
    });
    
    console.log('=== GRID RENDERING COMPLETE ===');
    console.log('Total cards in grid:', grid.children.length);
}

function addActivity(activity, card) {
    const activityId = activity.id;
    
    // Check if already selected
    const existingSlot = Object.keys(bookingState.selectedActivities).find(
        slot => bookingState.selectedActivities[slot].id === activityId
    );
    
    if (existingSlot) {
        // Already added, do nothing
        return;
    }
    
    // Add activity - find next available slot
    const nextSlot = getNextAvailableSlot();
    if (nextSlot) {
        bookingState.selectedActivities[nextSlot] = activity;
        card.classList.add('selected');
        
        // Add to selected activities display
        addSelectedActivityCard(activity, nextSlot);
        
        updateBookingSummary();
    }
}

function addSelectedActivityCard(activity, slot) {
    const container = document.getElementById('selected-activities-container');
    
    // Remove empty state message if it exists
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const card = document.createElement('div');
    card.className = 'selected-activity-card';
    card.dataset.slot = slot;
    
    card.innerHTML = `
        <div class="selected-activity-image">
            <img src="${activity.image}" alt="${activity.name}">
        </div>
        <div class="selected-activity-content">
            <div class="selected-activity-header">
                <span class="selected-activity-category">${activity.category}</span>
                <h4>${activity.name}</h4>
                <p class="selected-activity-duration">⏱ ${activity.duration}</p>
            </div>
            <div class="selected-activity-footer">
                <button class="remove-activity-btn" data-slot="${slot}">Remove</button>
            </div>
        </div>
    `;
    
    // Add remove listener
    const removeBtn = card.querySelector('.remove-activity-btn');
    removeBtn.addEventListener('click', () => {
        removeSelectedActivity(slot, activity.id);
    });
    
    container.appendChild(card);
    
    // Update selected count
    const selectedCount = document.getElementById('selected-count');
    const count = Object.keys(bookingState.selectedActivities).length;
    selectedCount.textContent = `(${count})`;
    
    // Smooth scroll to show the added activity
    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function removeSelectedActivity(slot, activityId) {
    // Remove from booking state
    delete bookingState.selectedActivities[slot];
    
    // Remove the selected activity card
    const selectedCard = document.querySelector(`.selected-activity-card[data-slot="${slot}"]`);
    if (selectedCard) {
        selectedCard.remove();
    }
    
    // Check if container is now empty, show empty state
    const container = document.getElementById('selected-activities-container');
    if (container.children.length === 0) {
        container.innerHTML = '<p class="empty-state">No activities added yet</p>';
    }
    
    // Update selected count
    const selectedCount = document.getElementById('selected-count');
    const count = Object.keys(bookingState.selectedActivities).length;
    selectedCount.textContent = `(${count})`;
    
    // Un-gray the activity in the grid
    const activityCard = document.querySelector(`.activity-card[data-activity-id="${activityId}"]`);
    if (activityCard) {
        activityCard.classList.remove('selected');
    }
    
    updateBookingSummary();
}

function getNextAvailableSlot() {
    // Return next available slot number (1-20)
    for (let i = 1; i <= 20; i++) {
        if (!bookingState.selectedActivities[i]) {
            return i;
        }
    }
    return null; // All slots full
}

// Activity selection is now handled directly in renderActivitiesGrid()
// No modal needed - simplified interaction

// ============================================
// ACTIVITY DETAILS POPUP
// ============================================
function showActivityDetails(activity) {
    const modal = document.getElementById('activity-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Clear existing content
    modalBody.innerHTML = '';
    
    // Create detailed view
    const detailsHTML = `
        <div class="activity-details-view">
            <div class="activity-details-image">
                <img src="${activity.image}" alt="${activity.name}">
            </div>
            <div class="activity-details-content">
                <span class="activity-details-category">${activity.category}</span>
                <h2 class="activity-details-title">${activity.name}</h2>
                
                <div class="activity-details-info">
                    <div class="detail-item">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">⏱ ${activity.duration}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Price:</span>
                        <span class="detail-value price">€${activity.price} per person</span>
                    </div>
                </div>
                
                <div class="activity-details-description">
                    <h3>Description</h3>
                    <p>${getActivityDescription(activity)}</p>
                </div>
                
                <div class="activity-details-highlights">
                    <h3>Highlights</h3>
                    <ul>
                        ${getActivityHighlights(activity).map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="activity-details-includes">
                    <h3>What's Included</h3>
                    <ul>
                        ${getActivityIncludes(activity).map(i => `<li>✓ ${i}</li>`).join('')}
                    </ul>
                </div>
                
                <button class="add-activity-btn-large" onclick="addActivityFromDetails(${activity.id})">
                    Add to Package - €${activity.price}
                </button>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = detailsHTML;
    modal.classList.add('active');
}

function getActivityDescription(activity) {
    const descriptions = {
        1: "Experience the thrill of riding through Costa Rica's stunning landscapes on a powerful ATV. Navigate through jungle trails, cross rivers, and enjoy breathtaking mountain views on this unforgettable adventure.",
        2: "Soar through the treetops on our exhilarating zip line canopy tour. Glide from platform to platform high above the rainforest floor, spotting wildlife and taking in panoramic views of the Pacific coast.",
        3: "Start your day with a peaceful yoga session as the sun rises over the ocean. Our experienced instructor will guide you through gentle flows and meditation on our private beach or yoga pavilion.",
        4: "Indulge in a luxurious full-body massage using organic oils and traditional techniques. Our professional therapists will help you release tension and achieve complete relaxation in our serene spa setting.",
        5: "Find inner peace with a guided meditation session on our private beach. Listen to the waves, feel the ocean breeze, and let go of stress in this tranquil tropical paradise.",
        6: "Sail into the sunset on a luxurious catamaran cruise. Enjoy snorkeling, swimming, and dolphin watching, followed by a gourmet dinner and cocktails as the sun dips below the horizon.",
        7: "Explore the vibrant underwater world of Costa Rica's Pacific coast. Discover colorful fish, sea turtles, and coral reefs in crystal-clear waters with all equipment provided.",
        8: "Learn to prepare authentic Costa Rican cuisine with a local chef. Visit the market, select fresh ingredients, and master traditional recipes in a hands-on cooking experience.",
        9: "Immerse yourself in local culture with a guided tour of nearby villages. Meet artisans, visit coffee plantations, and learn about Costa Rican traditions and daily life.",
        10: "Catch your first wave or improve your skills with professional surf instruction on one of Costa Rica's best beaches. All levels welcome, equipment included.",
        11: "Explore scenic trails and pristine beaches on horseback. Ride through jungle paths and along the shore, perfect for all experience levels with gentle, well-trained horses.",
        12: "Enjoy a private dining experience prepared by a professional chef in your villa. Customize your menu and savor gourmet cuisine paired with fine wines in complete privacy."
    };
    return descriptions[activity.id] || "An amazing experience you won't forget!";
}

function getActivityHighlights(activity) {
    const highlights = {
        1: ["Professional guide and safety equipment", "Stunning jungle and mountain scenery", "River crossings and waterfalls", "Suitable for beginners and experts"],
        2: ["11 zip lines through the canopy", "Longest line over 800 meters", "Incredible wildlife viewing", "Safety certified equipment"],
        3: ["Private beach or pavilion setting", "Experienced yoga instructor", "All levels welcome", "Mats and props provided"],
        4: ["Professional massage therapist", "Organic essential oils", "Private spa room", "2-hour session"],
        5: ["Guided by meditation expert", "Private beach location", "Suitable for all levels", "Refreshments included"],
        6: ["4+ hours on luxury catamaran", "Snorkeling equipment provided", "Gourmet dinner and drinks", "Dolphin and whale watching"],
        7: ["Crystal-clear Pacific waters", "Professional guide", "All equipment included", "Sea turtle sightings common"],
        8: ["Market tour with chef", "Hands-on cooking experience", "Traditional recipes", "Enjoy your creations for lunch"],
        9: ["Visit local artisan workshops", "Coffee plantation tour", "Traditional lunch included", "Learn about local culture"],
        10: ["Professional surf instructor", "All equipment provided", "Best surf beaches", "2-hour lesson"],
        11: ["Well-trained gentle horses", "Experienced guide", "Beach and jungle trails", "All skill levels welcome"],
        12: ["Private chef in your villa", "Customized menu", "Fine wine pairings", "Full table service"]
    };
    return highlights[activity.id] || ["Amazing experience", "Professional guides", "All equipment included"];
}

function getActivityIncludes(activity) {
    const includes = {
        1: ["ATV rental and fuel", "Safety helmet and gear", "Professional guide", "Bottled water"],
        2: ["All zip line equipment", "Safety harness and helmet", "Professional guides", "Transportation from villa"],
        3: ["Yoga mat and props", "Professional instructor", "Beach or pavilion access", "Refreshing drinks"],
        4: ["2-hour massage session", "Organic oils", "Professional therapist", "Spa facility access"],
        5: ["Guided meditation", "Beach access", "Meditation cushions", "Herbal tea"],
        6: ["Catamaran cruise", "Snorkeling gear", "Dinner and drinks", "Professional crew"],
        7: ["Snorkeling equipment", "Professional guide", "Underwater photos", "Refreshments"],
        8: ["Market tour", "Cooking class", "All ingredients", "Lunch included"],
        9: ["Village tour", "Artisan visits", "Traditional lunch", "Transportation"],
        10: ["Surfboard rental", "Professional instruction", "2-hour lesson", "All skill levels"],
        11: ["Horse rental", "Professional guide", "Safety equipment", "2-hour ride"],
        12: ["Private chef service", "Customized menu", "Wine pairings", "Full service"]
    };
    return includes[activity.id] || ["Professional service", "All equipment", "Expert guidance"];
}

function addActivityFromDetails(activityId) {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return;
    
    // Find the card
    const card = document.querySelector(`.activity-card[data-activity-id="${activityId}"]`);
    
    // Add the activity
    addActivity(activity, card);
    
    // Close modal
    closeModal();
}

// ============================================
// MODAL CONTROL
// ============================================
function initializeModal() {
    const modal = document.getElementById('activity-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('activity-modal');
    modal.classList.remove('active');
    bookingState.currentSlot = null;
}

// ============================================
// BOOKING SUMMARY
// ============================================
function updateBookingSummary() {
    updateVillaSummary();
    updateActivitiesSummary();
    updateTotals();
    updateProceedButton();
}

function updateVillaSummary() {
    const summaryVilla = document.getElementById('summary-villa');
    
    if (bookingState.selectedVilla) {
        if (bookingState.selectedVilla === 'both') {
            // Both villas selected
            summaryVilla.innerHTML = `
                <p class="summary-villa-name">Palacio Tropical + Residencia Pacifico</p>
                <p class="summary-villa-guests">Up to 30 guests (16+14)</p>
            `;
        } else {
            // Single villa selected
            const villa = villas[bookingState.selectedVilla];
            summaryVilla.innerHTML = `
                <p class="summary-villa-name">${villa.name}</p>
                <p class="summary-villa-guests">${villa.guests}</p>
            `;
        }
    } else {
        summaryVilla.innerHTML = '<p class="empty-state">No villa selected</p>';
    }
}

function updateActivitiesSummary() {
    const summaryActivities = document.getElementById('summary-activities');
    const activityCount = document.getElementById('activity-count');
    
    const selectedActivities = Object.values(bookingState.selectedActivities);
    activityCount.textContent = `(${selectedActivities.length})`;
    
    if (selectedActivities.length > 0) {
        summaryActivities.innerHTML = '';
        selectedActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'summary-activity-item';
            item.innerHTML = `
                <span class="summary-activity-name">${activity.name}</span>
            `;
            summaryActivities.appendChild(item);
        });
    } else {
        summaryActivities.innerHTML = '<p class="empty-state">No activities added</p>';
    }
}

function updateTotals() {
    // Prices removed - no totals needed
}

function updateProceedButton() {
    const proceedBtn = document.getElementById('submit-inquiry-btn');
    
    if (bookingState.selectedVilla) {
        proceedBtn.disabled = false;
    } else {
        proceedBtn.disabled = true;
    }
}

function proceedToBooking() {
    // Save booking data
    localStorage.setItem('pacificoBooking', JSON.stringify(bookingState));
    
    // Show confirmation
    alert('Proceeding to booking confirmation!\n\n' +
          `Villa: ${villas[bookingState.selectedVilla].name}\n` +
          `Activities: ${Object.keys(bookingState.selectedActivities).length}\n` +
          `Total: €${calculateGrandTotal().toLocaleString()}`);
}

function calculateGrandTotal() {
    let total = 0;
    
    if (bookingState.selectedVilla) {
        const villa = villas[bookingState.selectedVilla];
        total += villa.pricePerNight * bookingState.nights;
    }
    
    const selectedActivities = Object.values(bookingState.selectedActivities);
    total += selectedActivities.reduce((sum, activity) => sum + activity.price, 0);
    
    return total;
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// VILLA MODAL FUNCTIONS
// ============================================
function showVillaDetails(villaId) {
    console.log('showVillaDetails called with villaId:', villaId);
    const villa = villas[villaId];
    console.log('Villa data:', villa);
    if (!villa) {
        console.error('Villa not found for id:', villaId);
        return;
    }
    
    const modal = document.getElementById('villa-modal');
    console.log('Modal element:', modal);
    const modalTitle = modal.querySelector('.modal-title');
    const gallery = modal.querySelector('.villa-gallery');
    const details = modal.querySelector('.villa-details');
    
    console.log('Modal title:', modalTitle);
    console.log('Gallery:', gallery);
    console.log('Details:', details);
    
    // Set title
    modalTitle.textContent = villa.name;
    
    // Populate gallery
    gallery.innerHTML = '';
    
    // Main image
    const mainImg = document.createElement('div');
    mainImg.className = 'villa-gallery-main';
    mainImg.innerHTML = `<img src="${villa.images[0]}" alt="${villa.name} - Main View">`;
    gallery.appendChild(mainImg);
    
    // Thumbnail images
    villa.images.slice(1).forEach((imgSrc, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'villa-gallery-thumb';
        thumb.innerHTML = `<img src="${imgSrc}" alt="${villa.name} - View ${index + 2}">`;
        thumb.addEventListener('click', () => {
            // Swap with main image
            const currentMainSrc = mainImg.querySelector('img').src;
            mainImg.querySelector('img').src = imgSrc;
            thumb.querySelector('img').src = currentMainSrc;
        });
        gallery.appendChild(thumb);
    });
    
    // Populate details
    details.innerHTML = `
        <div class="villa-detail-section">
            <h3>About ${villa.name}</h3>
            <p>${villa.description}</p>
        </div>
        
        <div class="villa-detail-section">
            <h3>Property Details</h3>
            <p><strong>Bedrooms:</strong> ${villa.bedrooms}</p>
            <p><strong>Bathrooms:</strong> ${villa.bathrooms}</p>
            <p><strong>Capacity:</strong> ${villa.guests}</p>
        </div>
        
        <div class="villa-detail-section">
            <h3>Amenities & Features</h3>
            <ul class="villa-amenities-list">
                ${villa.amenities.map(amenity => `<li class="villa-amenity-item">${amenity}</li>`).join('')}
            </ul>
        </div>
    `;
    
    console.log('About to show modal...');
    // Show modal
    modal.classList.add('active');
    console.log('Modal active class added. classList:', modal.classList);
}

function closeVillaModal() {
    const modal = document.getElementById('villa-modal');
    modal.classList.remove('active');
}
