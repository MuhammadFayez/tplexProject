import { Component, OnInit } from '@angular/core';
import { HttpzService } from '../services/httpz.service';
import { environment } from 'src/environments/environment';
import { URLz } from '../enums/url.enum';
import { Post } from '../models/post';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public postList : Post[] = [];

  constructor(
    private requestService : HttpzService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
      this.requestService.getCall(environment.BASE_PATH + URLz.POSTS)
      .subscribe(
        (res : Post[]) =>{
            console.log(res);
            this.postList = res;
      })
  }

  Switch(id : number){
    if (id) this._router.navigate(['/posts/postDetail', { postId: id}]);
  }

}
