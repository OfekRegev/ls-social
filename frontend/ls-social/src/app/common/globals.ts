import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class Globals {
  base_url: string = "https://losocial-backend.onrender.com/";
  register_endpoint: string = "register";
  login_endpoint: string = "login";
  publish_post_endpoint: string = "publish";
  get_post_endpoint: string = "posts";

}
