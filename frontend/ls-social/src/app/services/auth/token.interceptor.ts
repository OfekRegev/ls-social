import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor {
  private token: string = "";

  updateToken(token: string): void {
    this.token = token;
  }
}
