import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public projectName: string = 'My Reservation - Test';

  public user: any = {
    first_name: 'Josefina',
    last_name: 'Montilla',
    rut: '27.488.613-7',
    email: 'jjmmontilla@gmail.com',
    linkedin: 'www.linkedin.com/in/josefina-johana-montilla-medina-609b5955',
    skills: ['Angular', 'Javascritp', 'jQuery', 'Ruby on Rails', 'CSS3', 'SASS', 'HTML', 'GIT', 'MySQL', 'Bootstrap', 'Material', 'MongoDB']
  }
  constructor() { }

  ngOnInit(): void {
  }

}
