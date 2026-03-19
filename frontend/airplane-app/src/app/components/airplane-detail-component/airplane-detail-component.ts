import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AirplaneService } from '../../services/airplane-service';
import {Airplane} from '../../models/airplane';
import {TailNumberPipe} from '../../pipes/tail-number-pipe';
import { NgClass, CommonModule } from '@angular/common';
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
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  airplane: Airplane | undefined;
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchAirplaneDetails(id);
    }
  }

  fetchAirplaneDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.airplaneService.getById(id).subscribe({
      next: (data) => {
        this.airplane = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Could not find this airplane. It might have been decommissioned.';
        console.error('Detail Load Error:', error);
        this.cdr.detectChanges();
      },
    });
  }

  get maintenancePercentage(): number {
    if (!this.airplane) return 0;
    const percent =
      (this.airplane.flightsSinceLastMaintenance / this.airplane.maintenanceIntervalFlights) * 100;
    return Math.min(percent, 100);
  }

  handleFlightAdded() {
    if (this.airplane) {
      this.airplaneService.incrementFlights(this.airplane.id).subscribe({
        next: (updatedPlane) => {
          this.airplane = updatedPlane;
        },
        error: (error) => {
          alert('Could not update flight count.');
          console.error('Detail Load Error:', error);
        },
      });
    }
  }

  onDelete(): void {
    const airplane = this.airplane;
    if (!airplane) {return}

    const idToDelete = airplane.id;
    const confirmed = window.confirm('Are you sure you want to delete this plane?');
    if (confirmed) {
      this.isLoading = true;
      this.airplaneService.deleteAirplane(airplane.id).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/airplanes']);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = 'Could not delete the airplane.';
          this.isLoading = false;
          this.cdr.detectChanges();
          console.error('Delete error:', err);
        },
      });
    }
  }
}
