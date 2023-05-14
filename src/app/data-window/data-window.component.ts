import { Component } from '@angular/core';
import { PiWebsiteService } from "../piWebsiteService/pi-website.service";

@Component({
  selector: 'app-data-window',
  templateUrl: './data-window.component.html',
  styleUrls: ['./data-window.component.scss']
})
export class DataWindowComponent {

  public piWindowActive:boolean = false;

  constructor(private piWebsiteService:PiWebsiteService){
    piWebsiteService.onDataChanged().subscribe(data=>{
      this.piWindowActive = true;
    })
  }

}
