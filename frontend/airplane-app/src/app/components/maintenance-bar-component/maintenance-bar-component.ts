import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-maintenance-bar-component',
  imports: [NgClass],
  templateUrl: './maintenance-bar-component.html',
  styleUrl: './maintenance-bar-component.scss',
})
export class MaintenanceBarComponent {
  @Input({ required: true }) interval: number = 100;
  @Input({ required: true }) current: number = 0;
  @Input() status: string = 'active';

  @Output() flightAdded = new EventEmitter<void>();

  get percentage(): number {
    return Math.min((this.current / this.interval) * 100, 100);
  }

  onAddFlight() {
    this.flightAdded.emit();
  }
}
