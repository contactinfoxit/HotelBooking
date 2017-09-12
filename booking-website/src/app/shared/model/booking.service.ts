import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Booking } from './booking';

@Injectable()
export class BookingService {

  constructor(private db: AngularFireDatabase) { }

// getBookingDatesForSelectedHouse(houseId: string): Observable<Booking[]> {
//  return this.db.list('No5tha/BookingData/', {
//     query: {
//       orderByChild: 'houseId',
//       equalTo: houseId
//     }
//   })
// // return bookingData$;

// // return Observable.of([]);
// }
getBookingDatesForSelectedHouse(houseId: string, year: any): FirebaseObjectObservable<Booking[]> {
return this.db.object('No5tha/BookingDatabases/' + houseId + '/' + year + '/');
}

}
