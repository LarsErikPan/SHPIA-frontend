import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PiWebsiteService {
  private evn_token = "";
  private dataChanged = new ReplaySubject<string>();

  setData(data: string) {
    this.evn_token = data;
    this.dataChanged.next(data);
  }

  getData() {
    console.log("getData")
    return this.evn_token;
  }

  onDataChanged() {
    console.log("dataChanged")
    return this.dataChanged.asObservable();
  }
}
