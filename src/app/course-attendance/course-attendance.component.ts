import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Attendees } from '../models/attendance.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import { MatDatepickerInputEvent } from '@angular/material';
import { AttendanceService } from '../services/attendance.service'
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-course-attendance',
  templateUrl: './course-attendance.component.html',
  styleUrls: ['./course-attendance.component.css']
})
export class CourseAttendanceComponent implements OnInit {

  attendees: Attendees[];
  firebaseDB: AngularFirestore;
  filterDate: string;
  email: string;
  IsEdit: boolean = false;
  editIndex: number;
  dataSource;
  displayedColumns = ['Course', 'Email', 'IsPresent', 'Name', 'SessionDate', 'Options'];
  // columns =['IsPresent', 'Name', 'Email', 'Course','SessionDate'];
  constructor(private af: AngularFirestore, public service: AttendanceService) {
    //this.displayedColumns = ['IsPresent', 'Name', 'Email', 'Course','SessionDate'];
    this.firebaseDB = af;
    //this.columns=this.displayedColumns;
  }

  ngOnInit() {
    this.service.CourseAttendees.subscribe(res => { this.attendees.push(res) });
    this.GetCourseAttendance();
  }

  FilterByDate(fdate: string) {

    if (fdate != "")
      this.attendees = this.attendees.filter((atn) => {
        if (atn.SessionDate == fdate)
          return atn;
      });
    // this.service.FilterByDate(fdate).subscribe(data => {
    //   this.attendees = data;
    // });
    else
      this.GetCourseAttendance();
  }


  FilterByEmail(email: string) {

    if (email != "")
      this.attendees = this.attendees.filter((atn) => {
        if (atn.Email.toLocaleLowerCase().includes(email.toLowerCase()))
          return atn;
      });
    // this.service.FilterByEmail(email).subscribe(data => {
    //   this.attendees = data;
    // });
    else
      this.GetCourseAttendance();
  }
  GetCourseAttendance() {
    this.service.GetCourseAttendance().subscribe(data => {
      this.attendees = data.sort((a, b) => a.SessionDate > b.SessionDate ? 1 : -1)
      this.dataSource = new MatTableDataSource(this.attendees);
      console.log(this.dataSource);
    });
  }

  edit(atn: Attendees, i: number) {
    this.IsEdit = true;
    this.editIndex = i;
    console.log(atn);
  }
  cancel() {
    this.IsEdit = false;
    this.editIndex = -1;
  }
}
