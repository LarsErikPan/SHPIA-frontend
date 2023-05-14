import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { LoginService } from '../loginService/login.service';
import { BehaviorSubject } from 'rxjs';
import { PiWebsiteService } from "../piWebsiteService/pi-website.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SettingsService } from "../settings/settings.service";

  const Url = SettingsService.API_ENDPOINT
  const pi_URL = SettingsService.PI_ENDPOINT

@Component({
  selector: 'app-piwebsite',
  templateUrl: './piwebsite.component.html',
  styleUrls: ['./piwebsite.component.scss']
})


export class PiwebsiteComponent{
  @ViewChild('one') one?: ElementRef;


  private _envTokenSource = new BehaviorSubject<string | null>(null)
  private login_token:string | null = null;
  env_token = ""
  public safeUrl? :SafeResourceUrl
  private piwebpageUrl:string = ""


  constructor(
    private http: HttpClient, 
    private loginService: LoginService, 
    private pi_websiteService: PiWebsiteService,
    private sanitizer: DomSanitizer
    ) {
    loginService.token$.subscribe(data => {
      if (data != null){
        console.log("new login token")
        this.login_token = data
      }
    })    
    pi_websiteService.onDataChanged().subscribe(data => {
      this.get_env_token(data)
    })
  }


  get_env_token(envID:string){
    this.http.get<any>(Url + 'Environment/Token?envID=' + envID,{headers:{Authorization: 'bearer ' + this.login_token, responseType:"text"}})
    .subscribe(response => {
      this.env_token = response.token
      this.piwebpageUrl = pi_URL + this.env_token
      this.safeUrl = this.getSafeUrl()
    })
  }
  
  getSafeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.piwebpageUrl)
  }
}
