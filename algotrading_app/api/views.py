from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from rest_framework import generics, status, permissions, authentication
from .serializers import OrderSerializer, CreateOrderSerializer, AccountSerializer, CreateAccountSerializer, LogInSerializer
from .models import Order, Account
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class OrderView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class GetOrder(APIView):
    serializer_class = OrderSerializer
    lookup_url_kwarg = 'order_id'

    def get(self, request, format=None):
        order_id = request.GET.get(self.lookup_url_kwarg)
        if order_id != None:
            order = Order.objects.filter(order_id=order_id)
            if len(order) > 0:
                data = OrderSerializer(order[0]).data
                data['manual_order'] = 'sukim2406' == order[0].owner
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Order Not Found': 'Invalid order_id'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'order_id paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class CreateOrderView(APIView):
    serializer_class = CreateOrderSerializer

    def post(self, request, format=None):

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
        return Response({'Bad Request': 'Something went Wrong'}, status=status.HTTP_400_BAD_REQUEST)


class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class CreateAccountView(APIView):
    serializer_class = CreateAccountSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
class LogIn(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication, BasicAuthentication,)
    serializer_class = LogInSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            account = authenticate(email=email, password=password)

            if account is not None:
                login(request, account)
                return Response({'status': 'Successful', 'message': 'Success'}, status=status.HTTP_200_OK)
            
            return Response({'status': 'Unauthorized', 'message': 'Invalid info'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LogOut(APIView):

    def get(self, request, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class GetAccountView(APIView):
    serializer_class = AccountSerializer

    def get(self, request, format=None):
        account = request.user

        if account.is_anonymous:
            return Response({'email': '', 'message': 'Not logged in'})

        return Response({'email': account.email, 'username': account.username}, status=status.HTTP_200_OK)
