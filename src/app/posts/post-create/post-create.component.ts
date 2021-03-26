import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Post} from '../post.model';

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
  //EventEmitter is a generic type, which means we can pass additional information about which type of data it
  //works with. To pass this information, we need to add the <> and add the type between them
  @Output() postCreated= new EventEmitter<Post>();

  onAddPost(form:NgForm){
    //checking to see if the form object is valid or not. this will prevent invalid posts to be added to the post list
    if(form.invalid){
      return;
    }
    const post:Post = {
      title: form.value.title,
      content:form.value.content
    }
    this.postCreated.emit(post);
  };
}
