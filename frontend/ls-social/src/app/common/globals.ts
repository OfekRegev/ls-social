import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class Globals {
  base_url: string = "http://localhost:3000/";
  register_endpoint: string = "register";
  login_endpoint: string = "login";
}
