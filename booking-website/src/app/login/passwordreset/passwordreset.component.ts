import { NgForm } from '@angular/forms/src/directives';
import { AuthService } from './../../shared/security/auth.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';
export interface ConfirmModel {

}
@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
status: boolean;
response: string;
  constructor(dialogService: DialogService, private authervice: AuthService) {
    super(dialogService);
   }
sendPassworResetEmail(form: NgForm) {
let email = form.value.email;

this.authervice.forgotPassword(email)
 .then(
response => {
  this.status = true;
  this.response = 'We will send a password reset link in your email.';
}
  )
  .catch(
error => {
  this.status = false;
  this.response = error.message;
}
  );
}

}
