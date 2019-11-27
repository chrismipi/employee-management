import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatTableModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { AddEditViewComponent } from './components/add-edit/add-edit.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEditViewComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
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
  entryComponents: [ConfirmComponent, AddEditViewComponent],
  providers: [
    BackendService,
  ],
  bootstrap: [AppComponent],
  exports: [
    MatTableModule
  ]
})
export class AppModule { }
