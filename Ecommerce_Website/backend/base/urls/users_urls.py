from django.urls import path
from base.views import user_views as view


urlpatterns =[
    path('login/', view.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',view.GetUserProfile.as_view(),name="users-profile"),
    path('profile/update/',view.UpdateUserProfile.as_view(),name="users-profile-update"),
    path('',view.GetUsers.as_view(),name="users"),
    path('register/',view.RegisterUser.as_view(),name="users"),

]