import { Component, Input, OnInit, OnChanges, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import * as moment from 'moment'

import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDetailComponent implements OnInit, OnChanges {
  @Input() public reservation: Reservation;
  @Output() public response = new EventEmitter();

  public typesOfTour: string[] = ['Basic Plan', 'Full Day', 'Full Day With Pics', 'Buffet', 'All inclusive'];
  public formReserva: FormGroup;
  public today = moment();
  controlHotel = new FormControl();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.reservation == null) {
      this.initForm();
    }
  }

  ngOnChanges(changes) {
    if (changes.reservation && changes.reservation.currentValue) {
      this.initForm();
    }
  }

  public initForm() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const date_until = (this.reservation && this.reservation.valid_until) ? new Date(this.reservation.valid_until) : null;
    const date_from = (this.reservation && this.reservation.valid_from) ? new Date(this.reservation.valid_from) : null;


    this.formReserva = this.fb.group({
      id: [ (this.reservation && this.reservation.id) ?  this.reservation.id : null
      ],
      full_name: [ (this.reservation && this.reservation.full_name) ?  this.reservation.full_name : null,
        [Validators.required]
      ],
      hotel: [ (this.reservation && this.reservation.hotel) ?  this.reservation.hotel : null,
        []
      ],
      person_num: [ (this.reservation && this.reservation.person_num) ?  this.reservation.person_num : null,
        [Validators.required]
      ],
      valid_until: [ (this.reservation && this.reservation.valid_until) ?  date_until : null,
        [Validators.required]
      ],
      valid_from: [ (this.reservation && this.reservation.valid_from) ?  date_from : null,
        [Validators.required]
      ],
      created_at: [ (this.reservation && this.reservation.created_at) ?  this.reservation.created_at : null,
      ],
      plans: [ (this.reservation && this.reservation.plans) ?  this.reservation.plans : null,
      ]
    });

    this.controlHotel.valueChanges.subscribe( res => {
      this.formReserva.controls.hotel.setValue(res);
    });

    if (this.reservation && this.reservation.hotel) {
      this.controlHotel.setValue(this.reservation.hotel);
    }

    this.controlHotel.markAsTouched();
    this.formReserva.markAllAsTouched();
  }

  onSubmit() {
    /**Emit responser for component father handle the reservation */
    this.response.emit({type: 'submit', data: this.formReserva.value});
  }

  cancel () {
    this.formReserva.reset();
    this.controlHotel.reset();
    this.response.emit({type: 'cancel', data: this.formReserva.value});
  }

  selectPlan(event, list) {
    let newPlan = [];

    if (list.length) {
      list.forEach(element => {
        newPlan.push(element.value);
      });
    }

    this.formReserva.controls.plans.setValue(newPlan);
  }
}
