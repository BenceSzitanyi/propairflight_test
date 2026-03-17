import { Injectable } from '@angular/core';
import {Airplane} from '../models/airplane';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  private airplanes: Airplane[] = [
    {
      id: '1',
      tailNumber: 'N12345',
      model: '737-800',
      manufacturer: 'Boeing',
      capacity: 189,
      status: 'active',
      maintenanceIntervalFlights: 100,
      flightsSinceLastMaintenance: 45,
    },
    {
      id: '2',
      tailNumber: 'N67890',
      model: 'A320',
      manufacturer: 'Airbus',
      capacity: 180,
      status: 'active',
      maintenanceIntervalFlights: 100,
      flightsSinceLastMaintenance: 92,
    },
    {
      id: '3',
      tailNumber: 'N11111',
      model: '787-9',
      manufacturer: 'Boeing',
      capacity: 296,
      status: 'maintenance',
      maintenanceIntervalFlights: 100,
      flightsSinceLastMaintenance: 100,
    },
  ];

  constructor() {}

  getAirplanes(): Airplane[] {
    return this.airplanes;
  }

  getById(id: string | null): Airplane | undefined {
    return this.airplanes.find((airplane) => airplane.id === id);
  }

  incrementFlights(id: string): void {
    const plane = this.airplanes.find((p) => p.id === id);
    if (plane) {
      plane.flightsSinceLastMaintenance++;

      if (plane.flightsSinceLastMaintenance >= plane.maintenanceIntervalFlights) {
        plane.status = 'maintenance';
      }
    }
  }
}
