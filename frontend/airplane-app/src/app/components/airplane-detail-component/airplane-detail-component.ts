import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AirplaneService } from '../../services/airplane-service';
import {Airplane} from '../../models/airplane';
import {TailNumberPipe} from '../../pipes/tail-number-pipe';
import { NgClass } from '@angular/common';
import {MaintenanceBarComponent} from '../maintenance-bar-component/maintenance-bar-component';

@Component({
  selector: 'app-airplane-detail-component',
  imports: [RouterLink, TailNumberPipe, NgClass, MaintenanceBarComponent],
  templateUrl: './airplane-detail-component.html',
  styleUrl: './airplane-detail-component.scss',
})
export class AirplaneDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private airplaneService = inject(AirplaneService);

  airplane: Airplane | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.airplane = this.airplaneService.getById(id);
  }

  get maintenancePercentage(): number {
    if (!this.airplane) return 0;
    const percent =
      (this.airplane.flightsSinceLastMaintenance / this.airplane.maintenanceIntervalFlights) * 100;
    return Math.min(percent, 100);
  }

  handleFlightAdded() {
    if (this.airplane) {
      this.airplaneService.incrementFlights(this.airplane.id);
    }
  }
}
