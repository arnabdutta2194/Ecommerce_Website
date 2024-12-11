from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .products import products
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
        
        return Response(products)
    
class GetProduct(APIView):
    def get(self,request,pk):
        product = None
        for i in products:
            if i['_id'] == pk:
                product = i
                break
        return Response(product)