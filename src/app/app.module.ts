import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import  {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import {AngularFireModule  } from 'angularfire2'
import { AngularFireDatabaseModule  } from 'angularfire2/database';
import {environment  } from '../environments/environment';
import {AngularFirestoreModule,AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AttendanceService } from './services/attendance.service'


import {MatCheckboxModule, MatTableModule ,MatDatepickerModule,MatAutocompleteModule,MatButtonModule,MatSlideToggleModule,MatInputModule,MatNativeDateModule,MatFormFieldModule,MatTabsModule,MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { CourseAttendanceComponent } from './course-attendance/course-attendance.component';
@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    DialogComponent,
    CourseRegistrationComponent,
    TakeAttendanceComponent,
    CourseAttendanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'trainingattendance-2f535'),
    AngularFireDatabaseModule,  
    AngularFirestoreModule  ,   

    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTabsModule,MatDialogModule,
    MatTableModule ,
    MatCheckboxModule
   

  ],
  providers: [AngularFirestore,AttendanceService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent,CourseAttendanceComponent]
})
export class AppModule { }
