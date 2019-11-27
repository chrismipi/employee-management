import * as uuid from 'uuid/v1';

export interface AddEditView {
    title: string;
    body: User;
    view: boolean;
}

export interface User {
    person_id?: number;
    first_name: string;
    last_name: string;
    birth_date: string;
    employee_id?: number;
    employee_number?: string;
    employed_date?: string;
    terminated_date?: string;
}

export interface Employee {
    id?: number;
    person: number;
    employee_number: string;
    employed_date: string;
    terminated_date?: string;
}

export class Employment {
    constructor(first_name: string, last_name: string, birth_date: string,
                employee_number: string, employed_date: string, person_id?: number, employee_id?: number, terminated_date?: string) {
        this.obj = {
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            employee_number: employee_number,
            employed_date: employed_date,
        }
        if(employee_id) {
            this.obj.employee_id = employee_id;
        }

        if(terminated_date) {
            this.obj.terminated_date = terminated_date;
        }

        if(person_id) {
            this.obj.person_id = person_id;
        }
    }

    private obj: User;

    set user(user: User) {
        this.obj = user;
    }

    get user(): User {
        return this.obj;
    }

    get employee(): Employee {
        let employee: Employee = {
            person: this.obj.person_id,
            employed_date: this.obj.employed_date,
            employee_number: this.obj.employee_number,
            id: this.obj.employee_id,
        }

        if(this.obj.terminated_date) {
            employee.terminated_date = this.obj.terminated_date;
        }
        return employee;
    }

    get person(): Person {
        let person: Person = {
            first_name: this.obj.first_name,
            last_name: this.obj.last_name,
            birth_date: this.obj.birth_date.toString()
        }
        if (this.obj.person_id) {
            person.id = this.obj.person_id;
        }
        return person;
    }

    static createEmployment(): Employment {
        const employee = new Employment("", "", "", employeeNumber(), "");
        return employee;
    }

    static updateEmployment(obj: User): Employment {
        const employee = new Employment(obj.first_name, obj.last_name, obj.birth_date, obj.employee_number, obj.employed_date, obj.person_id, obj.employee_id, obj.terminated_date);
        return employee;
    }
}

function employeeNumber(): string {
    return uuid().substr(0, 10).toUpperCase();
}

export interface Person {
    id?: number;
    first_name: string;
    last_name: string;
    birth_date: string;
}