import { Component, OnDestroy, OnInit} from "@angular/core";
import {Post} from '../post.model';
import {Subscription} from 'rxjs';
import { PostsService } from "../posts.service";

@Component(
  {
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls:['./post-list.component.css']
  }
)

export class PostListComponent implements OnInit, OnDestroy{
/*   post_list = [
    {title:'first post',  content:'This is the first post!'},
    {title:'second post',  content:'This is the second post!'},
    {title:'third post',  content:'This is the third post!'}
  ] */
  private postsSub: Subscription;
  post_list: Post[]=[];

  //the public keyword will automatically create a new property in the
  //component and store the incoming value in the property
  constructor(public postsService: PostsService){ }

  ngOnInit(){
    this.post_list = this.postsService.getPosts();
    //we need to add a argument to the function subscribe.
    //It's a function that will be called whenever a new value is received
    this.postsSub= this.postsService.getPostsUpdateListener().subscribe((posts:Post[])=>{
      this.post_list=posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
