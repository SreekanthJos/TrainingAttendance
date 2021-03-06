import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AttendanceService } from './services/attendance.service'
import {
  MatRadioModule, MatSelectModule, MatAccordion, MatExpansionModule,
  MatCheckboxModule, MatTableModule, MatDatepickerModule, MatAutocompleteModule,
  MatButtonModule, MatSlideToggleModule, MatInputModule, MatNativeDateModule,
  MatFormFieldModule, MatTabsModule, MatDialogModule
} from '@angular/material';
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterComponent } from './register/register.component'
import { LoginService } from './services/login.service';
import { CourseHomeworksComponent } from './course-homeworks/course-homeworks.component';
import { OnlyLoggedInUsersGuard } from './services/authguards/only-logged-in-users-guard.service';
import { ExportExcelService } from './services/exportExcelService';



const routes = [
  { path: 'login', component: LoginComponent,pathMatch:'full'  },
  //{path:'attendance',component:AttendanceComponent,pathMatch: 'full'},
  { path: 'takeAttendance', component: TakeAttendanceComponent,canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'courseRegister', component: CourseRegistrationComponent,canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'courseAttendance', component: CourseAttendanceComponent},
  { path: 'coursehomework', component: CourseHomeworksComponent , canActivate: [OnlyLoggedInUsersGuard] },
  { path: 'attendeesHomework', component: HomeworkComponent,canActivate: [OnlyLoggedInUsersGuard]  },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login',pathMatch:'full' }];

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
    RegisterComponent,
    CourseHomeworksComponent
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
    MatTabsModule, MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    //  OAuthModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes)

  ],
  providers: [AngularFirestore, AttendanceService, HomeworkService,
     HttpClient, LoginService, OnlyLoggedInUsersGuard,ExportExcelService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, CourseAttendanceComponent]
})
export class AppModule { }
