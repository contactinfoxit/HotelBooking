import { WindowRef } from '@agm/core/utils/browser-globals';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../../environments/firebase.config';
@Injectable()
export class AuthService {

  constructor() { }
  get WindowRef(){
    return window;
  }

  signupUserByEmail(email: string, password: string) {
firebase.auth().createUserWithEmailAndPassword(email, password)
.catch( error => console.log(error))
  }
signinUserByEmail(email: string, password: string): any {
return firebase.auth().signInWithEmailAndPassword(email, password);
}
forgotPassword(email: string) {
  return firebase.auth().sendPasswordResetEmail(email);
}

signinUserByPhoneNumber(contact: string, captchaResolved: any) {

 return firebase.auth().signInWithPhoneNumber(contact, captchaResolved);

}
}
