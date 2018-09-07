import { Component } from '@angular/core';
 
    import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //isAuth=false;
  constructor(private loginService:LoginService){
//this.isAuth=this.loginService.isAuthenticated;
  }
  title = 'app';
}
