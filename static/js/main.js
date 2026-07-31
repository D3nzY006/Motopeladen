/**
 * MotoPeladen Motorcycle Repair Website JavaScript
 * Main application logic and interactivity
 */

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initFormValidation();
    initServiceDetails();
    initMobileMenu();
    initScrollAnimations();
});

/**
 * Navigation Functions
 */
function initNavigation() {
    // Highlight current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.style.color = '#e53935';
            link.style.fontWeight = '700';
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

function initMobileMenu() {
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.header');
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 768 && navMenu && menuToggle) {
            if (!nav.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
}

/**
 * Smooth Scrolling
 */
function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

/**
 * Form Validation
 */
function initFormValidation() {
    // Booking form validation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                const errorElement = field.parentElement.querySelector('.error-message');
                
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                    if (errorElement) {
                        errorElement.textContent = 'This field is required.';
                    }
                } else {
                    field.style.borderColor = '#cbd5e0';
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = '#e53e3e';
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid email address.';
                        }
                    }
                }
                
                // Phone validation
                if (field.name === 'customer_phone' && field.value) {
                    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
                    if (!phoneRegex.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = '#e53e3e';
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid phone number.';
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = this.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.parentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // Real-time validation
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', function() {
                this.style.borderColor = '#cbd5e0';
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }
}

function validateField(e) {
    const field = e.target;
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!field.value.trim()) {
        field.style.borderColor = '#e53e3e';
        if (errorElement) {
            errorElement.textContent = 'This field is required.';
        }
        return false;
    }
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.style.borderColor = '#e53e3e';
            if (errorElement) {
                errorElement.textContent = 'Please enter a valid email address.';
            }
            return false;
        }
    }
    
    // Phone validation
    if (field.name === 'customer_phone') {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            field.style.borderColor = '#e53e3e';
            if (errorElement) {
                errorElement.textContent = 'Please enter a valid phone number.';
            }
            return false;
        }
    }
    
    field.style.borderColor = '#cbd5e0';
    if (errorElement) {
        errorElement.textContent = '';
    }
    return true;
}

/**
 * Service Details Interaction
 */
function initServiceDetails() {
    const serviceSelect = document.getElementById('id_service');
    const serviceInfo = document.getElementById('service-info');
    
    if (serviceSelect && serviceInfo) {
        serviceSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const serviceId = this.value;
            
            if (serviceId) {
                // Fetch service details via AJAX or use data attributes
                const serviceData = selectedOption.dataset;
                
                serviceInfo.innerHTML = `
                    <h4 class="font-bold text-automotive mb-2">${selectedOption.text}</h4>
                    <p class="text-gray-600 mb-2">${serviceData.description || 'Service description not available.'}</p>
                    <div class="flex justify-between text-sm">
                        <span class="text-accent-color font-bold">₱${serviceData.price || '0.00'}</span>
                        <span class="text-gray-500">${serviceData.duration || '0'} minutes</span>
                    </div>
                `;
            } else {
                serviceInfo.innerHTML = '<p>Please select a service to view details.</p>';
            }
        });
        
        // Initialize with first option if available
        if (serviceSelect.options.length > 1) {
            serviceSelect.dispatchEvent(new Event('change'));
        }
    }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .stat-card, .hero');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Booking Form Enhancements
 */
function initBookingFormEnhancements() {
    const dateInput = document.getElementById('id_booking_date');
    const timeInput = document.getElementById('id_booking_time');
    const serviceSelect = document.getElementById('id_service');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Clear time when date changes
        dateInput.addEventListener('change', function() {
            if (timeInput) {
                timeInput.value = '';
            }
        });
    }
    
    if (serviceSelect && dateInput && timeInput) {
        // Load available time slots when service and date are selected
        const loadTimeSlots = debounce(function() {
            const serviceId = serviceSelect.value;
            const date = dateInput.value;
            
            if (serviceId && date) {
                fetchAvailableSlots(serviceId, date);
            }
        }, 300);
        
        serviceSelect.addEventListener('change', loadTimeSlots);
        dateInput.addEventListener('change', loadTimeSlots);
    }
}

function fetchAvailableSlots(serviceId, date) {
    // This would typically make an AJAX request to the server
    // For now, we'll simulate available times
    const timeInput = document.getElementById('id_booking_time');
    if (!timeInput) return;
    
    // Simulate API call delay
    setTimeout(() => {
        const availableSlots = generateTimeSlots(date);
        updateTimeOptions(timeInput, availableSlots);
    }, 500);
}

function generateTimeSlots(date) {
    // Generate time slots from 9 AM to 6 PM, every hour
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
        const time = hour.toString().padStart(2, '0') + ':00';
        slots.push(time);
    }
    
    return slots;
}

function updateTimeOptions(timeInput, slots) {
    // Clear existing options
    timeInput.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Time';
    timeInput.appendChild(defaultOption);
    
    // Add available slots
    slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeInput.appendChild(option);
    });
}

/**
 * Utility Functions
 */
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

function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#38a169' : '#e53e3e',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

/**
 * Staff Dashboard Functions
 */
function initStaffDashboard() {
    // Status update functionality
    const statusSelects = document.querySelectorAll('select[name="status"]');
    
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const form = this.closest('form');
            if (form) {
                // Add loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Updating...';
                }
                
                // Submit form
                form.submit();
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const bookingRows = document.querySelectorAll('.table tbody tr');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            bookingRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Initialize page-specific functionality
 */
function initPageSpecific() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('book')) {
        initBookingFormEnhancements();
    } else if (currentPath.includes('staff')) {
        initStaffDashboard();
    }
}

// Initialize page-specific functionality after DOM is ready
document.addEventListener('DOMContentLoaded', initPageSpecific);