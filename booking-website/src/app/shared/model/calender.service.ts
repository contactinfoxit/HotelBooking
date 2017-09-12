import { TranslateService } from '@ngx-translate/core';
// import { FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { LocalStorageService } from 'angular-2-local-storage';
import { BookingService } from './booking.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CalenderService {
d = new Date();
 month_name = ['January', 'February', 'March', 'April', 'May', 'June',
 'July', 'August', 'September', 'October', 'November', 'December'];
   month = this.d.getMonth();
   year = this.d.getFullYear();
   first_date: any;
   tmp: any;
   first_day: any;
    day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   day_no: any;
   days: any;
calendar: any;
monthYear = this.month_name[this.month] ;
houseId: any;
booked: string;
bookedCaption= '';
 table: any;
 bookedClass: string;



  constructor(private bookingService: BookingService, private localStorageService: LocalStorageService,
   private __translate: TranslateService) {
    this.first_date = this.month_name[this.month] + ' ' + 1 + ' ' + this.year;
  this.tmp = new Date(this.first_date).toDateString();
  this.first_day = this.tmp.substring(0, 3);
  this.day_no = this.day_name.indexOf(this.first_day);
  this.days = new Date(this.year, this.month + 1, 0).getDate();
   this.houseId = this.localStorageService.get('houseId');
}

// Function that generate a calendar

 get_calendar(res: any): any {

this.table = '<div class="loader"></div>';
 this.table = '<table class="table">';
this.table += '<tr>';
for (let c = 0; c <= 6; c++ ) {
  this.table += '<th>' + this.__translate.instant(this.day_name[c]) + '</th>';
}
this.table += '</tr>';
let totalDaysCount = 1;
let loopCount = 1;

for (let rowcount = 1; rowcount <= 6; rowcount++) {
this.table += '<tr>';
for (let tdCount = 1; tdCount <= 7; tdCount++) {
if (loopCount <= this.day_no || totalDaysCount > this.days) {
this.table += '<td> </td>';
} else {

let weekNumber= this.getWeekNumber(this.d, this.year, this.month, totalDaysCount);
if (res.hasOwnProperty(weekNumber)) {


 if ( res[weekNumber][tdCount]['booked'] === 'true') {
this.bookedCaption = 'Booked';
this.bookedClass = 'active';
}else {
  this.bookedCaption = '';
  this.bookedClass = 'inactive';
}
}else {
 this.bookedCaption = 'NA'
  this.bookedClass = 'inactive';
}



  if ( totalDaysCount === this.d.getDate() && this.year === this.d.getFullYear() && this.month === this.d.getMonth()) {
this.table += '<td class="active">' + totalDaysCount + '<p class="bookedCaption">' + this.bookedCaption + '</p></td>';
  }else {
this.table += '<td class="' + this.bookedClass + '">' + totalDaysCount + '<p class="bookedCaption">' + this.bookedCaption + '</p></td>';
  }
totalDaysCount++
}
loopCount++
}
this.table += '</tr>';
}
this.table += '</table>';
return this.table;
  }

  prevMonth(res: any) {
this.month = this.month - 1;
    if (this.month < 0) {
    this.year = this.year - 1;
    this.month = 11;
    }
this.first_date = this.month_name[this.month] + ' ' + 1 + ' ' + this.year;
  this.tmp = new Date(this.first_date).toDateString();
  this.first_day = this.tmp.substring(0, 3);
  this.day_no = this.day_name.indexOf(this.first_day);
  this.days = new Date(this.year, this.month + 1, 0).getDate();
if (this.d.getFullYear() === this.year) {
    this.calendar = this.get_calendar(res);
}else {
let bookingStatus = this.bookingService.getBookingDatesForSelectedHouse(this.houseId, this.year);
bookingStatus.subscribe(resp => {
 this.calendar = this.get_calendar(resp);
});
}
    this.monthYear = this.month_name[this.month] + ' ' + this.year;
   }




     nextMonth(res: any) {

    this.month = this.month + 1;
    if (this.month > 11) {
    this.year = this.year + 1;
    this.month = 0;
    }
this.first_date = this.month_name[this.month] + ' ' + 1 + ' ' + this.year;
  this.tmp = new Date(this.first_date).toDateString();
  this.first_day = this.tmp.substring(0, 3);
  this.day_no = this.day_name.indexOf(this.first_day);
  this.days = new Date(this.year, this.month + 1, 0).getDate();
if (this.d.getFullYear() === this.year) {
    this.calendar = this.get_calendar(res);
}else {
let bookingStatus = this.bookingService.getBookingDatesForSelectedHouse(this.houseId, this.year);
bookingStatus.subscribe(resp => {
 this.calendar = this.get_calendar(resp);
});
}
    this.monthYear = this.month_name[this.month] + ' ' + this.year;
   }

   getWeekNumber(d, year, month, day) {
  d = new Date(Date.UTC(year, month, day));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  let WeekNo = Math.ceil(( ((d - yearStart ) / 86400000) + 1) / 7);
return WeekNo;
}
}


