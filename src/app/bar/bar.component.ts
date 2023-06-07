import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ConfigService } from '../config/config.service';
import {BarDataService} from './bar-data.service'

interface Data {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [ ConfigService ]
})




export class BarComponent implements OnInit{

  constructor(public barDataService: BarDataService) {}

  ngOnInit(){
  }

  private x:string[] = [];
  private y:number[] = [];

  datas: Data[] = [
    {value: 'RawData', viewValue: 'Motion'},
    {value: 'Temperature', viewValue: 'Temperature'},
    {value: 'Pressure', viewValue: 'Pressure'},
    {value: 'Humidity', viewValue: 'Humidity'},
    //{value: 'Co2', viewValue: 'Co2'},
  ];

  public graph = {
      data: [
          { x: this.x, y: this.y, type: 'scatter', marker: {color: 'red'} },
      ],
      layout: {width: 500, height: 500, title: ''}
  };

  startDateInput(date: Date){
    this.barDataService.startDateInput(date)
  }

  endDateInput(date: Date){
    this.barDataService.endDateInput(date)
  }

  dataTypeInput(input:string){
    console.log(input)
    this.barDataService.dataTypeInput(input)
  }

  GetData(){
    this.barDataService.GetData().subscribe(e => {
      let window_width = document.getElementById("contentWindow")?.getBoundingClientRect().width ?? 500;
      this.graph = {
        data: [
          { x: e["x"], y: e["y"], type: 'scatter', marker: {color: 'red'} },
      ],
      layout: {width: window_width, height: 500, title: ''}
      }
    })
  }
}