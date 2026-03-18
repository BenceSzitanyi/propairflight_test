import { Routes } from '@angular/router';
import {AirplaneList} from './components/airplane-list/airplane-list';
import { AirplaneDetailComponent } from './components/airplane-detail-component/airplane-detail-component';
import { AirplaneAddComponent } from './components/airplane-add-component/airplane-add-component';
import { LoginComponent } from './components/login-component/login-component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'airplanes', component: AirplaneList },
  { path: 'airplanes/new', component: AirplaneAddComponent },
  { path: 'airplanes/:id', component: AirplaneDetailComponent },


  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: '**', redirectTo: 'airplanes' },
];
