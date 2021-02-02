from django.urls import path
from .views import OrderView, CreateOrderView

urlpatterns = [
    path('', OrderView.as_view()),
    path('create-order', CreateOrderView.as_view())
]
