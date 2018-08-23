import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee, Attendees } from '../models/attendance.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import { MatDatepickerInputEvent } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { AttendanceService } from '../services/attendance.service'
import { CourseAttendanceComponent } from '../course-attendance/course-attendance.component'
@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.css']
})
export class TakeAttendanceComponent implements OnInit {
  public emp: Employee = new Employee();
  employees: Employee[]; 
  firebaseDB: AngularFirestore;
 
  constructor(
    private af: AngularFirestore,
    public dialog: MatDialog, 
    public service: AttendanceService
    ) {

    this.firebaseDB = af;
  }

  ngOnInit() {
    this.GetAttendeesListForTraining();
  }
  GetAttendeesListForTraining() {
    this.service.GetAttendeesListForTraining().subscribe(data => {
      this.employees = data;
      this.employees.forEach(element => {
        element.IsPresent = false;
      });
    });
  }
  SaveAttendance(): void {
    let sDate = new Date().toLocaleDateString();

    this.employees.forEach(emp => {

      this.service.IsDuplicate(emp).subscribe(res => {
        if (res.length == 0) {
          this.service.SaveAttendance(emp);
        }
      });
    });
    let dialog = this.dialog.open(DialogComponent, { data: "Data Saved Successfully.." });
    this.GetAttendeesListForTraining();
    //this.service.GetCourseAttendance();
  }
}
