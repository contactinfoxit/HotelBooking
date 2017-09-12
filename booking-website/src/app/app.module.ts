import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style } from '@angular/animations';
import { CalenderService } from './shared/model/calender.service';
import { BookingService } from './shared/model/booking.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/security/auth.service';
import { AgmCoreModule } from '@agm/core';
import { routerConfig } from './router.config';
import { HousesService } from './shared/model/houses.service';
import { firebaseConfig } from './../environments/firebase.config';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import {MdInputModule, MdButtonModule, MdCheckboxModule,
  MdSidenavModule, MdCardModule, MdNativeDateModule, MdDatepickerModule,
MdOptionModule, MdDatepickerIntl} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2/index';
import * as firebase from 'firebase/app'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { LoginComponent } from './login/login.component';


import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from './shared/model/session.service';
import { InstructionsComponent } from './instructions/instructions.component';

import { LocalStorageModule } from 'angular-2-local-storage';
import { BookingreviewComponent } from './bookingreview/bookingreview.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { FormWizardModule } from 'angular2-wizard';
import { SafeHtmlPipe } from './htmlPipe';
import { BookingdialogComponent } from './detailpage/bookingdialog/bookingdialog.component';
import 'web-animations-js/web-animations.min';
import { UserComponent } from './user/user.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { PhoneLoginComponent } from './login/phone-login/phone-login.component';
import { CountryPickerModule } from 'angular2-countrypicker';
import { RecaptchaModule } from 'ng2-recaptcha';
export function HttpLoaderFactory(http: Http) {
return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailpageComponent,
    LoginComponent,

    InstructionsComponent,
    BookingreviewComponent,
    SafeHtmlPipe, BookingdialogComponent, UserComponent, PasswordresetComponent, PhoneLoginComponent
  ],
  entryComponents: [BookingdialogComponent, PasswordresetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    MdInputModule, MdButtonModule, MdCheckboxModule, MdSidenavModule,
    MdCardModule, MdNativeDateModule, MdDatepickerModule, MdOptionModule, MdCheckboxModule,  FormsModule,
    RouterModule.forRoot(routerConfig, {useHash: true}), AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0H7RQhY57kz1Xb-XdWM5EjUUKhMpk-Tw'
    }), AngularFireAuthModule,  NgbModalModule.forRoot(), CommonModule, LocalStorageModule.withConfig({
      prefix: 'weekendq8',
      storageType: 'localStorage'
    }), BootstrapModalModule, FormWizardModule, NgbModule.forRoot(), CountryPickerModule.forRoot({
      baseUrl: 'assets/'
    }), RecaptchaModule.forRoot()
  ],
  providers: [MdDatepickerIntl, HousesService, AuthService, BookingService, SessionService, CalenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }



