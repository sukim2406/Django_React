from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='home'),
    path('login/', index, name='login'),
    path('createorder/', index),
    path('order/<str:order_id>/', index),
    path('register/', index, name='register'),
    path('account-info/', index, name='account-info'),
]