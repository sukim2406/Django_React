from django.urls import path
from .views import OrderView, CreateOrderView, GetOrder, AccountView, CreateAccountView, LogIn, LogOut, GetAccountView, AccountInfoView
urlpatterns = [
    path('orders/', OrderView.as_view()),
    path('create-order/', CreateOrderView.as_view()),
    path('get-order/', GetOrder.as_view()),
    path('accounts/', AccountView.as_view()),
    path('create-account/', CreateAccountView.as_view()),
    path('login/', LogIn.as_view()),
    path('logout/', LogOut.as_view()),
    path('get-account/', GetAccountView.as_view()),
    path('account-info/', AccountInfoView.as_view()),
]
