
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()
export class BaseApiService {

    public url_backend;
    constructor() {
        this.url_backend = "http://localhost:8000/";
    }

    
}
