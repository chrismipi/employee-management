import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditViewComponent } from './add-edit.component';
import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, DateAdapter, MAT_DATE_FORMATS, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapters/date-picker-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AddEditComponent', () => {
    let component: AddEditViewComponent;
    let fixture: ComponentFixture<AddEditViewComponent>;

    const mockDialogRef = {
        close: jasmine.createSpy('close')
    };

    const mockMatDialogRef = {
        close: () => { }
    }

    const data = {
        title: "Title",
        view: true,
        body: {
            first_name: "Firstname",
            last_name: "Lastname",
            birth_date: "1901-12-12",
            employee_id: 2,
            employee_number: "EMPL123",
            employed_date: "1905-12-12",
            terminated_date: "1915-12-12",
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddEditViewComponent],
            imports: [
                MatFormFieldModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: MatDialogRef, useValue: mockMatDialogRef },
                { provide: DateAdapter, useClass: AppDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('title to be Delete', () => {
        expect(component.data.title).toBe("Title");
    });

    it('should have title on tag h1', () => {
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toBe("Title");
    });
});
