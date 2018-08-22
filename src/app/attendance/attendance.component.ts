import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee, Attendees } from './attendance.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DELEGATE_CTOR } from '@angular/core/src/reflection/reflection_capabilities';
import { MatDatepickerInputEvent } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public emp: Employee = new Employee();
  employees: Employee[];
  attendees: Attendees[];
  firebaseDB: AngularFirestore;
  isPresent: boolean;
  courses: string[] = new Array<string>();
  filterDate: string;

  constructor(private af: AngularFirestore,public dialog: MatDialog) {

    this.firebaseDB = af;
  }

  ngOnInit() {
    this.GetCourses();
    this.GetAttendeesListForTraining();
    this.GetCourseAttendance();
  }
  FilterByDate(fdate: string) {
    if(fdate!="")
    this.firebaseDB.collection<Attendees>("/attendees", ref => ref.where('SessionDate', '==', fdate))
      .valueChanges().subscribe(data => {
        this.attendees = data;
      });
      else
      this. GetCourseAttendance();
  }

  GetCourses() {
    this.firebaseDB.collection<any>("/Courses").valueChanges().subscribe(data => {
      if (data.length > 0)
        this.courses = data[0].CourseName;
    });
  }

  GetCourseAttendance() {

    this.firebaseDB.collection<Attendees>("/attendees").valueChanges().subscribe(data => {
      this.attendees = data.sort((a, b) => a.SessionDate > b.SessionDate ? 1 : -1)

    });
  }

  GetAttendeesListForTraining() {

    this.firebaseDB.collection<Employee>("/employees").valueChanges().subscribe(data => {
      this.employees = data;
      this.employees.forEach(element => {
        element.IsPresent=false;
      });

    });
  }

  Save(): void {
    
    let sDate = new Date().toLocaleDateString();
    let isExist: boolean = false;
    this.employees.forEach(emp => {
      let exemp=emp as Employee;
      console.log(exemp.IsPresent);
      this.firebaseDB.collection("/attendees", ref => ref.where('SessionDate', '==', sDate).where('Name', '==', emp.Name)).valueChanges().subscribe(res => {
        if (res.length == 0) {

          let data = {
            "Name": emp.Name,
            "Course": emp.Course,
            "Email": emp.Email,
            "SessionDate": new Date().toLocaleDateString(),
            "IsPresent": emp.IsPresent
          };
          this.firebaseDB.collection("/attendees").add(data);
        }
      });
    });
    let dialog = this.dialog.open(DialogComponent,{data:"Data Saved Successfully.."});
    this.GetAttendeesListForTraining();
    this.GetCourseAttendance();
  }
  RegisterEmployeeForCourse(): void {

    this.firebaseDB.collection("/employees", ref => ref.where('Email', '==', this.emp.Email)).valueChanges().subscribe(res => {
      if (res.length == 0) {
        let data = {
          "Name": this.emp.Name,
          "Email": this.emp.Email,
          "Course": this.emp.Course
        };
        this.firebaseDB.collection("/employees").add(data);

      }
      // else  {
      //   alert('Emplolyee already regitered..')
      // }
    });

  }

}