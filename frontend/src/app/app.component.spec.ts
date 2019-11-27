import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatToolbarModule, MatNativeDateModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    template: '<h1>Mock Home Component</h1>',
})
export class MockHomeComponent {}

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent,
        MockHomeComponent,
        MockAddEditViewComponent,
        MockConfirmComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Employee Management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Employee Management');
  });
});
