import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BackendService } from './backend.service';
import { Person, Employee } from '../models/user.models';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BackendService
      ]
    }).compileComponents();
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));

  it('should delete person correctly', fakeAsync(inject(
    [BackendService, HttpTestingController],
    (service: BackendService, backend: HttpTestingController) => {

      // Set up
      const responseObject = {
        id: 1
      };

      const person: Person = {
        id: 1,
        first_name: "first name",
        last_name: "last name",
        birth_date: "1907-12-12"
      };
      var response = {
        id:0
      };
      // End Setup

      service.deleteEmployment(person).then(
        (receivedResponse: any) => {
          response = receivedResponse;
        },
        (error: any) => { }
      );

      const requestWrapper = backend.expectOne({ url: 'http://localhost:8000/api/people/1/' });
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('DELETE');
      expect(responseObject.id).toBe(response['id']);
    }
  )
  )
  );

  it('should update person correctly', fakeAsync(inject(
    [BackendService, HttpTestingController],
    (service: BackendService, backend: HttpTestingController) => {

      // Set up
      const responseObject = {
        id: 1,
        first_name: "first name",
        last_name: "last name",
        birth_date: "1907-12-12"
      };

      const person: Person = {
        id: 1,
        first_name: "first name",
        last_name: "last name",
        birth_date: "1907-12-12"
      };
      var response: Person;
      // End Setup

      service.updatePerson(person).then(
        (receivedResponse: any) => {
          response = receivedResponse;
        },
        (error: any) => { }
      );

      const requestWrapper = backend.expectOne({ url: 'http://localhost:8000/api/people/1/' });
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('PUT');
      expect(responseObject.id).toEqual(response.id);
      expect(responseObject.first_name).toEqual(response.first_name);
      expect(responseObject.last_name).toEqual(response.last_name);
      expect(responseObject.birth_date).toEqual(response.birth_date);
    }
  )
  )
  );

  it('should update employee correctly', fakeAsync(inject(
    [BackendService, HttpTestingController],
    (service: BackendService, backend: HttpTestingController) => {

      // Set up
      const responseObject = {
        id: 1,
        person: 2,
        employee_number: "EMPL",
        employed_date: "1907-12-12"
      };

      const employee: Employee = {
        id: 1,
        person: 2,
        employee_number: "EMPL",
        employed_date: "1907-12-12"
      };
      let response: Employee;
      // End Setup

      service.updateEmployee(employee).then(
        (receivedResponse: any) => {
          response = receivedResponse;
        },
        (error: any) => { }
      );

      const requestWrapper = backend.expectOne({ url: 'http://localhost:8000/api/employees/1/' });
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('PUT');
      expect(responseObject.employed_date).toEqual(response.employed_date);
      expect(responseObject.employee_number).toEqual(response.employee_number);
      expect(responseObject.id).toEqual(response.id);
      expect(responseObject.person).toEqual(response.person);
    }
  )
  )
  );

  // it('should save user = person + employee correctly', fakeAsync(inject(
  //   [BackendService, HttpTestingController],
  //   (service: BackendService, backend: HttpTestingController) => {

  //     // Set up
  //     const responseObject = {
  //       id: 1,
  //       person: 2,
  //       employee_number: "EMPL",
  //       employed_date: "1907-12-12"
  //     };

  //     const user: User = {
  //       first_name: "first name",
  //       last_name: "last name",
  //       birth_date: "1907-12-12",
  //       employee_number: "EMPL",
  //       employed_date: "1907-12-12"
  //     }
  //     var response = {};
  //     // End Setup
  //     let employment = Employment.createEmployment();
  //     employment.user = user;

  //     service.saveUser(employment).then(
  //       (receivedResponse: any) => {
  //         response = receivedResponse;
  //       },
  //       (error: any) => { }
  //     );

  //     const requestWrapper = backend.expectOne({ url: 'http://localhost:8000/api/employees' });
  //     requestWrapper.flush(responseObject);

  //     tick();

  //     expect(requestWrapper.request.method).toEqual('PUT');
  //     expect(responseObject).toBe(response);
  //   }
  // )
  // )
  // );
});


