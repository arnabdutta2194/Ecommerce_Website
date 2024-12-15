from rest_framework.views import APIView
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSerializer
from rest_framework import status


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