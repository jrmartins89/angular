import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

const routes: Routes = [
  //the empty path means the main page
  {path:'', component:PostListComponent},
  {path:'create', component: PostCreateComponent},
  {path:'edit/:postId', component: PostCreateComponent},
];


//javascript objects where we define which url will present which part of the app
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
