import { Component } from '@angular/core';
import { PiWebsiteService } from "../piWebsiteService/pi-website.service";
import { BarDataService } from '../bar/bar-data.service';

@Component({
  selector: 'app-data-window',
  templateUrl: './data-window.component.html',
  styleUrls: ['./data-window.component.scss']
})
export class DataWindowComponent {

  public piWindowActive:boolean = false;
  public barWindowActive:boolean = false;

  constructor(private piWebsiteService:PiWebsiteService, private barDataService:BarDataService){
    this.barDataService.selectedDevice.subscribe(data=>{
      if (data.envID != -1){
        this.piWindowActive = false;
        this.barWindowActive = true;
      }
 

    })
    this.piWebsiteService.onDataChanged().subscribe(data=>{
      this.piWindowActive = true;
      this.barWindowActive = false;
    })
  }

}
