import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee, Attendees } from '../models/attendance.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import { MatDatepickerInputEvent } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { AttendanceService } from '../services/attendance.service'
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent  {

  // public emp: Employee = new Employee();
  // employees: Employee[];
  // attendees: Attendees[];
  // firebaseDB: AngularFirestore;
  // isPresent: boolean;
  // courses: string[] = new Array<string>();
  // filterDate: string;

//   constructor(private af: AngularFirestore, public dialog: MatDialog, public service: LoginService) {
// this.flag=this.service.isAuthenticated;
//      //this.firebaseDB = af;
//  }

  // ngOnInit() {
  //   this.GetCourses();
  //   this.GetAttendeesListForTraining();
  //   this.GetCourseAttendance();
  // }

  // FilterByDate(fdate: string) {
  //   if (fdate != "")
  //     this.service.FilterByDate(fdate).subscribe(data => {
  //         this.attendees = data;
  //       });
  //   else
  //     this.GetCourseAttendance();
  // }


  // FilterByEmail(email: string) {
  //   console.log(email);
  //   if (email != "")
  //   this.service.FilterByEmail(email).subscribe(data => {
  //         this.attendees = data;
  //       });
  //   else
  //     this.GetCourseAttendance();
  // }

  // GetCourses() {
  //   this.service.GetCourses().subscribe(data => {
  //       if (data.length > 0)
  //         this.courses = data[0].CourseName;
  //     });
  // }

  // GetCourseAttendance() {
  //   this.service.GetCourseAttendance().subscribe(data => {
  //     this.attendees = data.sort((a, b) => a.SessionDate > b.SessionDate ? 1 : -1)
  //   });
  // }

  // GetAttendeesListForTraining() {
  //   this.service.GetAttendeesListForTraining().subscribe(data => {
  //     this.employees = data;
  //     this.employees.forEach(element => {
  //       element.IsPresent = false;
  //     });
  //   });
  // }

  // SaveAttendance(): void {
  //   let sDate = new Date().toLocaleDateString();

  //   this.employees.forEach(emp => {

  //     this.service.IsDuplicate(emp).subscribe(res => {
  //       if (res.length == 0) {
  //         this.service.SaveAttendance(emp);
  //       }
  //     });
  //   });
  //   let dialog = this.dialog.open(DialogComponent, { data: "Data Saved Successfully.." });
  //   this.GetAttendeesListForTraining();
  //   this.GetCourseAttendance();
  // }
  // CourseRegistration(): void {

  //   this.service.IsEmployeeRegistered(this.emp).subscribe(res => {
  //     if (res.length == 0) {
  //       this.service.CourseRegistration(this.emp).subscribe();
  //     }
  //   });
  // }
}