import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, Person, Employee, Employment } from '../models/user.models';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { formatDate } from '../adapters/date-picker-adapter';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.backend.url;
  }

  async getUsers(): Promise<User[]> {
    let [people, employees] = await Promise.all([
      this.getPeople(),
      this.getEmployees()
    ]);

    let users: User[] = [];

    employees.forEach((empl: Employee) => {
      let person: Person = people.filter((item: Person) => { return empl.person === item.id })[0];

      let user: User = {
        employee_number: empl.employee_number,
        employed_date: empl.employed_date,
        employee_id: empl.id,
        first_name: person.first_name,
        last_name: person.last_name,
        birth_date: person.birth_date,
        person_id: person.id
      }

      if(empl.terminated_date) {
        user.terminated_date = empl.terminated_date;
      }

      users.push(user);
    });

    return users;
  }

  private getPeople(): Promise<Person[]> {
    const url = this.baseUrl + environment.backend.endpoints.people;
    return this.http.get<Person[]>(url, this.httpOptions).pipe(
      retry(3),
      map(res => res['results'])
    ).toPromise();
  }

  private getEmployees(): Promise<Employee[]> {
    const url = this.baseUrl + environment.backend.endpoints.employees;
    return this.http.get<Employee[]>(url, this.httpOptions).pipe(
      retry(3),
      map(res => res['results'])
    ).toPromise();
  }
  
  deleteEmployment(payload: Person): Promise<any> {
    let personUrl = this.baseUrl + environment.backend.endpoints.people + `${payload.id}/`;
    return this.http.delete(personUrl, this.httpOptions).pipe(
      retry(3),
    ).toPromise();
  }

  updatePerson(payload: Person): Promise<any> {
    const url = this.baseUrl + environment.backend.endpoints.people + `${payload.id}/`;
    return this.http.put(url, JSON.stringify(payload), this.httpOptions).pipe(
      retry(3),
    ).toPromise();
  }

  updateEmployee(payload: Employee): Promise<any> {
    const url = this.baseUrl + environment.backend.endpoints.employees  + `${payload.id}/`;
    return this.http.put(url, JSON.stringify(payload), this.httpOptions).pipe(
      retry(3),
    ).toPromise();
  }

  saveUser(payload: Employment): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let person: any = await this.createPerson(payload.person);
        let payloadEm: Employee = payload.employee;
        payloadEm.person = person.id;
        await this.createEmployee(payloadEm);
        
        resolve(true);
      } catch(er) {
        reject(er);
      }
    });
  }

  private createPerson(payload: Person): Promise<any> {
    const url = this.baseUrl + environment.backend.endpoints.people;
    return this.http.post(url, JSON.stringify(payload), this.httpOptions).pipe(
      retry(3),
    ).toPromise();
  }

  private createEmployee(payload: Employee): Promise<any> {
    const now = new Date();
    payload.employed_date = formatDate(now);

    const url = this.baseUrl + environment.backend.endpoints.employees;
    return this.http.post(url, JSON.stringify(payload), this.httpOptions).pipe(
      retry(3),
    ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
