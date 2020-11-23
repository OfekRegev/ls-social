import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../services/auth/authentication";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Input() signUpModel: SignUpModel
  constructor(private authSerivce: AuthenticationService, private router: Router) {
    this.signUpModel = {
      email: "",
      name: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  onSignUpClicked() : void {
    this.authSerivce.userSignUp(this.signUpModel.email,this.signUpModel.name,this.signUpModel.password).subscribe(
      response => {
        this.router.navigate(['/home'])
      },
      err => {console.log(err);
      },
      () => {}
    )
  }
}
export interface SignUpModel {
  email: string,
  name: string,
  password: string
}
