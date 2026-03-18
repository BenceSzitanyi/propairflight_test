import { Routes } from '@angular/router';
import {AirplaneList} from './components/airplane-list/airplane-list';
import { AirplaneDetailComponent } from './components/airplane-detail-component/airplane-detail-component';
import { AirplaneAddComponent } from './components/airplane-add-component/airplane-add-component';
import { LoginComponent } from './components/login-component/login-component';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: 'airplanes', component: AirplaneList, canActivate: [authGuard]},
  { path: 'airplanes/new', component: AirplaneAddComponent, canActivate: [authGuard] },
  { path: 'airplanes/:id', component: AirplaneDetailComponent, canActivate: [authGuard] },


  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: '**', redirectTo: 'airplanes' },
];
