import { Routes } from '@angular/router';
import {AirplaneList} from './components/airplane-list/airplane-list';

export const routes: Routes = [
  { path: 'airplanes', component: AirplaneList },


  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: '**', redirectTo: 'airplanes' }
];
