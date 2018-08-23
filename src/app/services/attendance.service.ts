import { Injectable,Output } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { Employee, Attendees } from '../models/attendance.model';
import { UrlConstants } from '../models/url-constants.model'
@Injectable()
export class AttendanceService {

  firebaseDB: AngularFirestore;
  constructor(private af: AngularFirestore) {
    this.firebaseDB = af;
   }
   public CourseAttendees = new Subject<any>();

  GetCourses(): Observable<any> {
    return this.firebaseDB.collection<any>(UrlConstants.Courses).valueChanges();
  }

  GetCourseAttendance(): Observable<Attendees[]> {
    return this.firebaseDB.collection<Attendees>(UrlConstants.Attendees).valueChanges();
  }

  GetAttendeesListForTraining(): Observable<Employee[]> {

    return this.firebaseDB.collection<Employee>(UrlConstants.Employees).valueChanges();
  }

  IsEmployeeRegistered(emp: Employee): Observable<Employee[]> {

    return this.firebaseDB.collection<Employee>(UrlConstants.Employees, ref => ref.where('Email', '==', emp.Email)).valueChanges();
  }

  CourseRegistration(emp: Employee): Observable<Employee[]> {
    let data = {
      "Name": emp.Name,
      "Email": emp.Email,
      "Course": emp.Course
    };
    this.firebaseDB.collection(UrlConstants.Employees).add(data);
    return this.GetAttendeesListForTraining();
  }
  IsDuplicate(emp: Employee): Observable<Attendees[]> {
    let sDate = new Date().toLocaleDateString();
    return this.firebaseDB.collection<Attendees>(UrlConstants.Attendees, ref => ref.where('SessionDate', '==', sDate).where('Name', '==', emp.Name)).valueChanges();
  }
  SaveAttendance(emp: Employee): void {
    let data = {
      "Name": emp.Name,
      "Course": emp.Course,
      "Email": emp.Email,
      "SessionDate": new Date().toLocaleDateString(),
      "IsPresent": emp.IsPresent
    };
    this.firebaseDB.collection(UrlConstants.Attendees).add(data);
   
    this.CourseAttendees.next(data);  
  }

  FilterByDate(fdate: string):Observable<Attendees[]> {    
      return this.firebaseDB.collection<Attendees>(UrlConstants.Attendees, ref => ref.where('SessionDate', '==', fdate))
        .valueChanges();    
  }
  FilterByEmail(email: string):Observable<Attendees[]> {    
    return  this.firebaseDB.collection<Attendees>(UrlConstants.Attendees, ref => ref.where('Email', '==', email))
        .valueChanges();
  }
}
