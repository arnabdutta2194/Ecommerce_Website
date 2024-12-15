from rest_framework.views import APIView
from rest_framework.response import Response
from base.serializer import UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
import traceback

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data= super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for key,value in serializer.items():
            data[key] = value


        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GetUsers(APIView):
    permission_classes=[IsAdminUser]
    def get(self,request,pk):
        users = User.objects.get(_id=pk)
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)
    

class GetUserProfile(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user = request.user
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)
    
class UpdateUserProfile(APIView):
    permission_classes=[IsAuthenticated]
    def put(self,request):
        user = request.user
        data = request.data
        
        user.first_name = data['name']
        user.email = data['email']
        user.username = data['email']

        if data['password'] != '':
            user.password = make_password(data['password'])
        user.save()

        serializer = UserSerializerWithToken(user,many=False)

        return Response(serializer.data)

class RegisterUser(APIView):
    def post(self,request):
        try:
            data =request.data
            user = User.objects.create(
                first_name = data['name'],
                username = data['email'],
                email = data['email'],
                password = make_password(data['password'])
            )
            serializer = UserSerializerWithToken(user,many=False)
            print(serializer.data)
        except:
            traceback.print_exc()
            message = {'detail':'User with this email already exists'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data,status.HTTP_201_CREATED)