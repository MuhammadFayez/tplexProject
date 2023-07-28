import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post.component';
import { PostsDetailComponent } from './posts-detail/posts-detail.component';


@NgModule({
  declarations: [
    PostComponent,
    PostsDetailComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
