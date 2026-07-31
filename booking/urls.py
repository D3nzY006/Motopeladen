from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='booking_index'),
    path('book/', views.book_service, name='book_service'),
    path('book/success/', views.booking_success, name='booking_success'),
    path('testimonials/', views.testimonials, name='testimonials'),
    path('staff/', views.staff_dashboard, name='staff_dashboard'),
    path('staff/update-status/<int:booking_id>/', views.update_booking_status, name='update_booking_status'),
    path('api/available-slots/', views.get_available_slots, name='get_available_slots'),
]