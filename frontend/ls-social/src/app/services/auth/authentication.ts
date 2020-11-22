import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../common/globals";
import {TokenInterceptor } from "../services/auth/token.interceptor"
export interface AuthResultDTO {
  message: string,
  auth_token: string
}


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginEndpoint = "/login"
  private signUpEndpoint = "/register"
  constructor(private http: HttpClient, private globals: Globals,private tokenInterceptor:TokenInterceptor) {
  }

  userSignIn(email: string, password: string): Observable<AuthResultDTO> {
    let loginForm = new URLSearchParams();
    loginForm.set('email', email);
    loginForm.set('password', password);
    console.log(loginForm);

    return this.http.post<AuthResultDTO>(this.globals.base_url + this.globals.login_endpoint, loginForm.toString() , {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(tap(response => {
      // saving the token to the token interceptor
      this.tokenInterceptor.updateToken(response.auth_token)
    }))
  }
  userAutoSignIn(token: string): Observable<AuthResultDTO> {
    let loginForm = new FormData()
    return this.http.post<AuthResultDTO>(this.globals.base_url + this.globals.login_endpoint, loginForm, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer ${token}"
      }
    });
  }

  userSignUp(email:string,name:string,password:string) {
    let registerForm = new URLSearchParams();
    registerForm.set('email', email);
    registerForm.set('name',name)
    registerForm.set('password', password);
    return this.http.post<AuthResultDTO>(this.globals.base_url + this.globals.register_endpoint, registerForm.toString() , {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(tap(response => {
      // saving the token to the token interceptor
      this.tokenInterceptor.updateToken(response.auth_token)
    }))
  }
}
