import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router, RouterLink } from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AirplaneService} from '../../services/airplane-service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-airplane-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-airplane-component.html',
  styleUrl: './edit-airplane-component.scss',
})
export class EditAirplaneComponent implements OnInit {
  private fb = inject(FormBuilder);
  private airplaneService = inject(AirplaneService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  airplaneForm: FormGroup;
  airplaneId: string | null = null;
  isLoading: boolean = false;
  isSaving: Boolean = false;
  errorMessage: string = '';

  constructor() {
    this.airplaneForm = this.fb.group({
      tailNumber: ['', [Validators.required, Validators.minLength(4)]],
      model: ['', Validators.required],
      manufacturer: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.airplaneId = this.route.snapshot.paramMap.get('id');
    if (this.airplaneId) {
      this.loadAirplaneData(this.airplaneId);
    }
  }

  loadAirplaneData(id: string) {
    this.isLoading = true;
    this.airplaneService.getById(id).subscribe({
      next: (data) => {
        this.airplaneForm.patchValue(data);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Plane cannot be found in the system';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit() {
    if (this.airplaneForm.valid && this.airplaneId) {
      this.isSaving = true;
      this.airplaneService.updateAirplane(this.airplaneId, this.airplaneForm.value).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/airplanes', this.airplaneId]);
        },
        error: (err) => {
          this.errorMessage = 'Failed to save changes';
          this.cdr.detectChanges();
          this.isSaving = false;
          alert(this.errorMessage);
        },
      });
    }
  }

  onCancel(): void {
    if (this.airplaneId) {
      this.router.navigate(['/airplanes', this.airplaneId]);
    } else {
      this.router.navigate(['/airplanes']);
    }
  }
}
