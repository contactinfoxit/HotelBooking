import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { AuthService } from './../shared/security/auth.service';
import { NgForm } from '@angular/forms/src/directives';
import { AngularFireModule } from 'angularfire2/index';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
error: any;

errorMessage: string;
showMessage = false;
user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService,
  private dialogService: DialogService) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }
// this function catch email and passwor from login form and proceed the login process
 loginWithEmail(form: NgForm) {
const email = form.value.email;
const password = form.value.password;
// signinUserByEmail() function is defined in authservice of shared/security/auth.service.ts
 this.authService.signinUserByEmail(email, password)
 .then(
  response => {
this.router.navigate(['/user/']);
  }
)
.catch(
  error => {
this.showMessage = true;
   this.errorMessage = 'Username or password doesnot match';
    setTimeout(() => {
                this.showMessage = false;
                console.log(this.showMessage);
            }, 3000);
  // console.log(this.code, this.message);
  }
);
  }

resetPassword() {
let disposable = this.dialogService.addDialog(PasswordresetComponent)
                .subscribe();
}





  loginWithFb() {

     this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
this.router.navigate(['/user/']);
    })
    .catch(error => {
this.errorMessage = error.message;
    setTimeout(() => {
                this.showMessage = false;

            }, 3000);
    });
  }
  loginWithGoogle() {
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
       .then(res => {
this.router.navigate(['/user/']);
    })
    .catch(error => {
this.errorMessage = error.message;
    setTimeout(() => {
                this.showMessage = false;

            }, 3000);
    });
  }
  loginWithTwitter() {
this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
       .then(res => {
this.router.navigate(['/user/']);
    })
    .catch(error => {
this.errorMessage = error.message;
    setTimeout(() => {
                this.showMessage = false;

            }, 3000);
    });
  }



loginWithPhone() {
  this.router.navigate(['/phone-login/']);

}
   signupWithTwitter() {
this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
     .then(res => console.log(res));
  }
  onSignupByEmail(form: NgForm) {
const email = form.value.email;
const password = form.value.password;
this.authService.signupUserByEmail(email, password);
  }

}
