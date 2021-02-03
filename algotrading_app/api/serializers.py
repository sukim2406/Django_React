from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'order_id', 'ticker', 'owner', 'quantity', 'created_at', 'order_type', 'limit_price', 'stop_price', 'trail_price', 'trail_percent', 'time_in_force')


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('ticker', 'quantity', 'order_type', 'limit_price', 'stop_price', 'trail_price', 'trail_percent', 'time_in_force')