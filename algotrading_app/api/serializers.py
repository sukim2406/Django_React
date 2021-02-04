from rest_framework import serializers
from .models import Order, Account
from django import forms
from django.contrib.auth.forms import UserCreationForm

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'order_id', 'ticker', 'owner', 'quantity', 'created_at', 'order_type', 'limit_price', 'stop_price', 'trail_price', 'trail_percent', 'time_in_force')


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('ticker', 'quantity', 'order_type', 'limit_price', 'stop_price', 'trail_price', 'trail_percent', 'time_in_force')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'username', 'date_joined', 'last_login')


class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'username', 'password', 'api_key', 'secret_key')