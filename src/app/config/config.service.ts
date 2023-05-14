import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SettingsService } from '../settings/settings.service';

const Url = SettingsService.API_ENDPOINT

export interface Config {
  x_acceleration: number;
  loggedTime: string;
}

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) { }
  totalAngularPackages:any;

  x$:string[] = []
  y$:number[] = []

  getConfig(){
    const response = this.http.get(Url + 'User/test',{responseType:'text'});
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
