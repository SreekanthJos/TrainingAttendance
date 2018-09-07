import { Component } from '@angular/core';
 
    import { LoginService } from './services/login.service';
    import { Router } from '@angular/router';
    @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //isAuth=false;
  constructor(public loginService:LoginService,private router:Router){
//this.isAuth=this.loginService.isAuthenticated;
  }
  title = 'app';
  logout(){
    this.loginService.isAuthenticated=false;
    this.router.navigate(['/'])
  }
}
