import { Component, Input, OnChanges, OnInit, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ReservationService } from 'src/app/services/reservation.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() public reservationData: Reservation[] = [];
  @Output() public response = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public showForm: boolean = false;
  public infoEdit: Reservation;

  public dataSource;
  public displayedColumns: string[] = ['id', 'full_name', 'hotel', 'person_num', 'created_at', 'valid_until', 'options'];

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _rs: ReservationService
  ) { }

  ngOnInit(): void {
    this._rs.reservations.subscribe( resp => {
      this.reservationData = resp;
      this.dataSource = new MatTableDataSource(this.reservationData);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes) {
    if (changes.reservationData && changes.reservationData.currentValue) {
      this.dataSource = new MatTableDataSource(this.reservationData);
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public edit(reserva, index) {
    this.infoEdit = reserva;
    this.showForm = true;
    this.response.emit({type: 'edit', data: true});
  }

  /**
   * @param Item to be removed
   * @returns Reservation[]
   *  */
  public delete(reserva) {
    const html = `
    <p class="text-xl text-center text-danger"><i class="fas fa-exclamation-triangle"></i></p>
    <p class="text-center mb-0">Are you sure you want to delete this item? </p>
    <p class="text-danger text-center">This operation cannot be undone </p>`;

    const content = {
      title: '',
      content: html,
      classContainerBtn: 'd-flex justify-content-end width-100',
      buttons: [
        { title: 'Cancel', response: 'close', class: 'btn-cancel'},
        { title: 'DELETE', response: 'OK', class: 'mat-warn'}
      ]
    };
    const dialogRef = this.dialog.open(DialogComponent, {data: content, height: 'auto', width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'OK') {
        this._rs.deleteReservation(reserva).then( res => {
          this.toastr.success('Delete successfully.!')
        });
      }
    });

  }

  public newReserva() {
    this.infoEdit = null;
    this.showForm = true;
  }

  handleForm(event) {
    console.log('------', event);

    if (event)  {
      if (this.infoEdit == null) {
        let formData = event.data;
        formData['id'] = this.reservationData.length;

        this._rs.addReservation(formData).then(resp => {
          this.toastr.success('Created Successfully.!');
        });
        this.showForm = !this.showForm;

      } else {

        this._rs.editReservation(event.data).then( resp => {
          this.toastr.success('Updated Successfully.!');
        });
        this.showForm = !this.showForm;
      }
    }

  }

  isValidReserva(reserva) {
    let isvalid = false;
    if (moment().isBetween(reserva.valid_from, reserva.valid_until)) {
      isvalid = true;
    }
    return isvalid;
  }

}
