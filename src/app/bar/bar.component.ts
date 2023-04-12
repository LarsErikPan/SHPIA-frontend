import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [ ConfigService ]
})


export class BarComponent implements OnInit{

  constructor(private configService: ConfigService) {}

  ngOnInit(){
    this.configService.getConfig()
  }

  public graph = {
      data: [
          { x: this.configService.x$, y: this.configService.y$, type: 'scatter', marker: {color: 'red'} },
      ],
      layout: {width: 320, height: 240, title: 'A Fancy Plot'}
  };
}

