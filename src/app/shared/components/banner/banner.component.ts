import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() public title: string;
  @Input() public showBtn : boolean = false;
  constructor(public _rs: ReservationService) { }

  ngOnInit(): void {
  }

}
