import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/attendance.model';
import { Observable } from 'rxjs/Observable'
@Injectable()

export class LoginService {
  firebaseDB: AngularFirestore;
  users: User[] = new Array();
  isAuthenticated: boolean = false;
  isAdmin = false;
  isUserExist = false
  constructor(private af: AngularFirestore) {
    this.firebaseDB = af;
    this.getusers();
  }

  getusers() {
    this.firebaseDB.collection('/Users').valueChanges().subscribe(res => { this.users = res as User[] });
  }
  login(user: User): boolean {


    if (this.users.length != 0) {
      this.users.forEach(d => {
        if (user.Email.toLowerCase() == d.Email.toLowerCase() && user.Password == d.Password) {

          this.isAuthenticated = true;
          if (user.Email.toLowerCase() == "siva" && user.Email.toLowerCase() == "naveen") {
            this.isAdmin = true;
          }
        }
      });
    }
    return (this.isAuthenticated);
  }
  checkUserExist(user: User): boolean {
    if (this.users.length != 0) {
      this.users.forEach(d => {
        if (user.Email.toLowerCase() == d.Email.toLowerCase()) {
          this.isUserExist = true;
        }
      })
    }
    return this.isUserExist;
  }
  register(user: User): Observable<boolean> {
    let res = this.checkUserExist(user);
    let result = false;

    if (!res) {
      let data = { "Email": user.Email, "Password": user.Password }
      this.firebaseDB.collection('/Users').add(data);
      result = true;
      this.isAuthenticated = true;
    }


    return Observable.of(result);
  }
}
