from rest_framework import viewsets
from usermanagement.models import Person, Employee
from .serializers import PersonSerializer, EmployeeSerializer


class PersonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows persons to be viewed or edited
    """
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows employees to be viewed or edited
    """
    queryset = Employee.objects.all().order_by('id')
    serializer_class = EmployeeSerializer
