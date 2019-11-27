from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'employees', views.EmployeeViewSet)
router.register(r'people', views.PersonViewSet)

urlpatterns = [
    path('', include(router.urls))
]
