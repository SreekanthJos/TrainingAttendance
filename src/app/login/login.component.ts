import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/attendance.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone
  ) {

  }

  ngOnInit() {
    //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    let flag = false;
    this.loginService.login(this.user).subscribe(res => {
      if (res) {
        this.ngZone.run(() => this.router.navigate(['/attendance']));
      }
    });

  }
}
