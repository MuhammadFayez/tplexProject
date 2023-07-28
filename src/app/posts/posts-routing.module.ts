import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { PostsDetailComponent } from './posts-detail/posts-detail.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  // {path:'', component : PostComponent},
  // {path:'postDetail' , component : PostsDetailComponent}

  {
    path: "",
    canActivateChild: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        redirectTo: 'postList',
        pathMatch: 'full',
      },
      {
        path: "postList",
        component: PostComponent,
      },
      {
        path: "postDetail",
        component: PostsDetailComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
