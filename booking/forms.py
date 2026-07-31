from django import forms
from .models import Booking, Testimonial

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = [
            'customer_name', 'customer_email', 'customer_phone',
            'motorcycle_model', 'motorcycle_plate', 'service',
            'booking_date', 'booking_time', 'notes'
        ]
        widgets = {
            'booking_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-input'
            }),
            'booking_time': forms.TimeInput(attrs={
                'type': 'time',
                'class': 'form-input'
            }),
            'notes': forms.Textarea(attrs={
                'rows': 3,
                'placeholder': 'Any special instructions or notes...'
            })
        }

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['customer_name', 'rating', 'comment']
        widgets = {
            'rating': forms.Select(choices=[(i, f'{i} stars') for i in range(1, 6)]),
            'comment': forms.Textarea(attrs={
                'rows': 4,
                'placeholder': 'Share your experience with our service...'
            })
        }