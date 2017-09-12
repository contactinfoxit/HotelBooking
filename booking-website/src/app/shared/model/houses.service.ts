import { resetFakeAsyncZone } from '@angular/core/testing/src/testing';
import { database } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { House } from './house';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class HousesService {

  constructor(private db: AngularFireDatabase) { }
findAllHouses(): Observable<any> {
 return this.db.list('No5tha/housesData/public', { preserveSnapshot: true})
}

prepareFinalData(snapshot: any) {
let internalData = [];
let bookingData = [];
  internalData['Bool'] = snapshot.val().Bool;
  internalData['HouseNumber'] = snapshot.val().HouseNumber;
  internalData['Latitude'] = snapshot.val().Latitude;
  internalData['Longitude'] = snapshot.val().Longitude;
  internalData['basement'] = snapshot.val().basement;
  internalData['descruption'] = snapshot.val().descruption;
  internalData['featuers'] = snapshot.val().featuers;
  internalData['floors'] = snapshot.val().floors;
  internalData['houseId'] = snapshot.val().houseId;
  internalData['houseName'] = snapshot.val().houseName;
  internalData['houseType'] = snapshot.val().houseType;
  internalData['location'] = snapshot.val().location;
  internalData['masterRooms'] = snapshot.val().masterRooms;
  internalData['photosGalaryURLs'] = snapshot.val().photosGalaryURLs;
  internalData['privateSwimmingPool'] = snapshot.val().privateSwimmingPool;
  internalData['rentrules'] = snapshot.val().rentrules;
  internalData['rooms'] = snapshot.val().rooms;
  internalData['salon'] = snapshot.val().salon;
  internalData['toilets'] = snapshot.val().toilets;
  internalData['typeOfPeopleAllowedToRent'] = snapshot.val().typeOfPeopleAllowedToRent;
  internalData['whichLine'] = snapshot.val().whichLine;
  this.db.list('No5tha/BookingDatabases/'+snapshot.key+'/'+this.generateDateLink(), {preserveSnapshot: true})
  .subscribe( bookingsnapshots => {
    bookingsnapshots.forEach(bookingSnapShot => {
      bookingData[bookingSnapShot.key] = bookingSnapShot.val();

       });
internalData['price'] = this.getOneNightPrice(bookingData);

         })
       return internalData;
}


getOneNightPrice(bookingData: Array<any>) {
  let weekDaysPrice = 0;
  let weekEndPrice = 0;
       if (bookingData['weekdays'] === 'true') {
weekDaysPrice = bookingData['weekdayPrice'];
       }else {
weekDaysPrice = bookingData['oneWeekDayPrice'];
       }
       if (bookingData['weekends'] === 'true') {
         weekEndPrice = bookingData['weekendPrice'];
       }else {
weekEndPrice = bookingData['oneWeekendDayPrice'];
       }
       if (weekDaysPrice < weekEndPrice) {
return weekDaysPrice;
}else {
return  weekEndPrice;
}
}




generateDateLink() {
  let finalLink = '';
let curDate = new Date();
    let year = curDate.getFullYear();
    let currentMonth = curDate.getMonth();
    let curDay = curDate.getDate();
    let totalDaysInMonth = {1: 31, 2 : 28 , 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
    let totalDays = curDay;
    for (let i = 1; i <= currentMonth; i++) {
totalDays = totalDays + totalDaysInMonth[i];
    }
let numberOfWeek = Math.ceil(totalDays / 7);
finalLink = year+'/'+numberOfWeek;
return finalLink;
}



findIndHouseDetail(houseId: string): Observable<any> {
return this.db.list('No5tha/housesData/public/'+houseId, { preserveSnapshot: true});
}

findIndHouseBookingDetail(houseId: string): Observable<any>{
return this.db.list('No5tha/BookingDatabases/'+houseId+'/'+this.generateDateLink(), { preserveSnapshot: true});
}


}
