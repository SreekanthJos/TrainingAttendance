import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/attendance.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User=new User()
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {

  }

  ngOnInit() {
  }
  register() {
    this.loginService.register(this.user).subscribe(res => {
      if (res) {
        this.router.navigate(['/attendance']);
      }
    });
  }
}
