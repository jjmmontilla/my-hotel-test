import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-container',
  templateUrl: './reservation-container.component.html',
  styleUrls: ['./reservation-container.component.scss']
})
export class ReservationContainerComponent implements OnInit, OnDestroy {
  /**Variable with reservation information */
  public rData: Reservation[];
  /**Variable for show reserva list */
  public showList: boolean = false;

  /**Variable for list of hotels */
  public hotelData: any[];

  constructor(
    private toastr: ToastrService,
    private _rs: ReservationService
  ) { }

  ngOnInit(): void {
    this._rs.getReservations().then( (resp: Reservation[]) => {
      this.rData = resp;
    });

    this._rs.getHotels().then( (resp :any) => {
      this.hotelData = resp;
    });

    this._rs.showReserva.subscribe( resp => {
      this.showList = true;
    });
  }

  addWishlit(hotel) {
    hotel.like = (hotel.like)? false : true;
    if (hotel.like) {
      this.toastr.success('Added to my wishlist', hotel.name);
    } else {
      this.toastr.success('Removed successfully', hotel.name);
    }
  }

  ngOnDestroy() {
  }

}
