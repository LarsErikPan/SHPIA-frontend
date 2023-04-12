import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [ ConfigService ]
})

export class ConfigComponent implements OnInit{

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getConfig();
  }


}
