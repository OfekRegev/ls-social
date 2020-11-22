import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { Observable,of } from "rxjs";
import { catchError} from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginEndpoint = "/login"
  private signUpEndpoint = "/sign-up"
  constructor(private http: HttpClient) {
  }

  userSignIn() : Observable<UserModel> {
    return http.post.
  }

}
export interface UserLogin {
  email: string
  password: string
}
