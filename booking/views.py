from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from datetime import datetime, timedelta
from .models import Service, Booking, Testimonial
from .forms import BookingForm, TestimonialForm

def index(request):
    services = Service.objects.filter(is_active=True)
    testimonials = Testimonial.objects.filter(is_published=True).order_by('-created_at')[:5]
    context = {
        'services': services,
        'testimonials': testimonials,
    }
    return render(request, 'booking/index.html', context)

def book_service(request):
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save()
            
            # Send confirmation email
            send_mail(
                'Booking Confirmation',
                f'Thank you for booking with MotoPeladen! Your appointment for {booking.service.name} is confirmed for {booking.booking_date} at {booking.booking_time}.',
                settings.DEFAULT_FROM_EMAIL,
                [booking.customer_email],
                fail_silently=False,
            )
            
            messages.success(request, 'Your booking has been confirmed! Please check your email for details.')
            return redirect('booking_success')
    else:
        form = BookingForm()
    
    services = Service.objects.filter(is_active=True)
    context = {
        'form': form,
        'services': services,
    }
    return render(request, 'booking/book_service.html', context)

def booking_success(request):
    return render(request, 'booking/booking_success.html')

def testimonials(request):
    if request.method == 'POST':
        form = TestimonialForm(request.POST)
        if form.is_valid():
            testimonial = form.save()
            messages.success(request, 'Thank you for your feedback! Your testimonial will be reviewed.')
            return redirect('testimonials')
    else:
        form = TestimonialForm()
    
    testimonials = Testimonial.objects.filter(is_published=True).order_by('-created_at')
    context = {
        'form': form,
        'testimonials': testimonials,
    }
    return render(request, 'booking/testimonials.html', context)

def staff_dashboard(request):
    bookings = Booking.objects.all().order_by('-booking_date', '-booking_time')
    context = {
        'bookings': bookings,
    }
    return render(request, 'booking/staff_dashboard.html', context)

def update_booking_status(request, booking_id):
    if request.method == 'POST':
        booking = get_object_or_404(Booking, id=booking_id)
        new_status = request.POST.get('status')
        booking.status = new_status
        booking.save()
        
        # Send status update email
        send_mail(
            'Booking Status Update',
            f'Your booking status has been updated to: {new_status}',
            settings.DEFAULT_FROM_EMAIL,
            [booking.customer_email],
            fail_silently=False,
        )
        
        messages.success(request, 'Booking status updated successfully!')
    
    return redirect('staff_dashboard')

def get_available_slots(request):
    service_id = request.GET.get('service_id')
    date = request.GET.get('date')
    
    if not service_id or not date:
        return JsonResponse({'error': 'Missing parameters'}, status=400)
    
    try:
        service = Service.objects.get(id=service_id)
        booking_date = datetime.strptime(date, '%Y-%m-%d').date()
        
        # Get all bookings for the selected date
        existing_bookings = Booking.objects.filter(booking_date=booking_date)
        
        # Define available time slots (9 AM to 6 PM, every hour)
        start_time = datetime.combine(booking_date, datetime.min.time().replace(hour=9))
        end_time = datetime.combine(booking_date, datetime.min.time().replace(hour=18))
        
        available_slots = []
        current_time = start_time
        
        while current_time < end_time:
            slot_end = current_time + timedelta(hours=1)
            
            # Check if slot is available
            is_available = not existing_bookings.filter(
                booking_time__lt=slot_end.time(),
                booking_time__gte=current_time.time()
            ).exists()
            
            if is_available:
                available_slots.append(current_time.strftime('%H:%M'))
            
            current_time = slot_end
        
        return JsonResponse({'slots': available_slots})
    
    except Service.DoesNotExist:
        return JsonResponse({'error': 'Service not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)