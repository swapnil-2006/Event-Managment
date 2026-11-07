// ==========================================================================
// EventPulse - Core Application Engine
// Manages Event Catalog, Filtering, Modals, Countdowns, Bookings, & UI
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  // State
  state: {
    events: [...INITIAL_EVENTS],
    filteredEvents: [...INITIAL_EVENTS],
    searchQuery: '',
    selectedCategory: 'all',
    selectedDateFilter: 'all',
    sortBy: 'date-asc',
    showFavoritesOnly: false,
    activeCountdownInterval: null,
    modalCountdownInterval: null,
    selectedEventForModal: null
  },

  // DOM Elements cache
  elements: {},

  // Initialization
  init() {
    this.cacheElements();
    this.initTheme();
    this.initHeroCountdown();
    this.renderCategoryPills();
    this.renderEvents();
    this.updateBookingsBadge();
    this.bindEvents();
    this.initScrollHeader();
  },

  cacheElements() {
    this.elements = {
      // Header & Navigation
      navbar: document.getElementById('navbar'),
      themeToggleBtn: document.getElementById('theme-toggle-btn'),
      mobileMenuBtn: document.getElementById('mobile-menu-btn'),
      mobileNav: document.getElementById('mobile-nav'),
      myBookingsNavBtn: document.getElementById('nav-my-bookings-btn'),
      myBookingsMobileBtn: document.getElementById('mobile-my-bookings-btn'),
      bookingsBadge: document.getElementById('bookings-badge'),
      bookingsBadgeMobile: document.getElementById('bookings-badge-mobile'),

      // Hero Elements
      heroSearchInput: document.getElementById('hero-search-input'),
      heroSearchBtn: document.getElementById('hero-search-btn'),
      heroExploreBtn: document.getElementById('hero-explore-btn'),
      heroCountdown: document.getElementById('hero-countdown'),

      // Filter Controls
      searchInput: document.getElementById('search-input'),
      categoryPillsContainer: document.getElementById('category-pills'),
      dateFilterSelect: document.getElementById('date-filter'),
      sortSelect: document.getElementById('sort-filter'),
      favoritesToggleBtn: document.getElementById('favorites-toggle-btn'),
      clearFiltersBtn: document.getElementById('clear-filters-btn'),
      eventsCountDisplay: document.getElementById('events-count-display'),

      // Event Grid & Views
      eventsGrid: document.getElementById('events-grid'),
      noEventsState: document.getElementById('no-events-state'),
      resetSearchBtn: document.getElementById('reset-search-btn'),

      // Event Details Modal
      detailsModal: document.getElementById('event-details-modal'),
      detailsModalClose: document.getElementById('details-modal-close'),
      detailsModalBody: document.getElementById('details-modal-body'),

      // Registration Modal
      regModal: document.getElementById('registration-modal'),
      regModalClose: document.getElementById('registration-modal-close'),
      regForm: document.getElementById('event-registration-form'),
      regEventSelect: document.getElementById('reg-event-select'),
      regTicketTierSelect: document.getElementById('reg-ticket-tier'),
      regTicketCount: document.getElementById('reg-ticket-count'),
      regPriceSummary: document.getElementById('reg-price-summary'),
      regSubmitBtn: document.getElementById('reg-submit-btn'),

      // Ticket Pass / Confirmation Modal
      ticketModal: document.getElementById('ticket-pass-modal'),
      ticketModalClose: document.getElementById('ticket-modal-close'),
      ticketModalBody: document.getElementById('ticket-modal-body'),

      // My Bookings Drawer / Modal
      bookingsModal: document.getElementById('my-bookings-modal'),
      bookingsModalClose: document.getElementById('my-bookings-modal-close'),
      bookingsList: document.getElementById('bookings-list'),
      emptyBookingsState: document.getElementById('empty-bookings-state')
    };
  },

  // ------------------------------------------------------------------------
  // Theme Management
  // ------------------------------------------------------------------------
  initTheme() {
    const theme = StorageManager.getPreferredTheme();
    StorageManager.setTheme(theme);
    this.updateThemeButtonIcon(theme);
  },

  updateThemeButtonIcon(theme) {
    if (!this.elements.themeToggleBtn) return;
    const isDark = theme === 'dark';
    this.elements.themeToggleBtn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    this.elements.themeToggleBtn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  },

  // ------------------------------------------------------------------------
  // Hero Spotlight Countdown
  // ------------------------------------------------------------------------
  initHeroCountdown() {
    // Spotlight event is the flagship summit
    const spotlightEvent = this.state.events.find(e => e.featured) || this.state.events[0];
    if (!spotlightEvent || !this.elements.heroCountdown) return;

    const targetDate = new Date(spotlightEvent.date).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        this.elements.heroCountdown.innerHTML = `<span class="countdown-live">● EVENT IN PROGRESS</span>`;
        if (this.state.activeCountdownInterval) clearInterval(this.state.activeCountdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.elements.heroCountdown.innerHTML = `
        <div class="countdown-unit">
          <span class="countdown-num">${String(days).padStart(2, '0')}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-unit">
          <span class="countdown-num">${String(hours).padStart(2, '0')}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-unit">
          <span class="countdown-num">${String(minutes).padStart(2, '0')}</span>
          <span class="countdown-label">Mins</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-unit">
          <span class="countdown-num">${String(seconds).padStart(2, '0')}</span>
          <span class="countdown-label">Secs</span>
        </div>
      `;
    };

    updateTimer();
    this.state.activeCountdownInterval = setInterval(updateTimer, 1000);
  },

  // ------------------------------------------------------------------------
  // Categories Bar
  // ------------------------------------------------------------------------
  renderCategoryPills() {
    if (!this.elements.categoryPillsContainer) return;

    const categories = [
      { id: 'all', label: 'All Events', icon: '✨' },
      { id: 'technology', label: 'Technology & AI', icon: '💻' },
      { id: 'music', label: 'Music & Arts', icon: '🎵' },
      { id: 'business', label: 'Business & Startups', icon: '🚀' },
      { id: 'design', label: 'Arts & Design', icon: '🎨' },
      { id: 'sports', label: 'Health & Sports', icon: '🏃' },
      { id: 'food', label: 'Food & Culinary', icon: '🍷' }
    ];

    this.elements.categoryPillsContainer.innerHTML = categories.map(cat => {
      const count = cat.id === 'all'
        ? this.state.events.length
        : this.state.events.filter(e => e.category === cat.id).length;
      const isActive = this.state.selectedCategory === cat.id ? 'active' : '';

      return `
        <button type="button" class="category-pill ${isActive}" data-category="${cat.id}">
          <span class="category-icon">${cat.icon}</span>
          <span class="category-name">${cat.label}</span>
          <span class="category-count">${count}</span>
        </button>
      `;
    }).join('');
  },

  // ------------------------------------------------------------------------
  // Filtering & Sorting Logic
  // ------------------------------------------------------------------------
  applyFilters() {
    const { events, searchQuery, selectedCategory, selectedDateFilter, sortBy, showFavoritesOnly } = this.state;
    const now = new Date();

    let result = events.filter(item => {
      // 1. Text Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesVenue = item.venue.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesTags) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Date Range Filter
      if (selectedDateFilter !== 'all') {
        const eventDate = new Date(item.date);
        const diffDays = (eventDate - now) / (1000 * 60 * 60 * 24);

        if (selectedDateFilter === 'this-month' && diffDays > 30) return false;
        if (selectedDateFilter === 'next-7-days' && (diffDays < 0 || diffDays > 7)) return false;
        if (selectedDateFilter === 'free' && !item.isFree) return false;
      }

      // 4. Favorites Only
      if (showFavoritesOnly) {
        if (!StorageManager.isFavorite(item.id)) return false;
      }

      return true;
    });

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'popularity') {
        return b.attendeesCount - a.attendeesCount;
      }
      return 0;
    });

    this.state.filteredEvents = result;
    this.renderEvents();
  },

  // ------------------------------------------------------------------------
  // Event Cards Rendering
  // ------------------------------------------------------------------------
  renderEvents() {
    const { filteredEvents } = this.state;
    if (!this.elements.eventsGrid) return;

    if (this.elements.eventsCountDisplay) {
      this.elements.eventsCountDisplay.textContent = `Showing ${filteredEvents.length} event${filteredEvents.length === 1 ? '' : 's'}`;
    }

    if (filteredEvents.length === 0) {
      this.elements.eventsGrid.style.display = 'none';
      if (this.elements.noEventsState) this.elements.noEventsState.style.display = 'flex';
      return;
    }

    this.elements.eventsGrid.style.display = 'grid';
    if (this.elements.noEventsState) this.elements.noEventsState.style.display = 'none';

    this.elements.eventsGrid.innerHTML = filteredEvents.map(event => {
      const isFav = StorageManager.isFavorite(event.id);
      const spotsPercent = Math.round(((event.totalSpots - event.spotsRemaining) / event.totalSpots) * 100);
      const priceBadge = event.isFree
        ? `<span class="price-pill free">FREE</span>`
        : `<span class="price-pill paid">$${event.price}</span>`;

      return `
        <article class="event-card animate-fade-in" data-event-id="${event.id}">
          <div class="event-card-media">
            <img src="${event.image}" alt="${event.title}" loading="lazy" class="event-img" />
            <div class="event-media-overlay"></div>
            
            <!-- Date Badge -->
            <div class="event-date-badge">
              <span class="badge-month">${new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
              <span class="badge-day">${new Date(event.date).getDate()}</span>
            </div>

            <!-- Category & Price -->
            <div class="event-badges-top">
              <span class="category-badge cat-${event.category}">${event.categoryLabel}</span>
              ${priceBadge}
            </div>

            <!-- Favorite Button -->
            <button type="button" class="card-favorite-btn ${isFav ? 'is-favorite' : ''}" 
                    data-event-id="${event.id}" 
                    aria-label="${isFav ? 'Remove from favorites' : 'Save to favorites'}">
              <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" class="fav-icon">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <div class="event-card-body">
            <h3 class="event-title" title="${event.title}">${event.title}</h3>
            
            <p class="event-desc">${event.shortDescription}</p>

            <div class="event-meta-list">
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="meta-icon">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${event.time}</span>
              </div>
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="meta-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span class="meta-venue" title="${event.venue}">${event.venue}</span>
              </div>
            </div>

            <!-- Capacity & Spots Bar -->
            <div class="spots-indicator">
              <div class="spots-header">
                <span class="spots-text">${event.spotsRemaining} spots left</span>
                <span class="spots-percent">${spotsPercent}% booked</span>
              </div>
              <div class="spots-track">
                <div class="spots-fill" style="width: ${spotsPercent}%"></div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="event-card-actions">
              <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-event-id="${event.id}">
                View Details
              </button>
              <button type="button" class="btn btn-primary btn-sm register-card-btn" data-event-id="${event.id}">
                Register Now
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  // ------------------------------------------------------------------------
  // Event Details Modal
  // ------------------------------------------------------------------------
  openEventDetails(eventId) {
    const event = this.state.events.find(e => e.id === eventId);
    if (!event || !this.elements.detailsModalBody) return;

    this.state.selectedEventForModal = event;

    // Build speakers markup
    const speakersMarkup = event.speakers && event.speakers.length > 0
      ? `
        <div class="modal-section">
          <h4 class="section-title">Featured Speakers & Hosts</h4>
          <div class="speakers-grid">
            ${event.speakers.map(s => `
              <div class="speaker-card">
                <img src="${s.avatar}" alt="${s.name}" class="speaker-avatar" />
                <div class="speaker-info">
                  <div class="speaker-name">${s.name}</div>
                  <div class="speaker-role">${s.role}</div>
                  <div class="speaker-org">${s.org}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `
      : '';

    // Build agenda markup
    const agendaMarkup = event.agenda && event.agenda.length > 0
      ? `
        <div class="modal-section">
          <h4 class="section-title">Event Schedule & Agenda</h4>
          <div class="agenda-timeline">
            ${event.agenda.map(item => `
              <div class="timeline-row">
                <div class="timeline-time">${item.time}</div>
                <div class="timeline-point"></div>
                <div class="timeline-content">
                  <div class="timeline-title">${item.title}</div>
                  <div class="timeline-speaker">${item.speaker}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `
      : '';

    // Build ticket tiers markup
    const tiersMarkup = event.ticketTiers && event.ticketTiers.length > 0
      ? `
        <div class="modal-section">
          <h4 class="section-title">Available Ticket Passes</h4>
          <div class="ticket-tiers-grid">
            ${event.ticketTiers.map(t => `
              <div class="tier-card">
                <div class="tier-header">
                  <span class="tier-name">${t.name}</span>
                  <span class="tier-price">${t.price === 0 ? 'FREE' : `$${t.price}`}</span>
                </div>
                <ul class="tier-perks">
                  ${t.perks.map(p => `<li><span class="perk-check">✓</span> ${p}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      `
      : '';

    // Modal countdown timer markup
    const countdownTarget = new Date(event.date).getTime();

    this.elements.detailsModalBody.innerHTML = `
      <div class="modal-event-hero" style="background-image: linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.9) 100%), url('${event.image}');">
        <div class="modal-hero-content">
          <div class="modal-badges">
            <span class="category-badge cat-${event.category}">${event.categoryLabel}</span>
            <span class="badge-type">${event.locationType}</span>
          </div>
          <h2 class="modal-event-title">${event.title}</h2>
          <div class="modal-meta-row">
            <span class="modal-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="modal-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${event.dateFormatted} • ${event.time}
            </span>
            <span class="modal-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="modal-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${event.venue}
            </span>
          </div>
        </div>
      </div>

      <!-- Live Event Countdown in Modal -->
      <div class="modal-countdown-bar">
        <div class="countdown-bar-title">Event Starts In:</div>
        <div id="modal-live-countdown" class="countdown-widget"></div>
      </div>

      <div class="modal-details-container">
        <!-- Overview -->
        <div class="modal-section">
          <h4 class="section-title">About this Event</h4>
          <p class="modal-description">${event.fullDescription}</p>
          <div class="event-tags-list">
            ${event.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
          </div>
        </div>

        ${speakersMarkup}
        ${agendaMarkup}
        ${tiersMarkup}

        <!-- Bottom Action Bar -->
        <div class="modal-footer-cta">
          <div class="cta-left">
            <span class="cta-price-label">Starting at</span>
            <span class="cta-price">${event.isFree ? 'Free Admission' : `$${event.price}`}</span>
            <span class="cta-spots">${event.spotsRemaining} spots available</span>
          </div>
          <button type="button" class="btn btn-primary btn-lg" id="modal-cta-register-btn" data-event-id="${event.id}">
            Register for this Event
          </button>
        </div>
      </div>
    `;

    // Live countdown update
    const countdownEl = document.getElementById('modal-live-countdown');
    if (this.state.modalCountdownInterval) clearInterval(this.state.modalCountdownInterval);

    const updateModalCountdown = () => {
      const now = new Date().getTime();
      const dist = countdownTarget - now;
      if (dist < 0) {
        countdownEl.innerHTML = `<span class="countdown-live">● EVENT HAS STARTED</span>`;
        if (this.state.modalCountdownInterval) clearInterval(this.state.modalCountdownInterval);
        return;
      }
      const days = Math.floor(dist / (1000 * 60 * 60 * 24));
      const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((dist % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `
        <span class="c-box"><strong>${days}</strong>d</span>
        <span class="c-box"><strong>${hours}</strong>h</span>
        <span class="c-box"><strong>${minutes}</strong>m</span>
        <span class="c-box"><strong>${seconds}</strong>s</span>
      `;
    };

    updateModalCountdown();
    this.state.modalCountdownInterval = setInterval(updateModalCountdown, 1000);

    // Bind bottom register CTA inside modal
    const modalRegisterBtn = document.getElementById('modal-cta-register-btn');
    if (modalRegisterBtn) {
      modalRegisterBtn.addEventListener('click', () => {
        this.closeModal(this.elements.detailsModal);
        this.openRegistrationModal(event.id);
      });
    }

    this.openModal(this.elements.detailsModal);
  },

  // ------------------------------------------------------------------------
  // Registration Modal & Dynamic Form Engine
  // ------------------------------------------------------------------------
  openRegistrationModal(preselectedEventId = null) {
    if (!this.elements.regModal || !this.elements.regForm) return;

    FormValidator.resetForm(this.elements.regForm);

    // Populate event selector
    this.elements.regEventSelect.innerHTML = `
      <option value="">-- Choose an Event --</option>
      ${this.state.events.map(e => `
        <option value="${e.id}" ${e.id === preselectedEventId ? 'selected' : ''}>
          ${e.title} (${e.dateFormatted} - ${e.isFree ? 'Free' : '$' + e.price})
        </option>
      `).join('')}
    `;

    // Populate ticket tiers based on selection
    this.updateTicketTiers(preselectedEventId);
    this.calculateRegistrationTotal();

    this.openModal(this.elements.regModal);
  },

  updateTicketTiers(eventId) {
    if (!this.elements.regTicketTierSelect) return;
    const event = this.state.events.find(e => e.id === eventId);

    if (!event || !event.ticketTiers || event.ticketTiers.length === 0) {
      this.elements.regTicketTierSelect.innerHTML = `<option value="general" data-price="${event ? event.price : 0}">General Admission (${event && event.isFree ? 'Free' : '$' + (event ? event.price : 0)})</option>`;
      return;
    }

    this.elements.regTicketTierSelect.innerHTML = event.ticketTiers.map((tier, idx) => `
      <option value="${tier.id}" data-price="${tier.price}" ${idx === 0 ? 'selected' : ''}>
        ${tier.name} — ${tier.price === 0 ? 'FREE' : '$' + tier.price}
      </option>
    `).join('');
  },

  calculateRegistrationTotal() {
    if (!this.elements.regPriceSummary) return;

    const eventId = this.elements.regEventSelect.value;
    const event = this.state.events.find(e => e.id === eventId);
    const selectedOption = this.elements.regTicketTierSelect.selectedOptions[0];
    const unitPrice = selectedOption ? parseFloat(selectedOption.dataset.price) || 0 : (event ? event.price : 0);
    const count = parseInt(this.elements.regTicketCount.value, 10) || 1;
    const subtotal = unitPrice * count;

    this.elements.regPriceSummary.innerHTML = `
      <div class="summary-line">
        <span>Unit Price:</span>
        <span>${unitPrice === 0 ? 'Free' : `$${unitPrice.toFixed(2)}`}</span>
      </div>
      <div class="summary-line">
        <span>Quantity:</span>
        <span>${count} ticket${count > 1 ? 's' : ''}</span>
      </div>
      <div class="summary-line total-line">
        <span>Total Payable:</span>
        <span class="total-amount">${subtotal === 0 ? 'FREE' : `$${subtotal.toFixed(2)}`}</span>
      </div>
    `;
  },

  handleRegistrationSubmit(e) {
    e.preventDefault();

    const validation = FormValidator.validateForm(this.elements.regForm);
    if (!validation.isValid) {
      Toast.show('Please fix the highlighted errors before submitting.', 'error');
      return;
    }

    const { fullName, email, phone, eventId, ticketTier, ticketCount, notes } = validation.data;
    const event = this.state.events.find(ev => ev.id === eventId);
    if (!event) {
      Toast.show('Selected event was not found.', 'error');
      return;
    }

    const tierOption = this.elements.regTicketTierSelect.selectedOptions[0];
    const tierName = tierOption ? tierOption.textContent.split('—')[0].trim() : 'Standard Admission';
    const unitPrice = tierOption ? parseFloat(tierOption.dataset.price) || 0 : event.price;
    const totalAmount = unitPrice * parseInt(ticketCount, 10);

    // Disable button to prevent double submits
    this.elements.regSubmitBtn.disabled = true;
    this.elements.regSubmitBtn.textContent = 'Securing Your Seat...';

    setTimeout(() => {
      // Save booking in LocalStorage
      const newBooking = StorageManager.saveBooking({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.dateFormatted,
        eventTime: event.time,
        eventVenue: event.venue,
        eventImage: event.image,
        category: event.category,
        fullName,
        email,
        phone,
        ticketTier: tierName,
        ticketCount: parseInt(ticketCount, 10),
        unitPrice,
        totalAmount,
        notes: notes || '',
        status: 'Confirmed'
      });

      this.elements.regSubmitBtn.disabled = false;
      this.elements.regSubmitBtn.textContent = 'Confirm Registration';

      this.closeModal(this.elements.regModal);
      this.updateBookingsBadge();

      // Launch Confetti Celebration
      this.launchConfetti();

      // Show stylized boarding pass modal
      this.showTicketPassModal(newBooking);

      Toast.show('🎉 Registration Successful! Your pass is ready.', 'success', 5000);
    }, 600);
  },

  // ------------------------------------------------------------------------
  // Ticket Pass & Boarding Confirmation
  // ------------------------------------------------------------------------
  showTicketPassModal(booking) {
    if (!this.elements.ticketModal || !this.elements.ticketModalBody) return;

    this.elements.ticketModalBody.innerHTML = `
      <div class="ticket-pass-wrapper" id="printable-ticket">
        <!-- Header Stub -->
        <div class="ticket-header">
          <div class="ticket-brand">
            <span class="brand-logo">⚡ EventPulse Pass</span>
          </div>
          <div class="ticket-status-pill">CONFIRMED</div>
        </div>

        <!-- Main Body -->
        <div class="ticket-main">
          <h3 class="ticket-event-name">${booking.eventTitle}</h3>
          
          <div class="ticket-grid">
            <div class="ticket-col">
              <span class="ticket-label">ATTENDEE</span>
              <span class="ticket-val">${booking.fullName}</span>
            </div>
            <div class="ticket-col">
              <span class="ticket-label">BOOKING REF</span>
              <span class="ticket-val ref-code">${booking.bookingId}</span>
            </div>
            <div class="ticket-col">
              <span class="ticket-label">DATE & TIME</span>
              <span class="ticket-val">${booking.eventDate} • ${booking.eventTime}</span>
            </div>
            <div class="ticket-col">
              <span class="ticket-label">VENUE</span>
              <span class="ticket-val">${booking.eventVenue}</span>
            </div>
            <div class="ticket-col">
              <span class="ticket-label">TIER</span>
              <span class="ticket-val">${booking.ticketTier}</span>
            </div>
            <div class="ticket-col">
              <span class="ticket-label">SEATS / TICKETS</span>
              <span class="ticket-val">${booking.ticketCount} Attendee${booking.ticketCount > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <!-- Perforated Divider -->
        <div class="ticket-perforation">
          <div class="cut-circle cut-left"></div>
          <div class="cut-line"></div>
          <div class="cut-circle cut-right"></div>
        </div>

        <!-- Stub with Simulated QR/Barcode -->
        <div class="ticket-stub">
          <div class="qr-mockup" title="Simulated Ticket Check-in Code">
            <svg viewBox="0 0 100 100" class="qr-svg">
              <rect x="0" y="0" width="100" height="100" fill="#ffffff"/>
              <!-- Corners -->
              <rect x="10" y="10" width="25" height="25" fill="#0f172a"/>
              <rect x="15" y="15" width="15" height="15" fill="#ffffff"/>
              <rect x="18" y="18" width="9" height="9" fill="#0f172a"/>
              
              <rect x="65" y="10" width="25" height="25" fill="#0f172a"/>
              <rect x="70" y="15" width="15" height="15" fill="#ffffff"/>
              <rect x="73" y="18" width="9" height="9" fill="#0f172a"/>
              
              <rect x="10" y="65" width="25" height="25" fill="#0f172a"/>
              <rect x="15" y="70" width="15" height="15" fill="#ffffff"/>
              <rect x="18" y="73" width="9" height="9" fill="#0f172a"/>

              <!-- Dots -->
              <rect x="42" y="12" width="6" height="6" fill="#0f172a"/>
              <rect x="52" y="18" width="6" height="6" fill="#0f172a"/>
              <rect x="42" y="42" width="16" height="16" fill="#0f172a"/>
              <rect x="65" y="45" width="8" height="8" fill="#0f172a"/>
              <rect x="80" y="55" width="8" height="8" fill="#0f172a"/>
              <rect x="45" y="68" width="8" height="8" fill="#0f172a"/>
              <rect x="72" y="72" width="16" height="16" fill="#0f172a"/>
            </svg>
          </div>
          <div class="stub-info">
            <div class="stub-label">SCAN AT ENTRANCE</div>
            <div class="stub-code">${booking.bookingId}</div>
            <div class="stub-note">Admit ${booking.ticketCount} • Non-transferable</div>
          </div>
        </div>
      </div>

      <div class="ticket-modal-actions">
        <button type="button" class="btn btn-secondary" onclick="window.print()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / Save PDF
        </button>
        <button type="button" class="btn btn-primary" id="ticket-modal-done-btn">
          View All Bookings
        </button>
      </div>
    `;

    const doneBtn = document.getElementById('ticket-modal-done-btn');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        this.closeModal(this.elements.ticketModal);
        this.openMyBookingsModal();
      });
    }

    this.openModal(this.elements.ticketModal);
  },

  // ------------------------------------------------------------------------
  // "My Bookings" Drawer / Modal
  // ------------------------------------------------------------------------
  openMyBookingsModal() {
    if (!this.elements.bookingsModal || !this.elements.bookingsList) return;

    const bookings = StorageManager.getBookings();

    if (bookings.length === 0) {
      this.elements.bookingsList.style.display = 'none';
      if (this.elements.emptyBookingsState) this.elements.emptyBookingsState.style.display = 'block';
    } else {
      if (this.elements.emptyBookingsState) this.elements.emptyBookingsState.style.display = 'none';
      this.elements.bookingsList.style.display = 'flex';

      this.elements.bookingsList.innerHTML = bookings.map(b => `
        <div class="booking-item-card" data-booking-id="${b.bookingId}">
          <div class="booking-item-img" style="background-image: url('${b.eventImage}');">
            <span class="booking-badge-confirmed">CONFIRMED</span>
          </div>

          <div class="booking-item-content">
            <div class="booking-item-top">
              <span class="booking-ref">${b.bookingId}</span>
              <span class="booking-date-booked">Booked on ${new Date(b.createdAt).toLocaleDateString()}</span>
            </div>

            <h4 class="booking-event-title">${b.eventTitle}</h4>
            
            <div class="booking-details-row">
              <span>📅 ${b.eventDate}</span>
              <span>📍 ${b.eventVenue}</span>
              <span>🎟️ ${b.ticketCount}x ${b.ticketTier}</span>
              <span>💰 ${b.totalAmount === 0 ? 'Free' : '$' + b.totalAmount.toFixed(2)}</span>
            </div>

            <div class="booking-item-actions">
              <button type="button" class="btn btn-secondary btn-sm view-ticket-btn" data-booking-id="${b.bookingId}">
                View Pass
              </button>
              <button type="button" class="btn btn-danger-outline btn-sm cancel-booking-btn" data-booking-id="${b.bookingId}">
                Cancel Registration
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    this.openModal(this.elements.bookingsModal);
  },

  updateBookingsBadge() {
    const bookings = StorageManager.getBookings();
    const count = bookings.length;
    if (this.elements.bookingsBadge) {
      this.elements.bookingsBadge.textContent = count;
      this.elements.bookingsBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    if (this.elements.bookingsBadgeMobile) {
      this.elements.bookingsBadgeMobile.textContent = count;
      this.elements.bookingsBadgeMobile.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  },

  // ------------------------------------------------------------------------
  // Modal Helpers
  // ------------------------------------------------------------------------
  openModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.add('is-open');
    modalElement.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  },

  closeModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.remove('is-open');
    modalElement.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (this.state.modalCountdownInterval) {
      clearInterval(this.state.modalCountdownInterval);
    }
  },

  // ------------------------------------------------------------------------
  // Confetti Particle Effect
  // ------------------------------------------------------------------------
  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas') || document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.className = 'confetti-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 3,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    let animationFrame;
    let frames = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      frames++;
      if (frames < 140) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };

    render();
  },

  // ------------------------------------------------------------------------
  // Scroll Navbar Transition
  // ------------------------------------------------------------------------
  initScrollHeader() {
    window.addEventListener('scroll', () => {
      if (!this.elements.navbar) return;
      if (window.scrollY > 40) {
        this.elements.navbar.classList.add('navbar-scrolled');
      } else {
        this.elements.navbar.classList.remove('navbar-scrolled');
      }
    });
  },

  // ------------------------------------------------------------------------
  // Event Listeners Binding
  // ------------------------------------------------------------------------
  bindEvents() {
    // Theme toggle
    if (this.elements.themeToggleBtn) {
      this.elements.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = StorageManager.toggleTheme();
        this.updateThemeButtonIcon(nextTheme);
        Toast.show(`Switched to ${nextTheme} theme`, 'info', 2000);
      });
    }

    // Mobile nav toggle
    if (this.elements.mobileMenuBtn && this.elements.mobileNav) {
      this.elements.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = this.elements.mobileNav.classList.toggle('is-open');
        this.elements.mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      });

      // Close mobile nav on link click
      this.elements.mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          this.elements.mobileNav.classList.remove('is-open');
          this.elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Hero search
    if (this.elements.heroSearchBtn && this.elements.heroSearchInput) {
      const executeHeroSearch = () => {
        const query = this.elements.heroSearchInput.value.trim();
        this.state.searchQuery = query;
        if (this.elements.searchInput) {
          this.elements.searchInput.value = query;
        }
        this.applyFilters();
        const eventsSection = document.getElementById('events-catalog');
        if (eventsSection) {
          eventsSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      this.elements.heroSearchBtn.addEventListener('click', executeHeroSearch);
      this.elements.heroSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeHeroSearch();
      });
    }

    if (this.elements.heroExploreBtn) {
      this.elements.heroExploreBtn.addEventListener('click', () => {
        const eventsSection = document.getElementById('events-catalog');
        if (eventsSection) {
          eventsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Main search input
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.trim();
        this.applyFilters();
      });
    }

    // Category pills click delegation
    if (this.elements.categoryPillsContainer) {
      this.elements.categoryPillsContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.category-pill');
        if (!pill) return;

        this.elements.categoryPillsContainer.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        this.state.selectedCategory = pill.dataset.category;
        this.applyFilters();
      });
    }

    // Date filter
    if (this.elements.dateFilterSelect) {
      this.elements.dateFilterSelect.addEventListener('change', (e) => {
        this.state.selectedDateFilter = e.target.value;
        this.applyFilters();
      });
    }

    // Sort select
    if (this.elements.sortSelect) {
      this.elements.sortSelect.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Favorites filter toggle
    if (this.elements.favoritesToggleBtn) {
      this.elements.favoritesToggleBtn.addEventListener('click', () => {
        this.state.showFavoritesOnly = !this.state.showFavoritesOnly;
        this.elements.favoritesToggleBtn.classList.toggle('active', this.state.showFavoritesOnly);
        this.applyFilters();
      });
    }

    // Clear filters
    if (this.elements.clearFiltersBtn) {
      this.elements.clearFiltersBtn.addEventListener('click', () => this.resetFilters());
    }
    if (this.elements.resetSearchBtn) {
      this.elements.resetSearchBtn.addEventListener('click', () => this.resetFilters());
    }

    // Event grid clicks delegation (Favorite button, View details, Register)
    if (this.elements.eventsGrid) {
      this.elements.eventsGrid.addEventListener('click', (e) => {
        // Favorite toggle
        const favBtn = e.target.closest('.card-favorite-btn');
        if (favBtn) {
          e.stopPropagation();
          const eventId = favBtn.dataset.eventId;
          const isNowFav = StorageManager.toggleFavorite(eventId);
          favBtn.classList.toggle('is-favorite', isNowFav);
          favBtn.setAttribute('aria-label', isNowFav ? 'Remove from favorites' : 'Save to favorites');
          favBtn.querySelector('.fav-icon').setAttribute('fill', isNowFav ? 'currentColor' : 'none');
          Toast.show(isNowFav ? 'Saved to your favorites! ❤️' : 'Removed from favorites', 'info', 2000);
          if (this.state.showFavoritesOnly) this.applyFilters();
          return;
        }

        // View Details
        const detailsBtn = e.target.closest('.view-details-btn');
        if (detailsBtn) {
          const eventId = detailsBtn.dataset.eventId;
          this.openEventDetails(eventId);
          return;
        }

        // Register Now
        const regBtn = e.target.closest('.register-card-btn');
        if (regBtn) {
          const eventId = regBtn.dataset.eventId;
          this.openRegistrationModal(eventId);
          return;
        }

        // Clicking whole card opens details
        const card = e.target.closest('.event-card');
        if (card && !e.target.closest('button')) {
          this.openEventDetails(card.dataset.eventId);
        }
      });
    }

    // Details Modal Close
    if (this.elements.detailsModalClose) {
      this.elements.detailsModalClose.addEventListener('click', () => this.closeModal(this.elements.detailsModal));
    }

    // Registration Modal Close & Input Listeners
    if (this.elements.regModalClose) {
      this.elements.regModalClose.addEventListener('click', () => this.closeModal(this.elements.regModal));
    }

    if (this.elements.regEventSelect) {
      this.elements.regEventSelect.addEventListener('change', (e) => {
        this.updateTicketTiers(e.target.value);
        this.calculateRegistrationTotal();
      });
    }

    if (this.elements.regTicketTierSelect) {
      this.elements.regTicketTierSelect.addEventListener('change', () => this.calculateRegistrationTotal());
    }

    if (this.elements.regTicketCount) {
      this.elements.regTicketCount.addEventListener('input', () => this.calculateRegistrationTotal());
    }

    // Real-time inline field validation on blur & input
    if (this.elements.regForm) {
      const inputs = this.elements.regForm.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => FormValidator.validateField(input));
        input.addEventListener('input', () => {
          if (input.closest('.form-group') && input.closest('.form-group').classList.contains('has-error')) {
            FormValidator.validateField(input);
          }
        });
      });

      this.elements.regForm.addEventListener('submit', (e) => this.handleRegistrationSubmit(e));
    }

    // Ticket Pass Modal Close
    if (this.elements.ticketModalClose) {
      this.elements.ticketModalClose.addEventListener('click', () => this.closeModal(this.elements.ticketModal));
    }

    // My Bookings Open Buttons
    if (this.elements.myBookingsNavBtn) {
      this.elements.myBookingsNavBtn.addEventListener('click', () => this.openMyBookingsModal());
    }
    if (this.elements.myBookingsMobileBtn) {
      this.elements.myBookingsMobileBtn.addEventListener('click', () => {
        if (this.elements.mobileNav) this.elements.mobileNav.classList.remove('is-open');
        this.openMyBookingsModal();
      });
    }

    // My Bookings Close
    if (this.elements.bookingsModalClose) {
      this.elements.bookingsModalClose.addEventListener('click', () => this.closeModal(this.elements.bookingsModal));
    }

    // Bookings Modal delegation (View Pass, Cancel)
    if (this.elements.bookingsList) {
      this.elements.bookingsList.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.view-ticket-btn');
        if (viewBtn) {
          const bookingId = viewBtn.dataset.bookingId;
          const booking = StorageManager.getBookingById(bookingId);
          if (booking) {
            this.closeModal(this.elements.bookingsModal);
            this.showTicketPassModal(booking);
          }
          return;
        }

        const cancelBtn = e.target.closest('.cancel-booking-btn');
        if (cancelBtn) {
          const bookingId = cancelBtn.dataset.bookingId;
          if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
            StorageManager.cancelBooking(bookingId);
            this.updateBookingsBadge();
            this.openMyBookingsModal();
            Toast.show('Booking was successfully cancelled.', 'info', 3000);
          }
        }
      });
    }

    // Close modal on backdrop click or ESC key
    const allModals = [
      this.elements.detailsModal,
      this.elements.regModal,
      this.elements.ticketModal,
      this.elements.bookingsModal
    ];

    allModals.forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        allModals.forEach(m => this.closeModal(m));
      }
    });

    // Reactive Storage Listeners
    window.addEventListener('eventpulse:bookingsUpdated', () => {
      this.updateBookingsBadge();
    });
  },

  resetFilters() {
    this.state.searchQuery = '';
    this.state.selectedCategory = 'all';
    this.state.selectedDateFilter = 'all';
    this.state.sortBy = 'date-asc';
    this.state.showFavoritesOnly = false;

    if (this.elements.searchInput) this.elements.searchInput.value = '';
    if (this.elements.heroSearchInput) this.elements.heroSearchInput.value = '';
    if (this.elements.dateFilterSelect) this.elements.dateFilterSelect.value = 'all';
    if (this.elements.sortSelect) this.elements.sortSelect.value = 'date-asc';
    if (this.elements.favoritesToggleBtn) this.elements.favoritesToggleBtn.classList.remove('active');

    this.renderCategoryPills();
    this.applyFilters();
    Toast.show('Filters reset', 'info', 1500);
  }
};
