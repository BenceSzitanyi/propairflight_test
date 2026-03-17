import { Routes } from '@angular/router';
import {AirplaneList} from './components/airplane-list/airplane-list';
import { AirplaneDetailComponent } from './components/airplane-detail-component/airplane-detail-component';

export const routes: Routes = [
  { path: 'airplanes', component: AirplaneList },
  { path: 'airplanes/:id', component: AirplaneDetailComponent },


  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: '**', redirectTo: 'airplanes' }
];
