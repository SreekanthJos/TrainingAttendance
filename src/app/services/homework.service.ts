import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { EmpHomework, Homework,Employee } from '../models/attendance.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlConstants } from '../models/url-constants.model';
import "rxjs/add/observable/of";
@Injectable()
export class HomeworkService {
  firebaseDB: AngularFirestore;
  emphomeworks: Observable<EmpHomework[]>;
  homework: Homework;
  constructor(private af: AngularFirestore) {
    this.firebaseDB = af;
  }
  getEmployeeHomeworks(): Observable<EmpHomework[]> {
    return this.emphomeworks = this.firebaseDB.collection<EmpHomework>("/emphomeworks").snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as EmpHomework;
      const id = a.payload.doc.id;
      data.Id = id;
      return data;
    }))
    );
  }
  saveEmpHomework(emphw: EmpHomework) {    

    this.firebaseDB.doc(`emphomeworks/${emphw.Id}`).update(emphw);
  }

  createHomework(homework: Homework): Observable<boolean> {
    let data = {
      "Name": homework.Name,
      "Description": homework.Description,
      "Course": homework.Course
    };
    this.firebaseDB.collection(UrlConstants.Homeworks).add(data);
    return Observable.of(true);
  }
  assignHomeworkToAttendees(emp: Employee, homework: Homework) {
    let ar: any[] = new Array();
    ar.push({ 'Name': homework.Name, 'Description':homework.Description,'Repo':'','Status': false });
    let data = {
      "Email": emp.Email,
      "Name": emp.Name,
      "gitrepo": "",
      "Hworks": ar
    }
    this.firebaseDB.collection(UrlConstants.EmpHomeworks).add(data);
  }
  updateHomwork(emp: Employee, homework: Homework, emphw: EmpHomework) {
    // let ar: any[] = new Array();
    // ar.push({ 'name': homework.Name, 'description':homework.Description, 'status': false });

    emphw.Hworks.push({ 'Name': homework.Name, 'Description':homework.Description,'Repo':'','Status': false });
    this.firebaseDB.doc(`emphomeworks/${emphw.Id}`).update(emphw);

  }

}
