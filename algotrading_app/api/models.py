from django.db import models
import string
import random
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

def generate_unique_id():
    length = 6

    while True:
        order_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Order.objects.filter(order_id = order_id).count() == 0:
            break
    
    return order_id


class Order(models.Model):
    order_id        = models.CharField(max_length=8, default=generate_unique_id, unique=True)
    ticker          = models.CharField(max_length=5, default="", unique=False)
    owner           = models.CharField(max_length=50, unique=False)
    quantity        = models.IntegerField(null=False, default=0)
    created_at      = models.DateTimeField(auto_now_add=True)
    order_type      = models.CharField(max_length=15, default="", unique=False)
    limit_price     = models.DecimalField(max_digits=8, decimal_places=2)
    stop_price      = models.DecimalField(max_digits=8, decimal_places=2)
    trail_price     = models.DecimalField(max_digits=8, decimal_places=2)
    trail_percent   = models.DecimalField(max_digits=8, decimal_places=2)
    time_in_force   = models.CharField(max_length=5, default="day", unique=False)


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, api_key, secret_key, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
        if not api_key:
            raise ValueError("Users must have an api key")
        if not secret_key:
            raise ValueError("Users must have a secret key")

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            api_key = api_key,
            secret_key = secret_key,
        )

        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, username, api_key, secret_key, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            username = username,
            api_key = api_key,
            secret_key = secret_key,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user


class Account(AbstractBaseUser):
    email           = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username        = models.CharField(max_length=30, unique=True)
    date_joined     = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)
    api_key         = models.CharField(max_length=60, unique=True)
    secret_key      = models.CharField(max_length=60, unique=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username', 'api_key', 'secret_key']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self,app_label):
        return True
    

