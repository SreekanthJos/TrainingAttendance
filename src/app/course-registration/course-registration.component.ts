import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee, Attendees } from '../models/attendance.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import { MatDatepickerInputEvent } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { AttendanceService } from '../services/attendance.service'

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent implements OnInit {
  public emp: Employee = new Employee();  
  firebaseDB: AngularFirestore;
  courses: string[] = new Array<string>();
  constructor(private af: AngularFirestore, public dialog: MatDialog, public service: AttendanceService) {
    
        this.firebaseDB = af;
      }

  ngOnInit() {
    this.GetCourses();
  }
  GetCourses() {
    this.service.GetCourses().subscribe(data => {
        if (data.length > 0)
          this.courses = data[0].CourseName;
          console.log(this.courses);
      });
  }

  CourseRegistration(): void {
    
        this.service.IsEmployeeRegistered(this.emp).subscribe(res => {
          if (res.length == 0) {
            this.service.CourseRegistration(this.emp).subscribe();
          }
        });
      }
}
