import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {AirplaneService} from '../../services/airplane-service';
import {Airplane} from '../../models/airplane';
import { TailNumberPipe } from '../../pipes/tail-number-pipe';
import { RouterLink } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-airplane-list',
  imports: [TailNumberPipe, RouterLink, NgClass, CommonModule],
  templateUrl: './airplane-list.html',
  styleUrl: './airplane-list.scss',
})
export class AirplaneList {
  airplanes: Airplane[] = [];
  isLoading:boolean = false;
  errorMessage:string = "";
  private airplaneService: AirplaneService = inject(AirplaneService);
  private authService: AuthService = inject(AuthService);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(){this.fetchAirplanes();}

  fetchAirplanes():void{
    this.isLoading = true;
    this.errorMessage = '';

    this.airplaneService.getAirplanes().subscribe({
      next: (data) => {
        this.airplanes = data;
        this.isLoading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load airplanes. Please check if everything is correct and the server is running';
        this.isLoading = false;
        console.error('HTTP error: ',error);
        this.cdr.detectChanges();
      }
    });
  }

  onLogout():void{
    this.authService.logout();
  }
}
