import { Component, OnInit, Input } from '@angular/core';
import { NgpImagePickerModule } from 'ngp-image-picker';
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Post } from '../models/post.model'
import { PostService } from "../services/posts/posts.service";
import { DatePipe } from '@angular/common';
const datePipe = new DatePipe('en-US');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() newPost: NewPost = {
    content: "",
  }
  posts: Post[] = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(0, 0)
      .subscribe(
        (posts) => {
          // maping DTO object to display object
          posts.forEach(element => {
            let lastEdited: string = datePipe.transform(element.lastEditTimeStamp, 'EEEE, MMMM d') as string
            let creationDate:string = datePipe.transform(element.creationTimeStamp, 'EEEE, MMMM d') as string
            let post: Post = {
              content: element.content,
              author: element.author.name,
              creationDate: creationDate,
              lastEdited: lastEdited,
              imageUrl: "",
              editable: false,
            }
            this.posts.push(post)
          });
          console.log(posts);
        },
        (err) => {
          console.error(err);
        },
        () => { }
      )
  }

  onEditPost(post: Post) {
  }

  publishPost() {
    this.postService.publishPost(this.newPost.content)
    .pipe(map(
      (post)=>{
        let lastEdited: string = datePipe.transform(post.lastEditTimeStamp, 'EEEE, MMMM d') as string
        let creationDate:string = datePipe.transform(post.creationTimeStamp, 'EEEE, MMMM d') as string
        return {
          content: post.content,
          author: post.author.name,
          creationDate: creationDate,
          lastEdited: lastEdited,
          imageUrl: "",
          editable: false,
        }
      }
    )).subscribe(
      (post)=>{
        this.posts.push(post)
      },
      (error)=>{
        console.error(error);
      },
      ()=>{}
    )
  }
}

export interface NewPost {
  content: string;
}
