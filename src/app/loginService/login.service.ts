import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const Url = "http://192.168.10.164:5000/api/"

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  private _tokenSource = new BehaviorSubject<string | null>(null);
  private _ErrorSource = new BehaviorSubject<string | null>(null);
  token$ = this._tokenSource.asObservable();
  loginError$ = this._ErrorSource.asObservable();
  

  login(email:string, password:string){
    console.log(email)
    console.log(password)
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
      console.log("logged in")
      this._tokenSource.next(response.token)
      console.log("test")
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
    return throwError(()=> new Error("something bad happened; please try again later"))
  }
}
