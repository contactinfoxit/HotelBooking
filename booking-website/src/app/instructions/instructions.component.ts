import { ActivatedRoute, Router } from '@angular/router';
import { HousesService } from './../shared/model/houses.service';
import { SessionService } from './../shared/model/session.service';
import { Component, OnInit } from '@angular/core';
import { House } from './../shared/model/house';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  houseDetail: House[];
lat: Number;
lng: Number;
houseId: string;
  constructor(private housesService: HousesService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
let finalData = [];
    let bookingData = [];
    this.houseId = this.route.snapshot.params['houseId'];

this.housesService.findIndHouseDetail( this.houseId)
.subscribe(snapshots => {
snapshots.forEach(element => {
  finalData[element.key] = element.val();

});

});


this.housesService.findIndHouseBookingDetail( this.houseId)
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


loadAvailabilityCalendar() {
  this.router.navigate(['/booking/' + this.houseId]);

}
goToPreBookingPage() {
this.router.navigate(['/prebooking/' + this.houseId]);
}
}
