import { PhoneLoginComponent } from './login/phone-login/phone-login.component';
import { UserComponent } from './user/user.component';

import { BookingreviewComponent } from './bookingreview/bookingreview.component';
import { InstructionsComponent } from './instructions/instructions.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule } from '@angular/router';
import { DetailpageComponent } from './detailpage/detailpage.component';


export const routerConfig: Route[] = [
  {path: 'home', component: HomeComponent},
 {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'detailpage',
component: DetailpageComponent
  },
  {
  path: 'login',
  component: LoginComponent
},
{
  path: 'phone-login',
  component: PhoneLoginComponent
},
{
  path: 'user',
  component: UserComponent
},

{
  path: 'instructions',
  children: [
    {
    path: ':houseId',
   component: InstructionsComponent
    }
  ]
},
{
  path: 'bookingreview',
  children: [
    {
    path: ':houseId',
   component: BookingreviewComponent
    }
  ]
}

];



