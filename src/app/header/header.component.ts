import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginWindowComponent } from '../login-window/login-window.component';
import { RegisterWindowComponent } from '../register-window/register-window.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public register_form_visible:boolean = false;

  constructor(public dialog: MatDialog) {}

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



