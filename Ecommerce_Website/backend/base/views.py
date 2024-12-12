from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .products import products
from .models import Product
from .serializer import ProductSerializer
# Create your views here.

class GetRoutes(APIView):
    def get(self,request):
        routes = [
            '/api/products/',
            '/api/products/create/',
            '/api/products/upload/',
            '/api/products/<id>/reviews/',
            '/api/products/top/',
            '/api/products/<id>/',
            '/api/products/delete/<id>/',
            '/api/products/update/<id>/',
            ]
        return Response(routes)
    
class GetProducts(APIView):
    def get(self,request):

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True) #-- many parameter defines how many items we are serializing

        
        return Response(serializer.data)
    
class GetProduct(APIView):
    def get(self,request,pk):
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product,many=False)
        
        return Response(serializer.data)