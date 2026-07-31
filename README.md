# MotoPeladen Motorcycle Repair Website

A modern, responsive website for a motorcycle repair shop with a comprehensive booking system, customer testimonials, and staff management dashboard.

## Features

### 🎨 Modern Design
- **Automotive Theme**: Black, gray, and red color scheme with motorcycle-inspired design elements
- **Responsive Layout**: Fully mobile-responsive design that works on all devices
- **Professional Typography**: Clean, readable fonts with proper spacing and hierarchy
- **High-Quality Images**: Professional motorcycle and shop imagery

### 📅 Booking System
- **Service Selection**: Browse and select from available repair services
- **Date & Time Picker**: Interactive calendar and time slot selection
- **Customer Information**: Capture customer details, motorcycle model, and contact information
- **Real-time Validation**: Form validation with helpful error messages
- **Email Confirmation**: Automatic email confirmations sent to customers

### 🏢 Staff Management
- **Dashboard Overview**: View all bookings with status indicators
- **Status Management**: Update booking statuses (Pending, Confirmed, Completed, Cancelled)
- **Customer Details**: View complete customer and service information
- **Search & Filter**: Find specific bookings quickly

### 💬 Customer Testimonials
- **Review System**: Customers can leave ratings and reviews
- **Display System**: Published testimonials displayed on the homepage
- **Rating Visualization**: Star ratings for easy review assessment

### 🚀 Technical Features
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Fast Loading**: Optimized images and efficient code
- **Accessibility**: WCAG-compliant design with proper ARIA labels
- **Security**: Django security best practices implemented

## Technology Stack

### Backend
- **Python 3.14**
- **Django 5.2.8** - Web framework
- **SQLite** - Database (easily upgradable to PostgreSQL/MySQL)

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables
- **JavaScript ES6+** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Development Tools
- **Tailwind CSS** - Utility-first CSS framework
- **Django Templates** - Server-side rendering
- **Git** - Version control

## Installation

### Prerequisites
- Python 3.14 or higher
- pip (Python package manager)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MotoPeladen_Website
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (for admin access)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the website**
   - Frontend: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

## Project Structure

```
MotoPeladen_Website/
├── myproject/                  # Django project configuration
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py            # Application settings
│   ├── urls.py               # Main URL configuration
│   └── wsgi.py
├── app/                      # Original app (legacy)
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── booking/                  # New booking system app
│   ├── __init__.py
│   ├── admin.py             # Admin interface for bookings
│   ├── apps.py
│   ├── migrations/          # Database migrations
│   ├── models.py            # Booking, Service, Testimonial models
│   ├── tests.py
│   ├── urls.py              # Booking app URLs
│   └── views.py             # Booking views and logic
├── static/                   # Static files
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── js/
│   │   └── main.js          # JavaScript functionality
│   └── images/              # Website images
├── templates/                # HTML templates
│   ├── booking/
│   │   ├── base.html        # Base template
│   │   ├── index.html       # Homepage
│   │   ├── book_service.html # Booking form
│   │   ├── booking_success.html
│   │   ├── testimonials.html
│   │   └── staff_dashboard.html
│   └── app/                 # Original app templates
├── media/                    # User-uploaded files
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Usage

### For Customers

1. **Browse Services**: Visit the homepage to see available services
2. **Book Appointment**: Click "Book Service" to schedule a repair
3. **Fill Form**: Complete the booking form with your details
4. **Confirmation**: Receive email confirmation with booking details

### For Staff

1. **Access Dashboard**: Log in to the staff dashboard
2. **View Bookings**: See all customer appointments
3. **Update Status**: Change booking statuses as work progresses
4. **Manage Reviews**: Review and approve customer testimonials

### For Administrators

1. **Admin Panel**: Access Django admin at `/admin`
2. **Manage Content**: Add/edit services, bookings, and testimonials
3. **User Management**: Create and manage staff accounts
4. **System Settings**: Configure email settings and other options

## Configuration

### Email Settings

To enable email functionality in production:

1. Update `settings.py`:
   ```python
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'your-smtp-host.com'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your-email@domain.com'
   EMAIL_HOST_PASSWORD = 'your-password'
   DEFAULT_FROM_EMAIL = 'noreply@motopeladen.com'
   ```

2. For Gmail:
   ```python
   EMAIL_HOST = 'smtp.gmail.com'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your-gmail@gmail.com'
   EMAIL_HOST_PASSWORD = 'your-app-password'  # Use app password
   ```

### Database Configuration

For production, update `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'motopeladen_db',
        'USER': 'db_user',
        'PASSWORD': 'db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Customization

### Colors and Theme

Edit CSS variables in `static/css/styles.css`:

```css
:root {
    --primary-color: #1a1a1a;      /* Main dark color */
    --secondary-color: #2d3748;    /* Secondary dark color */
    --accent-color: #e53935;       /* Red accent */
    --text-color: #333;           /* Main text */
}
```

### Adding New Services

1. In Django admin, go to "Services" section
2. Click "Add Service"
3. Fill in name, description, price, and duration
4. Save the new service

### Customizing Forms

Edit form fields in `booking/forms.py`:

```python
class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = [
            'customer_name', 'customer_email', 'customer_phone',
            'motorcycle_model', 'motorcycle_plate', 'service',
            'booking_date', 'booking_time', 'notes'
        ]
```

## Security

The application includes several security features:

- **CSRF Protection**: Enabled by default in Django
- **Input Validation**: Server-side validation for all forms
- **Password Hashing**: Secure password storage
- **Admin Security**: Protected admin interface
- **Email Security**: Proper email backend configuration

## Performance Optimization

- **Static Files**: Properly configured static file serving
- **Database Indexes**: Added to frequently queried fields
- **Image Optimization**: Images compressed and optimized
- **CSS/JS Minification**: Ready for production minification
- **Caching**: Ready for Redis/Memcached integration

## Deployment

### Production Deployment

1. **Environment Variables**: Use environment variables for sensitive data
2. **Static Files**: Configure static file serving (AWS S3, CloudFront)
3. **Database**: Use PostgreSQL in production
4. **Security**: Set `DEBUG = False` and configure allowed hosts
5. **SSL**: Enable HTTPS with SSL certificate

### Docker Deployment

A Docker configuration can be added for containerized deployment:

```dockerfile
FROM python:3.14-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## Troubleshooting

### Common Issues

1. **Migration Errors**: Run `python manage.py migrate` after model changes
2. **Static Files Not Loading**: Check `STATIC_URL` and `STATIC_ROOT` settings
3. **Email Not Sending**: Verify email backend configuration
4. **Permission Errors**: Ensure proper file permissions for media directory

### Debug Mode

Enable debug mode in `settings.py`:

```python
DEBUG = True  # Only in development
```

### Logs

Check Django logs for errors:

```bash
python manage.py runserver --verbosity=2
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for your changes
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Documentation**: This README contains comprehensive setup and usage instructions
- **Code Comments**: Extensive inline documentation for complex functionality

## Future Enhancements

Planned features for future versions:

- **Calendar Integration**: Google Calendar sync for staff
- **SMS Notifications**: Text message confirmations
- **Customer Portal**: User accounts and booking history
- **Service Packages**: Bundled service offerings
- **Online Payments**: Integration with payment processors
- **Mobile App**: Native mobile application
- **Inventory Management**: Track parts and supplies
- **Analytics Dashboard**: Business metrics and reporting

---

**MotoPeladen Motorcycle Repair Website** - Professional, modern, and feature-rich solution for motorcycle repair businesses.