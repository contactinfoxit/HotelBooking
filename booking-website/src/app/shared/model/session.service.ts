import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionService {
  private sharredData = new Subject<any>();
  sharedDataObservable$ = this.sharredData.asObservable();

  constructor() { }
public setSharedData(data: any) {
if (data) {
this.sharredData.next(data);
}
}

}
