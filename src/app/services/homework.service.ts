import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { EmpHomework } from '../models/attendance.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HomeworkService {
  firebaseDB: AngularFirestore;
  homeworks: Observable<EmpHomework[]>;
  constructor(private af: AngularFirestore) {
    this.firebaseDB = af;
  }
  getEmployeeHomeworks(): Observable<EmpHomework[]> {
    return this.homeworks = this.firebaseDB.collection<EmpHomework>("/emphomeworks").snapshotChanges().pipe(map(actions => actions.map(a => {
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
}
