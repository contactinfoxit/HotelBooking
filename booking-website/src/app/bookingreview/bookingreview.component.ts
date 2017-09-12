import { SessionService } from './../shared/model/session.service';
import { Subscription } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { HousesService } from './../shared/model/houses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { House } from './../shared/model/house';

@Component({
  selector: 'app-bookingreview',
  templateUrl: './bookingreview.component.html',
  styleUrls: ['./bookingreview.component.css']
})
export class BookingreviewComponent implements OnInit {
houseDetail: House[];
houseId: string;
dir = 'rtl';
bookingNights: any;
checkInDate: any;
checkOutDate: any;

private subscription: Subscription;
  constructor(private route: ActivatedRoute, private housesService: HousesService, private router: Router,
  private localstorageService: LocalStorageService, private sessionService: SessionService) {
// fetch direction from shared service
// value will be rtl for arabic and ltr for english language
this.subscription = this.sessionService.sharedDataObservable$.subscribe((res) => {
if (res.hasOwnProperty('option') && res.option === 'direction') {
this.dir = res.value;
}

});
this.checkInDate = this.localstorageService.get('checkInDate');
this.checkOutDate = this.localstorageService.get('checkOutDate');
this.bookingNights = this.localstorageService.get('selectedNights');
if (!this.checkInDate) {
this.router.navigate(['/detailpage/']);
}

let finalData = [];
    let bookingData = [];
     this.houseId = this.route.snapshot.params['houseId'];
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
let ttt = +this.localstorageService.get('selectedNights');
finalData['price'] = this.housesService.getOneNightPrice(bookingData);
finalData['totalprice'] = this.housesService.getOneNightPrice(bookingData) * ttt;
finalData['grandTotal'] = finalData['totalprice'] + 100;
  });
});
this.houseDetail = finalData;
   }

  ngOnInit() {
  }

}
