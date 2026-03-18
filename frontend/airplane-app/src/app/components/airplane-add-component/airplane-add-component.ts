import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AirplaneService} from '../../services/airplane-service';

@Component({
  selector: 'app-airplane-add-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './airplane-add-component.html',
  styleUrl: './airplane-add-component.scss',
})
export class AirplaneAddComponent {
  private fb = inject(FormBuilder);
  private airplaneService = inject(AirplaneService);
  private router = inject(Router);

  airplaneForm = this.fb.group({
    tailNumber: ['', [Validators.required, Validators.minLength(3)]],
    model: ['', Validators.required],
    manufacturer: ['', Validators.required],
    capacity: ['', [Validators.required, Validators.min(1)]],
    maintenanceIntervalFlights: ['', [Validators.required, Validators.min(1)]],
    flightsSinceLastMaintenance: ['', [Validators.required, Validators.min(0)]],
    status: ['active']
  });

  isFieldInvalid(fieldName: string): boolean {
    const control = this.airplaneForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onSubmit() {
    if (this.airplaneForm.valid) {
      const newPlaneData = this.airplaneForm.getRawValue();

      this.airplaneService.addAirplane(this.airplaneForm.value).subscribe({
        next: (createdPlane) => {
          console.log('Airplane created successfully:', createdPlane);
          this.router.navigate(['/airplanes', createdPlane.id]);
        },
        error: (err) => {
          alert('Could not save airplane. Error: ' + (err.error?.message || 'Unknown error'));
          console.error('Save error:', err);
        }
      });
    }
  }
}
