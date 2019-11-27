import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEditViewComponent } from 'src/app/components/add-edit/add-edit.component';
import { User, AddEditView, Employment } from 'src/app/models/user.models';
import { BackendService } from 'src/app/services/backend.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { formatDate } from 'src/app/adapters/date-picker-adapter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['employee_number', 'first_name', 'last_name', 'start_date', 'termination_date', 'actions'];
  dataSource: User[] = [];

  constructor(public dialog: MatDialog, private service: BackendService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.service.getUsers().then((data: User[]) => {
      this.dataSource = data;
    });
  }

  add(): void {
    const newUser = Employment.createEmployment();
    let payload: AddEditView = {
      view: false,
      title: "Add Employee",
      body: newUser.user
    }

    const dialogRef = this.dialog.open(AddEditViewComponent, {
      width: '35em',
      data: payload
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.saveUser(newUser).then(() => {
        }).catch((err) => {
          console.error("Error ", err);
        }).then(() => {
          this.loadData();
        })
      }
    });
  }

  view(element: User): void {
    let payload: AddEditView = {
      view: true,
      title: element.first_name,
      body: element
    }
    this.dialog.open(AddEditViewComponent, {
      width: '35em',
      data: payload
    });
  }

  delete(element: User): void {
    const payload = {
      title: `Delete ${element.first_name}`
    }
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '35em',
      data: payload
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const updatedUser = Employment.updateEmployment(element);
        this.service.deleteEmployment(updatedUser.person).catch((err) => {
          console.error("Error ", err);
        }).then(() => {
          this.loadData();
        });
      }
    });
  }

  terminate(element: User): void {
    const payload = {
      title: `Terminate ${element.first_name}`
    }
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '35em',
      data: payload
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let now = new Date();
        element.terminated_date = formatDate(now);
        const updatedUser = Employment.updateEmployment(element);
        this.service.updateEmployee(updatedUser.employee).catch((err) => {
          console.error("Error ", err);
        });
      }
    });
  }

  edit(element: User): void {
    let payload: AddEditView = {
      view: false,
      title: `Edit ${element.first_name}`,
      body: element
    }
    const dialogRef = this.dialog.open(AddEditViewComponent, {
      width: '35em',
      data: payload
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const updatedUser = Employment.updateEmployment(element);

        this.service.updatePerson(updatedUser.person).catch((err) => {
          console.error("Error ", err);
        });
      }
    });
  }
}
