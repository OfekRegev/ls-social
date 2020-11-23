import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from "../../common/globals";
import { TokenInterceptor } from "../../services/auth/token.interceptor"


export interface PostDTO {
  content: string ;
  author: AuthorDTO;
  creationTimeStamp: number;
  lastEditTimeStamp: number;
  imageUrl: string;
  editable: boolean;
}
export interface AuthorDTO {
  name: string,
  user_id: string
}
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private globals: Globals,private tokenInterceptor:TokenInterceptor) {
  }
  publishPost(content: string): Observable<PostDTO> {
    let postForm = new URLSearchParams();
    postForm.set('content', content);
    return this.http.post<PostDTO>(this.globals.base_url +
      this.globals.publish_post_endpoint, postForm.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': "Bearer "+this.tokenInterceptor.token
        }
      })
  }

  // loads posts from the server. the first post will be the post from the currentIndex and the last one will be currentIndex+count
  getPosts(currentIndex: number, count: number): Observable<PostDTO[]> {
    let token: string = ""
    return this.http.get<PostDTO[]>(this.globals.base_url +
      this.globals.get_post_endpoint + "?startIndex=${currentIndex},count=${count}", {
        headers: {
          'Authorization': "Bearer "+this.tokenInterceptor.token
        }
      }
    )
  }

}
