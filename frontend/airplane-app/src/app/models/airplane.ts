export interface Airplane {
  id: string;
  tailNumber: string;
  model: string;
  manufacturer: string;
  capacity: number;
  status: 'active' | 'maintenance';
  maintenanceIntervalFlights: number;
  flightsSinceLastMaintenance: number;
}
