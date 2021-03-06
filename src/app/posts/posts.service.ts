import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";

//it provides this service on the root level and it only creates one instance of the service for the whole app
@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    //the pipe method will convert the data we get back from the server before it's used in the subscribe. The pipe
    //operator allows us to add operator to the response.
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
      // return [...this.posts]
    // this return is using the spread operator. the square brackets create a new array and the ... takes all the
    //elements of the posts array, pulls them out of it and add them to the new array. using this the array is copied, not the object
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>("http://localhost:3000/api/posts/" + id);
  }

  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
        /* const post : Post={
        id:responseData.post.id,
        title: title,
        content: content,
        imagePath:responseData.post.imagePath
      };
      /* const id = responseData.postId;
      post.id = id; */
      /* this.posts.push(post);
      this.postsUpdated.next([...this.posts]); */
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
        /* const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p=>p.id===id);
      const post: Post ={
        id:id,
        title: title,
        content: content,
        imagePath:""
      };
      updatedPosts[oldPostIndex]=post;
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts]); */
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId);
      /* .subscribe(()=>{
      const updatedPosts = this.posts.filter(post=> post.id !==postId);
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts]);
      console.log("Deleted!");
    }); */
  }
}
