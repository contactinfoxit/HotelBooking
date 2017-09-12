
import { NgForm } from '@angular/forms/src/directives';
import { BookingdialogComponent } from './bookingdialog/bookingdialog.component';
import { BookingService } from './../shared/model/booking.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { SessionService } from './../shared/model/session.service';
import { ActivatedRoute } from '@angular/router';
import { HousesService } from './../shared/model/houses.service';
import { Component,
 OnInit,
 ComponentFactoryResolver,
    ElementRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { House } from './../shared/model/house';
import { Router } from '@angular/router';
import { CalenderService } from '../shared/model/calender.service';

import { FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailpageComponent implements OnInit {
@ViewChild('calendarArea') calendarArea: ElementRef;

// variables for calendar
d = new Date();
calendar: any;
monthYear: any;
year: any;
houseDetail: House[];
lat: number;
lng: number;
zooom = 12;
dir = 'rtl';
houseId: any;
 bookingStatus: FirebaseObjectObservable<any>;
 bookingSubsData: any;
private subscription: Subscription;
  showSpinner = true;


  constructor(private route: ActivatedRoute, private housesService: HousesService, private router: Router,
  private sessionService: SessionService, private componentFactoryResolver: ComponentFactoryResolver,
  private calendarService: CalenderService, private localStorageService: LocalStorageService,
  private bookingService: BookingService, private dialogService: DialogService) {


    this.houseId = this.localStorageService.get('houseId');
this.bookingStatus = this.bookingService.getBookingDatesForSelectedHouse(this.houseId, this.d.getFullYear());
this.bookingStatus.subscribe(res => {
  this.bookingSubsData = res;
 console.log(res[28][1]['booked']);
 this.calendar = this.calendarService.get_calendar(res);
 this.showSpinner = false
});


this.monthYear = this.calendarService.monthYear;
this.year = this.calendarService.year;




this.subscription = this.sessionService.sharedDataObservable$.subscribe((res) => {
if (res.hasOwnProperty('option') && res.option === 'direction') {
this.dir = res.value;
}

});

let finalData = [];
    let bookingData = [];

this.housesService.findIndHouseDetail(this.houseId)
.subscribe(snapshots => {
snapshots.forEach(element => {
  finalData[element.key] = element.val();

});

});


this.housesService.findIndHouseBookingDetail(this.houseId)
.subscribe( bookingSnapShots => {
  bookingSnapShots.forEach(bookingElement => {
bookingData[bookingElement.key] = bookingElement.val();
finalData['price'] = this.housesService.getOneNightPrice(bookingData);

  });

this.lat = finalData['Latitude'];
this.lng = finalData['Longitude'];

});
this.houseDetail = finalData;

   }


  ngOnInit() {

  }


// Calendar Function

prevMonth() {

this.showSpinner = true;
this.calendarService.prevMonth(this.bookingSubsData);
 this.monthYear = this.calendarService.monthYear;
 this.year = this.calendarService.year;
 this.calendar = this.calendarService.calendar;

this.showSpinner = false;
}

   nextMonth() {

this.showSpinner = true;
this.calendarService.nextMonth(this.bookingSubsData);
 this.monthYear = this.calendarService.monthYear;
  this.year = this.calendarService.year;
 this.calendar = this.calendarService.calendar;

this.showSpinner = false;

   }


   ShowCheckInCheckOut() {

let disposable = this.dialogService.addDialog(BookingdialogComponent)
                .subscribe();
            // We can close dialog calling disposable.unsubscribe();
            // If dialog was not closed manually close it by timeout
            setTimeout(() => {
                disposable.unsubscribe();
            }, 100000);
}


}
