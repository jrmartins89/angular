import { Component, EventEmitter, Output } from "@angular/core";
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

  onAddPost(){
    const post:Post = {
      title:this.enteredTitle,
      content:this.enteredContent
    }
    this.postCreated.emit(post);
  };
}
