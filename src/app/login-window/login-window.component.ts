import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../loginService/login.service';
import { SettingsService } from '../settings/settings.service';

const Url = SettingsService.API_ENDPOINT


@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html'
})

export class LoginWindowComponent {
  public loginErrorMessage: string | null = null;

  
  constructor(public service :LoginService ,public dialogRef: MatDialogRef<LoginWindowComponent>) {
    service.loginError$.subscribe(data => {
      this.loginErrorMessage = data
    })
  }
  public isLoggedIn:boolean = false;


  login(email:string, password:string){
    this.service.token$.subscribe(data => {
      if (data){
        this.isLoggedIn = true
        this.closeDialog()
      }
    })
    this.service.login(email,password)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
