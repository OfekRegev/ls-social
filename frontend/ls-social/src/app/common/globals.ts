import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
exports class Globals {
  base_url: string = "localhost:3000/api"
}
