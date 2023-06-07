import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginWindowComponent } from '../login-window/login-window.component';
import { RegisterWindowComponent } from '../register-window/register-window.component';
import { LoginService } from '../loginService/login.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public register_form_visible:boolean = false;
  public loggedIn:boolean = false;

  constructor(public dialog: MatDialog,private loginService: LoginService) {
    this.loginService.token$.subscribe(e=>{
      if (e != null && e.length > 1)
      this.loggedIn = true
    })
  }

  openLoginWindow(){
    const dialogRef = this.dialog.open(LoginWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log("dialog result: ${result}");
    });
  }

  openRegisterWindow(){
    const dialogRef = this.dialog.open(RegisterWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log("dialog result: ${result}");
    });
  }
}



