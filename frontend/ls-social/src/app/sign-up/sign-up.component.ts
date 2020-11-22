import { Component, OnInit , Input} from '@angular/core';


export interface SignUpModel {
  email : string,
  name : string,
  password: string
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
@Input  signUpModel: SignUpModel
  constructor() {
    signUpModel = {
      email : "",
      name : "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

onSignUpClicked() {

}
}
