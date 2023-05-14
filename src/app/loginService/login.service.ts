import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SettingsService } from '../settings/settings.service';

const Url = SettingsService.API_ENDPOINT

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  private _tokenSource = new BehaviorSubject<string | null>(null);
  private _ErrorSource = new BehaviorSubject<string | null>(null);
  private _registerMessageSource = new BehaviorSubject<string | null>(null);
  token$ = this._tokenSource.asObservable();
  loginError$ = this._ErrorSource.asObservable();
  registerMessage$ = this._registerMessageSource.asObservable()
  

  login(email:string, password:string){
    this.http.post<any>(
      Url + 'User/login',
      {
        "Email": email,
        "Password": password
      },
      {headers:{'Content-Type': 'application/json'}}
    ).pipe(
      catchError(error => {
        return this.handleError(error)
      }
        )
    ).subscribe(response => {
      if (response.token){
        this._tokenSource.next(response.token)
      }
    })
  }

  register(email:string, password:string, confirmPassword:string){
    this.http.post<any>(
      Url + "user/register",
      {
        "Email": email,
        "password":password,
        "confirmPassword":confirmPassword
      },
      {headers:{'Content-Type': 'application/json'}}
    ).pipe(catchError(error => {
      return this.handleError(error)
    })
    ).subscribe(response => {
      this._registerMessageSource.next(response)
    })
  }

  private handleError(error: HttpErrorResponse){    
    if(error.status === 0)
    {
      console.error("something")
    } else {
      if (error.error.title != null){
        this._ErrorSource.next("Invalid Username or password.")
      } else {
        this._ErrorSource.next("Unable to log in.")
      }
   
    }
    return throwError(()=> new Error("Unable to log in."))
  }
}
