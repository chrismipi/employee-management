import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BackendService } from 'src/app/services/backend.service';
import { MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material';
import { of } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AddEditViewComponent } from 'src/app/components/add-edit/add-edit.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-confirm',
  template: '<h1>Mock Confirm Component</h1>'
})
export class MockConfirmComponent {}


@Component({
  selector: 'app-add-edit-view',
  template: '<h1>Mock Add Edit View Component</h1>'
})
export class MockAddEditViewComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let MockDialog = {
    open: () => jasmine.createSpy(),
  };

  let MockMatDialogRef = {
    afterClosed: () => jasmine.createSpy('close'),
  }

  let backendStub = {
    getUsers: () => of([{
      person: 1,
      first_name: "First Name",
      last_name: "Last Name",
      birth_date: "2011-02-21",
      employee_id: 2,
      employee_number: "EMPL001",
      employed_date: "2011-02-21",
    }]).toPromise(),
    deleteEmployment: () => of(),
    updatePerson: () => of(),
    updateEmployee: () => of(),
    saveUser: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        MockAddEditViewComponent,
        MockConfirmComponent
      ],
      imports: [
        MatTableModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialog, useValue: MockDialog},
        {provide: MatDialogRef, useValue: MockMatDialogRef},
        {provide: BackendService, useValue: backendStub}
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MockAddEditViewComponent, MockConfirmComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
