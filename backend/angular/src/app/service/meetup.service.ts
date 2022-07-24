
import {finalize, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers,RequestMethod} from '@angular/http';
import { Router } from '@angular/router';
import { BaseApiService } from './base_api.service';
import {LoaderService} from './loader.service';


@Injectable() 
export class MeetUpService{

  private headers = new Headers();
  constructor(private http: Http,
            private baseApiService:BaseApiService,
            private router: Router,
            private loaderService:LoaderService){
  }

  private showLoader(obj): void {
      this.loaderService.show(obj);
  }
  private onEnd(id): void {
      this.loaderService.hide(id);
  }

  getInfoUser(data){
    this.showLoader({"id":1, "service":"MeetUpService", "function":"getInfoUser"});
    let url = this.baseApiService.url_backend+"api/info/user";
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    const options = new RequestOptions(
      {
        headers: this.headers,
        method:'POST'
      });
    return this.http.post(url,data,options).pipe(map((res:Response) => res.json())
      ,finalize(()=> this.onEnd(1)),);
  }
  getUserGroups(data){
    this.showLoader({"id":2, "service":"MeetUpService", "function":"getUserGroups"});
    let url = this.baseApiService.url_backend+"api/user/groups";
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    const options = new RequestOptions(
      {
        headers: this.headers,
        method:'POST'
      });
    return this.http.post(url,data,options).pipe(map((res:Response) => res.json())
      ,finalize(()=> this.onEnd(2)),);
  }
  

  getMembersGroups(data){
    this.showLoader({"id":3, "service":"MeetUpService", "function":"getMembersGroups"});
    let url = this.baseApiService.url_backend+"api/members/groups";
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    const options = new RequestOptions(
      {
        headers: this.headers,
        method:'POST'
      });
    return this.http.post(url,data,options).pipe(map((res:Response) => res.json())
      ,finalize(()=> this.onEnd(3)),);
  }

  getCommentsGroups(data){
    this.showLoader({"id":4, "service":"MeetUpService", "function":"getCommentsGroups"});
    let url = this.baseApiService.url_backend+"api/comments/groups";
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    const options = new RequestOptions(
      {
        headers: this.headers,
        method:'POST'
      });
    return this.http.post(url,data,options).pipe(map((res:Response) => res.json())
      ,finalize(()=> this.onEnd(4)),);
  }
  getGroup(data){
    this.showLoader({"id":5, "service":"MeetUpService", "function":"getMembersGroups"});
    let url = this.baseApiService.url_backend+"api/group";
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    const options = new RequestOptions(
      {
        headers: this.headers,
        method:'POST'
      });
    return this.http.post(url,data,options).pipe(map((res:Response) => res.json())
      ,finalize(()=> this.onEnd(5)),);
  }
  
  logout(){
    localStorage.removeItem("id_meetup");
    this.router.navigate(['/login']);
  }
}
