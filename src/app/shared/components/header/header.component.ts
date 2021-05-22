import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public projectName: string = 'My Reservation';

  public user: any;

  constructor(
    private router: Router,
    private _rs: ReservationService
  ) { }

  ngOnInit(): void {
    this._rs.getProfile().then( resp => {
      this.user = resp;
    });
  }

  goToReservations() {
    this.router.navigate(['/']);
    this._rs.showReservation(true);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
