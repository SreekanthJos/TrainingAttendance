import { Component, OnInit } from '@angular/core';
import {AuthConfig} from 'angular-oauth2-oidc'
import { environment } from '../../environments/environment';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  authConfig:AuthConfig={
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/index.html',
    clientId: environment.googleClientId,
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
  }
  constructor(private oauthService:OAuthService) {

    this.oauthService.configure(this.authConfig);
   this.oauthService.tokenValidationHandler = new JwksValidationHandler();
   this.oauthService.loadDiscoveryDocumentAndTryLogin();
   }
login(){
  this.oauthService.initImplicitFlow();
}
  ngOnInit() {
  }

}
