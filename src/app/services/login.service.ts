import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/attendance.model';
import { Observable } from 'rxjs/Observable'
@Injectable()
export class LoginService {
  firebaseDB: AngularFirestore;
  users: User[] = new Array();

  constructor(private af: AngularFirestore) {
    this.firebaseDB = af;
    this.getusers();
  }

  getusers() {
    this.firebaseDB.collection('/Users').valueChanges().subscribe(res => { this.users = res as User[] });
  }
  login(user: User): Observable<boolean> {
    debugger;
    let flag = false;
    if (this.users.length != 0) {
      this.users.forEach(d => {
        if (user.Email == d.Email && user.Password == d.Password) {
          flag = true;
        }
      });
    }
    return Observable.of(flag);
  }
  register(user: User): Observable<boolean> {
    let res = this.login(user);
    this.firebaseDB.collection('/Users').add(user);
    return Observable.of(true);
  }
}
