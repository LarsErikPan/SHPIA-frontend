import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../loginService/login.service';
import { SettingsService } from '../settings/settings.service';

const Url = SettingsService.API_ENDPOINT

@Component({
  selector: 'app-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.scss']
})

export class RegisterWindowComponent {

  
  public loginErrorMessage: string | null = null;

  
  constructor(public service :LoginService ,public dialogRef: MatDialogRef<RegisterWindowComponent>) {
    service.loginError$.subscribe(data => {
      this.loginErrorMessage = data
    })
  }

  register(email:string, password:string, confirmPassword:string){
    this.service.registerMessage$.subscribe(data => {
      if (data){
        this.closeDialog()
      }
    })
    this.service.register(email,password, confirmPassword)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

