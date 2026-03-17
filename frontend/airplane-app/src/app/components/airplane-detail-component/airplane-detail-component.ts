import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AirplaneService } from '../../services/airplane-service';
import {Airplane} from '../../models/airplane';
import {TailNumberPipe} from '../../pipes/tail-number-pipe';

@Component({
  selector: 'app-airplane-detail-component',
  imports: [RouterLink, TailNumberPipe],
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
}
