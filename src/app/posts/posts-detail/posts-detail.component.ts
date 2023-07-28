import { Component, OnInit } from '@angular/core';
import { HttpzService } from '../../services/httpz.service';
import { environment } from 'src/environments/environment';
import { URLz } from '../../enums/url.enum';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/comments';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {

  public singlepost : Post | undefined;
  public postComments : Comments[] = [];

  constructor(
    private requestService : HttpzService,
    private _activeRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {

    let postId = this._activeRoute.snapshot.paramMap.get("postId")
    if(postId){
      this.getPost(postId);
      this.getPostComments(postId);
    }
  }

  getPost(id : string){
      this.requestService.getCall(environment.BASE_PATH + URLz.POSTS + '/' + id)
      .subscribe(
        (res : Post) =>{

            this.singlepost = res;
            console.log(this.singlepost);
      })
  }

  getPostComments(id : string){
    this.requestService.getCall(environment.BASE_PATH + URLz.COMMENTS + '?postId=' + id)
    .subscribe(
      (res : Comments[]) =>{
          this.postComments = res;
    })
  }

}
