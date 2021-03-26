import { Component, EventEmitter} from "@angular/core";
import { NgForm } from "@angular/forms";
import {Post} from '../post.model';
import { PostsService } from "../posts.service";

@Component(
  {
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls:['./post-create.component.css']
  }
)

export class PostCreateComponent{
  newPost="";
  enteredContent="";
  enteredTitle="";
  postCreated = new EventEmitter<Post>();
  //EventEmitter is a generic type, which means we can pass additional information about which type of data it
  //works with. To pass this information, we need to add the <> and add the type between them

  constructor(public PostsService:PostsService){}

  onAddPost(form:NgForm){
    //checking to see if the form object is valid or not. this will prevent invalid posts to be added to the post list
    if(form.invalid){
      return;
    }
    this.PostsService.addPosts(form.value.title, form.value.content);
    //clears the form after the post is submitted
    form.resetForm();
  };
}
