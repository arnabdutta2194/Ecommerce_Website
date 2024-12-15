from django.urls import path
from base.views import product_views as views


urlpatterns =[
    path('',views.GetProducts.as_view(),name="products"),
    path('<str:pk>/',views.GetProduct.as_view(),name="product"),
]