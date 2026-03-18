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
    tailNumber: ['', Validators.required],
    model: ['', Validators.required],
    manufacturer: ['', Validators.required],
    capacity: ['', Validators.required],
    maintenanceIntervalFlights: ['', Validators.required],
    flightsSinceLastMaintenance: ['', Validators.required],
    status: ['active']
  });

  onSubmit() {
    if (this.airplaneForm.valid) {
      const formValue = this.airplaneForm.value as any;
      const newPlane = this.airplaneService.addAirplane(formValue);

      this.router.navigate(['/airplanes',newPlane.id]);
    }
  }
}
