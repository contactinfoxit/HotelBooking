import { Router } from '@angular/router';
import { AuthService } from './../../shared/security/auth.service';
import { NgForm } from '@angular/forms/src/directives';
import { CountryPickerModule, CountryPickerService } from 'angular2-countrypicker';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../../environments/firebase.config';
@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {
  verificationId: string;
  errorResponse: string;
windowRef: any;
  captchaReselved= 'null';
 public countries: any[];
  constructor(private countryPickerService: CountryPickerService, private authService: AuthService,
  private router: Router) {
    this.countryPickerService.getCountries().subscribe(countries => {

this.countries = countries;
    });

   }
resolved(captchaResponse: string) {
  this.captchaReselved = captchaResponse;

    }
    phoneLoginProcess(form: NgForm) {

const countryCode = form.value.countryCode;
const phoneNumber = form.value.number;
const validPhoneNumber = countryCode + phoneNumber;
const finalNumber = '+' + validPhoneNumber;
const appVerifire = this.windowRef.recaptchaVerifire;
this.authService.signinUserByPhoneNumber(finalNumber, appVerifire)
.then(result => {
  this.windowRef.confirmationResult = result;
this.verificationId = result.verificationId;
})
.catch(error => {
  console.log(error);
})

    }

    verifyLoginCode(form: NgForm) {
const verificationCode = form.value.confirmationcode;
this.windowRef.confirmationResult.confirm(verificationCode)
.then(result => {
// console.log(result);
this.router.navigate(['/user/']);
})
.catch(error => {
  this.errorResponse = error.message;

})
    }
  ngOnInit() {
    firebase.initializeApp(firebaseConfig);
this.windowRef = this.authService.WindowRef;
this.windowRef.recaptchaVerifire = new firebase.auth.RecaptchaVerifier('recaptcha-container');
this.windowRef.recaptchaVerifire.render();
  }

}

