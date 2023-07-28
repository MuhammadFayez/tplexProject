import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpzService {

  constructor(
    private http : HttpClient
  ) { }

  getCall(url : any){
  console.log(url);

    return this.http.get<any>(url);
   }
}
