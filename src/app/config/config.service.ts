import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  x_acceleration: number;
  loggedTime: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'http://51.174.84.85:5000/api/User/test'

  constructor(private http: HttpClient) { }
  totalAngularPackages:any;

  x$:string[] = []
  y$:number[] = []

  getConfig(){
    const response = this.http.get('http://51.174.84.85:5000/api/User/test',{responseType:'text'});
    response.subscribe(data => {
      const list = data.split("\n");
      list.forEach( e => {
        const data = e.split(",")
        this.x$.push(data[0])
        this.y$.push(+data[1])
      })
    })
  }
}
