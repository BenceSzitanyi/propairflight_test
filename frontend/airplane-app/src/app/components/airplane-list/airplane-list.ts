import { Component, inject } from '@angular/core';
import {AirplaneService} from '../../services/airplane-service';
import {Airplane} from '../../models/airplane';

@Component({
  selector: 'app-airplane-list',
  imports: [],
  templateUrl: './airplane-list.html',
  styleUrl: './airplane-list.scss',
})
export class AirplaneList {
  private airplaneService: AirplaneService = inject(AirplaneService);
  airplanes: Airplane[] = this.airplaneService.getAirplanes();
}
