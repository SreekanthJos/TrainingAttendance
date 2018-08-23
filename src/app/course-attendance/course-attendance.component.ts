import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Attendees } from '../models/attendance.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import { MatDatepickerInputEvent } from '@angular/material';
import { AttendanceService } from '../services/attendance.service'

@Component({
  selector: 'app-course-attendance',
  templateUrl: './course-attendance.component.html',
  styleUrls: ['./course-attendance.component.css']
})
export class CourseAttendanceComponent implements OnInit {

  attendees: Attendees[];
  firebaseDB: AngularFirestore;
  filterDate: string;
  email:string;
  constructor(private af: AngularFirestore, public service: AttendanceService) {

    this.firebaseDB = af;
  }

  ngOnInit() {
    this.service.CourseAttendees.subscribe(res => { this.attendees.push(res) });
    this.GetCourseAttendance();
  }

  FilterByDate(fdate: string) {
   
    if (fdate != "")
      this.service.FilterByDate(fdate).subscribe(data => {
        this.attendees = data;
      });
    else 
      this.GetCourseAttendance();
  }


  FilterByEmail(email: string) {
   
    if (email != "")
      this.service.FilterByEmail(email).subscribe(data => {
        this.attendees = data;
      });
    else
      this.GetCourseAttendance();
  }
  GetCourseAttendance() {
    
    this.service.GetCourseAttendance().subscribe(data => {
      this.attendees = data.sort((a, b) => a.SessionDate > b.SessionDate ? 1 : -1)
    });
  }
}
