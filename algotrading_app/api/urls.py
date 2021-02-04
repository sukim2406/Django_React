from django.urls import path
from .views import OrderView, CreateOrderView, GetOrder, AccountView, CreateAccountView

urlpatterns = [
    path('orders', OrderView.as_view()),
    path('create-order', CreateOrderView.as_view()),
    path('get-order', GetOrder.as_view()),
    path('accounts', AccountView.as_view()),
    path('create-account', CreateAccountView.as_view()),
]
