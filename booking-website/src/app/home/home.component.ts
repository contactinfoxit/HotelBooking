import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { SessionService } from './../shared/model/session.service';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { House } from './../shared/model/house';

import { FirebaseApp } from 'angularfire2/app';
import { AngularFireModule} from 'angularfire2/index';
import { FirebaseListObservable, AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from '../../environments/firebase.config';
import { initializeApp, database } from 'firebase';
import { HousesService } from '../shared/model/houses.service';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allHouses: House[];
filtered: Array<any> = [];
swimmingpool: string;
torent: string;
whichline: string;
housetype: string;
toRentSelected= 'all';
whichlineSelected= 'all';
housetypeSelected= 'all';


zoom = 8;
// initial center position for the map
  lat= 48.333784;
  lng = 28.672399;

  constructor(private db: AngularFireDatabase, private housesService: HousesService, private sessionService: SessionService,
  private router: Router, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
let finalData = [];
this.housesService.findAllHouses()
.subscribe(snapshots => {
snapshots.forEach(snapshot => {
  if (snapshot.val().Bool === 'true') {
  finalData.push(this.housesService.prepareFinalData(snapshot));
  }
});
 console.log(finalData);
 this.filtered = this.allHouses = finalData;
})
  }

  goToHouseDetail(houseId) {
    this.localStorageService.set('houseId', houseId);
this.router.navigate(['/detailpage']);
}


  onSearch(form: NgForm) {
const value = form.value;
 // console.log(value);
if (value.swimmingpool === '' || value.swimmingpool === false) {
this.swimmingpool = 'false';
}else {
  this.swimmingpool = 'true';
}

if (value.torent === 'all') {
this.torent = '';
}else {
this.torent = value.torent;
}
if (value.whichline === 'all') {
this.whichline = '';
}else {
this.whichline = value.whichline;
}
if (value.housetype === 'all') {
this.housetype = '';
}else {
this.housetype = value.housetype;
}


let finalData = [];
this.housesService.findAllHouses()
.subscribe(snapshots => {
snapshots.forEach(snapshot => {
  if (snapshot.val().Bool === 'true') {
  finalData.push(this.housesService.prepareFinalData(snapshot));
  }
});
// console.log(this.swimmingpool);
this.filtered = finalData;
if (value.place !== '') {
this.filtered = this.filtered.filter(pp => pp.location === value.place);
}
if (value.swimmingpool !== '') {
this.filtered = this.filtered.filter(pp => pp.privateSwimmingPool === this.swimmingpool);
}
if (this.torent !== '') {
this.filtered = this.filtered.filter(pp => pp.typeOfPeopleAllowedToRent === this.torent);
}
if (this.whichline !== '') {
this.filtered = this.filtered.filter(pp => pp.whichLine === this.whichline);
}
if (this.housetype !== '') {
this.filtered = this.filtered.filter(pp => pp.houseType === this.housetype);
}
// console.log(this.filtered);

 // this.filtered = this.allHouses = finalData;
})

  }

}
