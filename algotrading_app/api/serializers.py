from rest_framework import serializers
from .models import Order, Account
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

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
        fields = ('email', 'username', 'date_joined', 'last_login', 'date_joined')


class CreateAccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, write_only=True, required=True)

    class Meta:
        model = Account
        fields = ('email', 'username', 'password', 'api_key', 'secret_key')

    def create(self, validated_data):
        return Account.objects.create_user(**validated_data)


class LogInSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})
    
    class Meta:
        model = Account
        fields = ('email', 'password')


class AccountUpdateSerializer(serializers.Serializer):

    """
    Serializer for password change endpoint.
    """
    email = serializers.EmailField(required=False, allow_blank=True)
    cur_password = serializers.CharField(allow_blank=True, style={'input_type': 'password'})
    new_password = serializers.CharField(allow_blank=True, style={'input_type': 'password'})
    api_key = serializers.CharField(required=False, allow_blank=True)
    secret_key = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Account
        fields = ('pasword', 'api_key', 'secret_key')