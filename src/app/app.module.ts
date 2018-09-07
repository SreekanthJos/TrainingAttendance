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
import {MatRadioModule, MatSelectModule, MatAccordion,MatExpansionModule,
   MatCheckboxModule, MatTableModule ,MatDatepickerModule,MatAutocompleteModule,
   MatButtonModule,MatSlideToggleModule,MatInputModule,MatNativeDateModule,
   MatFormFieldModule,MatTabsModule,MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { CourseAttendanceComponent } from './course-attendance/course-attendance.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HomeworkComponent } from './homework/homework.component';
import { HomeworkService } from './services/homework.service';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

//import {OAuthModule,OAuthService} from 'angular-oauth2-oidc'
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { RegisterComponent } from './register/register.component'
import { LoginService } from './services/login.service';


const routes=[
  {path:'login',component:LoginComponent,pathMatch: 'full'},
  {path:'attendance',component:AttendanceComponent,pathMatch: 'full'},
  {path:'takeAttendance',component:TakeAttendanceComponent},
  {path:'courseRegister',component:CourseRegistrationComponent},
  {path:'courseAttendance',component:CourseAttendanceComponent},
  {path:'homework',component:HomeworkComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',redirectTo:'/login'}];

@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    DialogComponent,
    CourseRegistrationComponent,
    TakeAttendanceComponent,
    CourseAttendanceComponent,
    FilterPipe,
    HomeworkComponent,
    LoginComponent,
    RegisterComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'trainingattendance-2f535'),
    AngularFireDatabaseModule,  
    AngularFirestoreModule,   
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTabsModule,MatDialogModule,
    MatTableModule ,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
  //  OAuthModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes)

  ],
  providers: [AngularFirestore,AttendanceService,HomeworkService,HttpClient,LoginService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent,CourseAttendanceComponent]
})
export class AppModule { }
