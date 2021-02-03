from django.shortcuts import render
from rest_framework import generics, status
from .serializers import OrderSerializer, CreateOrderSerializer
from .models import Order
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

class OrderView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CreateOrderView(APIView):
    serializer_class = CreateOrderSerializer

    def post(self, request, format =None):

        # Login info should go here
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            order_type = serializer.data.get('order_type')
            ticker = serializer.data.get('ticker')
            quantity = serializer.data.get('quantity')
            owner = 'sukim24061'
            limit_price = serializer.data.get('limit_price')
            stop_price = serializer.data.get('stop_price')
            trail_price = serializer.data.get('trail_price')
            trail_percent = serializer.data.get('trail_percent')
            time_in_force = serializer.data.get('time_in_force')
            
            order = Order(owner=owner, ticker=ticker, quantity=quantity, order_type=order_type, limit_price=limit_price, stop_price=stop_price, trail_price=trail_price, trail_percent= trail_percent, time_in_force=time_in_force)
            order.save()

            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)