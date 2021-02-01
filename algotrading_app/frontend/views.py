from django.shortcuts import render

# Create your views here.

def index(request, *ars, **kwargs):
    return render(request, 'frontend/index.html')