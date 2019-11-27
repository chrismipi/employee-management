from django.db import models


class BaseModel(models.Model):
    objects = models.Manager()

    class Meta:
        abstract = True


class Person(BaseModel):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    birth_date = models.DateField(null=False)

    def __str__(self):
        return "Person : {} {}".format(self.first_name, self.last_name)


class Employee(BaseModel):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    employee_number = models.CharField(max_length=16, null=False)
    employed_date = models.DateField(null=False)
    terminated_date = models.DateField(null=True)

    def __str__(self):
        return "Employee Number {}".format(self.employee_number)
