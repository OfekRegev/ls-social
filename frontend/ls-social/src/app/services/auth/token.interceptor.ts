import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor {
  token: string = "ALK3J_0Rk";

  updateToken(token: string): void {
    this.token = token;
  }
}
