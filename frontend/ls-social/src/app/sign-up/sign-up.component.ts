import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../services/auth/authentication";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Input() signUpModel: SignUpModel
  constructor(private authSerivce: AuthenticationService) {
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
      response => {console.log(response);
      },
      err => {},
      () => {}
    )
  }
}
export interface SignUpModel {
  email: string,
  name: string,
  password: string
}
