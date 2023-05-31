import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';
import { LoginService } from '../loginService/login.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { SortSettingsModel } from '@syncfusion/ej2-angular-grids';




const Url = SettingsService.API_ENDPOINT
export interface cords {
  x: string[];
  y: number[];
}

export interface SelectedDevice {
  envID:number;
  name:string;
}


@Injectable({
  providedIn: 'root'
})



export class BarDataService {

  private token:string | null = null;

  constructor(private http: HttpClient, private loginService: LoginService) { 
    loginService.token$.subscribe(data => {
      if (data != null){
        this.token = data
      }
    })

    this.selectedDevice.subscribe(e => {
      var element = document.getElementById("deviceNameHeader");
      if (element != null){
        element.innerHTML = "Selected Device:  " + e.name
      }
      console.log(e)
      this.deviceName = e.name
      this.deviceEnvID = e.envID
    })
  }

  public deviceName: string | null = null;
  private deviceEnvID: number | null = null;
  private deviceStartTime: string | null = null;
  private deviceEndTime: string | null = null;
  private deviceType: string | null = null;


  public selectedDevice = new BehaviorSubject<SelectedDevice>({envID:-1, name:""})

  startDateInput(date: Date){
    this.deviceStartTime = date.toISOString()
  }

  endDateInput(date: Date){
    this.deviceEndTime = date.toISOString()
  }

  dataTypeInput(input:string){
    this.deviceType = input
  }

  GetData(){
    return this.http.get<cords>(
      Url + "Data/"+ this.deviceType +"?DeviceName=" + this.deviceName + "&envID=" + this.deviceEnvID + "&StartDate=" + this.deviceStartTime + "&EndDate=" + this.deviceEndTime,
      {headers:{
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + this.token,
      }}
    )
  }
}
