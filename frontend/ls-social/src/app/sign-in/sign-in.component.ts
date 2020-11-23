import { Component, OnInit, Input } from '@angular/core';
import { UserLogin } from "./models/user.login.model";
import { AuthenticationService } from "../services/auth/authentication";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Input() loginDetails: UserLogin
  constructor(private authSerivce: AuthenticationService, private router: Router) {
    this.loginDetails = {
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  onSignInClicked() {
    console.log("sign in clicked");
    // empty email or password cannot sign in anyway
    if (this.loginDetails.email === "" || this.loginDetails.password === "") {
      return
    }
    this.authSerivce.userSignIn(this.loginDetails.email, this.loginDetails.password).subscribe(
      res =>
        this.router.navigate(['/home'])
      ,
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'))
  }
}
