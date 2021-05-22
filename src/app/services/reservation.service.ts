import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private list: Reservation[] = [
    { id: 1,
      full_name: 'Jeff White',
      hotel: '',
      person_num: 2,
      created_at: '2021-01-20 13:05:00',
      valid_from: '2021-01-20 13:05:00',
      valid_until: '2021-02-12 13:05:00',
      tours: null
    },
    { id: 2,
      full_name: 'Paul Smith',
      hotel: 'Marriot',
      person_num: 2,
      created_at: '2021-03-20 13:05:00',
      valid_from: '2021-03-20 13:05:00',
      valid_until: '2021-11-22 13:05:00',
      tours: ['Basic Plan', 'Buffet']
    },
    { id: 3,
      full_name: 'Karen Ash',
      hotel: '',
      person_num: 2,
      created_at: '2021-04-20 13:05:00',
      valid_from: '2021-04-20 13:05:00',
      valid_until: '2021-09-22 13:05:00',
      tours: null
    },
    { id: 4,
      full_name: 'Sarah Wallie',
      hotel: '',
      person_num: 2,
      created_at: '2021-05-01 13:05:00',
      valid_from: '2021-05-01 13:05:00',
      valid_until: '2021-05-13 13:05:00',
      tours: ['Full Day', 'Full Day With Pics']
    }
  ];

  private hotels: any[] = [
    {
      name: 'Marriot',
      title: 'Sweet Drems',
      profile: 'https://cf.bstatic.com/xdata/images/hotel/max300/220008622.webp?k=e938a6e0f7b175bf89c1b86a834512943ed1dc6e04fa4faa40ea52335bc0d993&o=',
      banner: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/112486687.webp?k=92d57c0b4d6b92f6c49191a2b79e3b732040de68d5ab55fda673ac64b7277bcb&o=',
      description:'Zhejiang Taizhou Marriott Hotel offers accommodation in Huangyan. The common areas combine earth tones with natural elements and are decorated with warm lighting. There is also a restaurant.'
    },
    {
      name: 'DoubleTree by Hilton',
      title: 'Santiago',
      profile: 'https://cf.bstatic.com/xdata/images/hotel/max300/247597455.webp?k=27e10c586a685b2441c3610dcfb8da90033ff32690f9264e3d67cd6f28f389af&o=',
      banner: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/247599796.webp?k=7f0d21476027acb1bd5d3bd68842a923b3321d9f7b34ae1ba209c43378741a51&o=',
      description:'l DoubleTree by Hilton Santiago - Vitacura, located in Santiago, offers accommodation, a fitness center, restaurant and high-speed Wi-Fi. The rooms have a flat-screen TV, a private bathroom with free toiletries and a hairdryer, a minibar, a telephone, an ironing board and a safe.'
    },
    {
      name: 'AC Hotel by Marriott',
      title: 'Santiago Costanera Center',
      profile: 'https://cf.bstatic.com/xdata/images/hotel/max500/282191099.webp?k=5b6989fb4a21d9a88ca443c0b5f1172a9ec5627ff2e2833ab1a468856566e1ba&o=',
      banner: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/250392989.webp?k=d0df002b863d536656d91796f1676699642169fa3fd1f492f40bf35c0d86dc29&o=',
      description:'Located in Santiago, AC Hotel by Marriott Santiago Costanera Center features a restaurant, bar, common lounge, and fitness center. It is less than 1 km from Costanera Center complex, 2.8 km from Santiago cable car and 2.9 km from Santiago Bicentennial Park. There is a 24-hour front desk, a business center and luggage storage.'
    }
  ];

  public reservations = new Subject<Reservation[]>();

  constructor() { }

  public getReservations(){
    let p = new Promise( (resolve, reject) => {
      setTimeout(() => {
        resolve(this.list);
      }, Math.floor(Math.random() * 300));
    });

    return p
  }

  public getHotels(){
    let p = new Promise( (resolve, reject) => {
      setTimeout(() => {
        resolve(this.hotels);
      }, Math.floor(Math.random() * 500));
    });

    return p
  }

  public deleteReservation(reserva) {
    let p = new Promise( (resolve, reject) => {
      setTimeout(() => {
        this.list = this.list.filter( x => x.id != reserva.id);
        this.reservations.next(this.list);
        resolve(this.list);
      }, Math.floor(Math.random() * 500));
    });

    return p
  }

  public editReservation(reserva) {
    let p = new Promise( (resolve, reject) => {
      setTimeout(() => {

        this.list.forEach((element, index) => {
          if (element.id == reserva.id) {
            this.list[index]= reserva;
            this.reservations.next(this.list);
          }
        });

        resolve(true);

      }, Math.floor(Math.random() * 600));
    });

    return p
  }

  public addReservation(reserva) {
    let p = new Promise( (resolve, reject) => {
      setTimeout(() => {

        this.list = [reserva].concat(this.list)
        this.reservations.next(this.list);
        resolve(true);
      }, Math.floor(Math.random() * 600));
    });

    return p
  }
}
