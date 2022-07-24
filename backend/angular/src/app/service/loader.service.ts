import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../model/loader';
@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  loaderData = [];
  tempData = [];

  constructor() { }
  show(data) {
    this.loaderData.push(data);
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide(id) {
    this.tempData = [];
    for(var i=0; i<this.loaderData.length; i++){
      if(this.loaderData[i].id !== id){
        this.tempData.push(this.loaderData[i]);
      }
    }
    this.loaderData = this.tempData;
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
