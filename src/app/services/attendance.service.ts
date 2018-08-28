import { Injectable,Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee, Attendees } from '../models/attendance.model';
import { UrlConstants } from '../models/url-constants.model'
@Injectable()
export class AttendanceService {

  firebaseDB: AngularFirestore;
  services: Observable<Attendees[]>;
  servicesCollection: AngularFirestoreCollection<Attendees>;
  constructor(private af: AngularFirestore) {
    this.firebaseDB = af;
   }
   public CourseAttendees = new Subject<any>();

  GetCourses(): Observable<any> {
    return this.firebaseDB.collection<any>(UrlConstants.Courses).valueChanges();
  }

  GetCourseAttendance():Observable<Attendees[]> {
    this.servicesCollection=this.firebaseDB.collection<Attendees>(UrlConstants.Attendees);
    return this.services = this.servicesCollection.snapshotChanges().pipe(map(changes => {
			return changes.map(a => {
				const data = a.payload.doc.data() as Attendees;
				data.Id = a.payload.doc.id;
				return data;
			});
		}));
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
