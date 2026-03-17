import { Component, inject } from '@angular/core';
import {AirplaneService} from '../../services/airplane-service';
import {Airplane} from '../../models/airplane';
import { TailNumberPipe } from '../../pipes/tail-number-pipe';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-airplane-list',
  imports: [TailNumberPipe, RouterLink, NgClass],
  templateUrl: './airplane-list.html',
  styleUrl: './airplane-list.scss',
})
export class AirplaneList {
  private airplaneService: AirplaneService = inject(AirplaneService);
  airplanes: Airplane[] = this.airplaneService.getAirplanes();
}
