from django.db import models
import string
import random

# Create your models here.

def generate_unique_id():
    length = 6

    while True:
        order_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Order.objects.filter(order_id = order_id).count() == 0:
            break
    
    return order_id


class Order(models.Model):
    order_id = models.CharField(max_length=8, default=generate_unique_id, unique=True)
    ticker = models.CharField(max_length=5, default="", unique=False)
    owner = models.CharField(max_length=50, unique=False)
    quantity = models.IntegerField(null=False, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
