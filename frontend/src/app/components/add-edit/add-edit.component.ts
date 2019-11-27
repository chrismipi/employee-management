import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEditView } from 'src/app/models/user.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS, formatDate } from 'src/app/adapters/date-picker-adapter';

@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AddEditViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditView)
  {}

  form: FormGroup;

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  onSubmit(data: any) {
    if (this.form.valid) {
      data.body.first_name = this.form.value['first_name'];
      data.body.last_name = this.form.value['last_name'];
      if (typeof this.form.value['birth_date'] === 'string') {
        data.body.birth_date = this.form.value['birth_date'];
      } else {
        data.body.birth_date = formatDate(this.form.value['birth_date']);
      }
      
      this.dialogRef.close(true);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      first_name: new FormControl(this.data.body.first_name, [Validators.required, Validators.maxLength(60)]),
      last_name: new FormControl(this.data.body.last_name, [Validators.required, Validators.maxLength(60)]),
      birth_date: new FormControl('', [Validators.required]),
      employee_number: new FormControl(),
      employed_date: new FormControl(),
      terminated_date: new FormControl()
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
