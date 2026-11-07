// ==========================================================================
// EventPulse - Storage & State Management
// Handles LocalStorage persistence for Bookings, Favorites, and Theme
// ==========================================================================

const STORAGE_KEYS = {
  BOOKINGS: 'eventpulse_bookings_v1',
  FAVORITES: 'eventpulse_favorites_v1',
  THEME: 'eventpulse_theme_pref'
};

const StorageManager = {
  // ------------------------------------------------------------------------
  // Bookings / Registrations
  // ------------------------------------------------------------------------
  getBookings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to read bookings from localStorage:', err);
      return [];
    }
  },

  saveBooking(booking) {
    try {
      const bookings = this.getBookings();
      // Generate a distinct booking reference if not provided
      if (!booking.bookingId) {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        booking.bookingId = `EP-${randomNum}-${(booking.category || 'EVT').slice(0, 3).toUpperCase()}`;
      }
      booking.createdAt = new Date().toISOString();
      bookings.unshift(booking);
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      window.dispatchEvent(new CustomEvent('eventpulse:bookingsUpdated', { detail: { bookings } }));
      return booking;
    } catch (err) {
      console.error('Failed to save booking to localStorage:', err);
      return null;
    }
  },

  cancelBooking(bookingId) {
    try {
      let bookings = this.getBookings();
      bookings = bookings.filter(b => b.bookingId !== bookingId);
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      window.dispatchEvent(new CustomEvent('eventpulse:bookingsUpdated', { detail: { bookings } }));
      return true;
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      return false;
    }
  },

  getBookingById(bookingId) {
    const bookings = this.getBookings();
    return bookings.find(b => b.bookingId === bookingId) || null;
  },

  // ------------------------------------------------------------------------
  // Favorites / Saved Events
  // ------------------------------------------------------------------------
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to read favorites:', err);
      return [];
    }
  },

  toggleFavorite(eventId) {
    try {
      let favorites = this.getFavorites();
      const index = favorites.indexOf(eventId);
      let isFav = false;
      if (index > -1) {
        favorites.splice(index, 1);
        isFav = false;
      } else {
        favorites.push(eventId);
        isFav = true;
      }
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      window.dispatchEvent(new CustomEvent('eventpulse:favoritesUpdated', { detail: { favorites, eventId, isFav } }));
      return isFav;
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      return false;
    }
  },

  isFavorite(eventId) {
    const favorites = this.getFavorites();
    return favorites.includes(eventId);
  },

  // ------------------------------------------------------------------------
  // Theme (Dark / Light Mode)
  // ------------------------------------------------------------------------
  getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    // Default to system preference, fallback to dark for aesthetic modern event theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Storage unavailable for theme');
    }
    window.dispatchEvent(new CustomEvent('eventpulse:themeChanged', { detail: { theme } }));
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || this.getPreferredTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }
};

// --------------------------------------------------------------------------
// Non-intrusive Toast Notifications
// --------------------------------------------------------------------------
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        document.body.appendChild(this.container);
      }
    }
  },

  show(message, type = 'info', duration = 3500) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-slide-in`;

    const iconSvg = {
      success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
      error: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      warning: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    }[type] || '';

    toast.innerHTML = `
      <div class="toast-content">
        ${iconSvg}
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('toast-fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    };

    closeBtn.addEventListener('click', dismiss);
    this.container.appendChild(toast);

    setTimeout(dismiss, duration);
  }
};
