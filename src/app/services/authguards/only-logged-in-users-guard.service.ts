import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor(private loginService: LoginService,private router:Router) {

  }

  canActivate() {
    console.log(this.loginService.isAuthenticated);
    if (this.loginService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
