import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../services/authentication";
import { UserLogin } from "./models/user.login.model";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Input() loginDetails: UserLogin
  constructor(private authSerivce: AuthenticationService) {
    this.loginDetails = {
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  onSignInClicked() {
    console.log("sign in clicked");

    this.authSerivce.userSignIn(this.loginDetails.email, this.loginDetails.password).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'))
  }
}
