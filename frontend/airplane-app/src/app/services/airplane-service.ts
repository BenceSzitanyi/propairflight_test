import { Injectable, inject } from '@angular/core';
import {Airplane} from '../models/airplane';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  /*private airplanes: Airplane[] = [
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
  ];*/

  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/api/airplanes";

  constructor() {}

  /*getAirplanes(): Airplane[] {
    console.log(this.airplanes)
    return this.airplanes;
  }*/

  getAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.apiUrl)
  }

  getById(id:string){
    return this.http.get<Airplane>(this.apiUrl+`/${id}`)
  }

  incrementFlights(id:string){
    return this.http.post<Airplane>(this.apiUrl+`/${id}/increment-flights`, {})
  }

  addAirplane(plane:any):Observable<Airplane>{
    return this.http.post<Airplane>(this.apiUrl,plane);
  }

  updateAirplane(id: string, airplane: any):Observable<Airplane>{
    return this.http.put<Airplane>(this.apiUrl+`/${id}`,airplane);
  }

  deleteAirplane(id:string | null):Observable<void>{
    return this.http.delete<void>(this.apiUrl+`/${id}`);
  }

  /*getById(id: string | null): Airplane | undefined {
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

  addAirplane(planeData: Omit<Airplane, 'id'>): Airplane {
    const newAirplane: Airplane = {
      ...planeData,
      id: (this.airplanes.length + 1).toString()
    };

    this.airplanes.push(newAirplane);
    console.log(this.airplanes);
    return newAirplane;
  }*/
}
