import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import { Observable, throwError, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


  constructor(
    public authService: AuthService,
    private router: Router,
    ) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('acc_t');
    if (token) {
      console.log(this.authService.getToken)
      const result: Observable<HttpEvent<any>> = next.handle(this.addToken(request,token))
      .pipe(
          catchError(
            (err) => {
              if (err.status === 401){
                this.handleAuthError();
                return of(err);
              }
              throw err;
            }
          )
        );
      return result;
  }
  else {
     return next.handle((request));
  }


  }

  private addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {

    return request.clone({
      setHeaders: {
                 Authorization: `Bearer ${JSON.parse(token)}`,
                 'Content-Type': 'application/json'
               },
    });

  }


  private handleAuthError() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }



}

