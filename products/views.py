from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import render


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


def index(request):
    return render(request, "index.html")
