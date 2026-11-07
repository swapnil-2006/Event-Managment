// ==========================================================================
// EventPulse - Form Validation & Ticket Pricing Engine
// Provides real-time field validation, error states, and live calculations
// ==========================================================================

const FormValidator = {
  // Regex rules
  patterns: {
    name: /^[a-zA-Z\s'.\-\u00C0-\u024F]{2,50}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    phone: /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4,6}$/
  },

  // Field validation rules
  validateField(inputElement) {
    const fieldName = inputElement.name;
    const value = inputElement.value ? inputElement.value.trim() : '';
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'fullName':
        if (!value) {
          isValid = false;
          errorMessage = 'Full name is required.';
        } else if (value.length < 3) {
          isValid = false;
          errorMessage = 'Name must be at least 3 characters.';
        } else if (!this.patterns.name.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid full name (letters only).';
        }
        break;

      case 'email':
        if (!value) {
          isValid = false;
          errorMessage = 'Email address is required.';
        } else if (!this.patterns.email.test(value)) {
          isValid = false;
          errorMessage = 'Please provide a valid email (e.g., name@example.com).';
        }
        break;

      case 'phone':
        if (!value) {
          isValid = false;
          errorMessage = 'Phone number is required.';
        } else {
          // Strip spaces, dashes, parens to count digits
          const cleanDigits = value.replace(/\D/g, '');
          if (cleanDigits.length < 8 || cleanDigits.length > 15 || !this.patterns.phone.test(value)) {
            isValid = false;
            errorMessage = 'Please provide a valid phone number (8-15 digits).';
          }
        }
        break;

      case 'eventId':
        if (!value || value === '') {
          isValid = false;
          errorMessage = 'Please select an event to attend.';
        }
        break;

      case 'ticketTier':
        if (!value) {
          isValid = false;
          errorMessage = 'Please select a ticket tier.';
        }
        break;

      case 'ticketCount':
        const count = parseInt(value, 10);
        if (isNaN(count) || count < 1 || count > 10) {
          isValid = false;
          errorMessage = 'Select between 1 and 10 tickets.';
        }
        break;

      case 'agreeTerms':
        if (!inputElement.checked) {
          isValid = false;
          errorMessage = 'You must agree to the Terms & Privacy Policy.';
        }
        break;

      default:
        break;
    }

    this.renderFieldState(inputElement, isValid, errorMessage);
    return { isValid, errorMessage, value };
  },

  renderFieldState(inputElement, isValid, errorMessage) {
    const parentGroup = inputElement.closest('.form-group') || inputElement.parentElement;
    if (!parentGroup) return;

    let errorEl = parentGroup.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'field-error';
      parentGroup.appendChild(errorEl);
    }

    if (isValid) {
      parentGroup.classList.remove('has-error');
      parentGroup.classList.add('is-valid');
      inputElement.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    } else {
      parentGroup.classList.remove('is-valid');
      parentGroup.classList.add('has-error');
      inputElement.setAttribute('aria-invalid', 'true');
      errorEl.textContent = errorMessage;
      errorEl.style.display = 'block';
    }
  },

  clearFieldState(inputElement) {
    const parentGroup = inputElement.closest('.form-group') || inputElement.parentElement;
    if (!parentGroup) return;
    parentGroup.classList.remove('has-error', 'is-valid');
    inputElement.removeAttribute('aria-invalid');
    const errorEl = parentGroup.querySelector('.field-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  },

  validateForm(formElement) {
    const requiredInputs = formElement.querySelectorAll('input[required], select[required]');
    let formIsValid = true;
    let firstInvalidField = null;
    const formData = {};

    requiredInputs.forEach(input => {
      const res = this.validateField(input);
      if (!res.isValid) {
        formIsValid = false;
        if (!firstInvalidField) {
          firstInvalidField = input;
        }
      }
      formData[input.name] = res.value;
    });

    // Check optional fields
    const optionalInputs = formElement.querySelectorAll('input:not([required]), select:not([required]), textarea');
    optionalInputs.forEach(input => {
      formData[input.name] = input.type === 'checkbox' ? input.checked : input.value.trim();
    });

    if (!formIsValid && firstInvalidField) {
      firstInvalidField.focus();
    }

    return { isValid: formIsValid, data: formData };
  },

  resetForm(formElement) {
    formElement.reset();
    const fields = formElement.querySelectorAll('input, select, textarea');
    fields.forEach(f => this.clearFieldState(f));
  }
};
