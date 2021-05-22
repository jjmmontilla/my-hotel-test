import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  /** Variable for user Data */
  public user: any;

  constructor(
    private router: Router,
    public _rs: ReservationService
  ) { }

  ngOnInit(): void {
    this._rs.getProfile().then( resp => {
      this.user = resp;
    });
  }

  backHome () {
    this.router.navigate(['/']);
  }

}
