from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'order_id', 'ticker', 'owner', 'quantity', 'created_at')


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('ticker', 'quantity')