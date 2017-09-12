import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { NgForm } from '@angular/forms/src/directives';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';

export interface ConfirmModel {

}
@Component({
  selector: 'app-bookingdialog',
  templateUrl: './bookingdialog.component.html',
  styleUrls: ['./bookingdialog.component.css']
})
export class BookingdialogComponent  extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel  {
errorStatus= true;
displayErrorMsg = false;
  title: string;
  message: string;
  bookingNights: number;
  chaletName: any;
   bookingDates: {};
   price: number;
    totalPrice: number;
    bookingnightError= false;
  constructor(dialogService: DialogService, private localStorageService: LocalStorageService, private router: Router) {
    super(dialogService);
  }
calculateRequestedDate(form: NgForm) {
  let standardDateTime = new Date();
  let standardDateWithZeroTime1 = standardDateTime.getMonth()+1 + '/' + standardDateTime.getDate() + '/' +
  standardDateTime.getFullYear();
  let standardDateWithZeroTime= new Date(standardDateWithZeroTime1);
let checkInDate = form.value.checkin;
let checkOutDate = form.value.checkout;
let oneDay = 24 * 60 * 60 * 1000; // one day in millisecond
let checkIndateObj = new Date(checkInDate);
let checkoutDateObj = new Date(checkOutDate);
let diffDays = Math.round(Math.abs((checkIndateObj.getTime() - checkoutDateObj.getTime()) / (oneDay)));
this.bookingNights = diffDays;
console.log(checkIndateObj.valueOf(), standardDateWithZeroTime.valueOf());
if ( checkIndateObj < standardDateWithZeroTime || this.bookingNights < 1 || this.bookingNights > 90) {
this.errorStatus = true;
this.displayErrorMsg = true;
}else {
  this.errorStatus = false;
  this.displayErrorMsg = false;
}
this.localStorageService.set('checkInDate', checkIndateObj.getFullYear() + '-' + checkIndateObj.getMonth() +
'-' + checkIndateObj.getDate() ) ;
this.localStorageService.set('checkOutDate', checkoutDateObj.getFullYear() + '-' + checkoutDateObj.getMonth() +
'-' + checkoutDateObj.getDate());
}
continueToBooking(SelectedNights: number) {
this.localStorageService.set('selectedNights', SelectedNights);
this.router.navigate(['/bookingreview/' + this.localStorageService.get('houseId')]);
this.close();
}

}
