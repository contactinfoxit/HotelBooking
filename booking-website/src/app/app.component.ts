import { SessionService } from './shared/model/session.service';

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dir: string = 'rtl';
  constructor(private translate: TranslateService, private sessionService: SessionService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
    translate.use('ar');




  }
  ngOnInit() {
this.sessionService.setSharedData({option: 'direction', value: this.dir});
  }
  changeLang(lang: string, direction: string, sidenav: any ) {
    this.dir = direction;
    this.translate.use(lang);
this.sessionService.setSharedData({option: 'direction', value: this.dir});
    sidenav.toggle();
  }
}
