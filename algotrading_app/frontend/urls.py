from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('createorder/', index),
    path('order/<str:order_id>/', index),
    path('register/', index),
]