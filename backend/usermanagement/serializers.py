from django.contrib.auth.models import User, Group
from rest_framework import serializers
from usermanagement.models import Person, Employee


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'first_name', 'last_name', 'birth_date']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'person', 'employee_number', 'employed_date', 'terminated_date']
