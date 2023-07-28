import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { Login } from '../models/login';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  login(loginData : Login | any){
    this.http.post<any>(environment.TOKEN_CALL, loginData)
      .subscribe(
        data =>{
          if(data)
              this.storeToken(data);
              this.doNavigate();
        }
        );
  }


  storeToken(token : Token){
    console.log(token.access_token)
    localStorage.setItem("acc_t", JSON.stringify(token.access_token));
  }


  getToken() {
    return localStorage.getItem("acc_t");
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }


  private doNavigate() {
    this.router.navigate(['/posts']);
  }

  public doLogoutUser() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }


}
