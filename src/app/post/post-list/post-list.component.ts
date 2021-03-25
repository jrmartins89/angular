import {Component} from "@angular/core";

@Component(
  {
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
  }
)

export class PostListComponent{
  posts=[
    {title:'first post', content:'this is the content of the first post'},
    {title:'second post', content:'this is the content of the second post'},
    {title:'thrid post', content:'this is the content of the third post'}
  ];
 }
