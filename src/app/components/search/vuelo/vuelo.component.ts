import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';

@Component({
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styleUrls: ['./vuelo.component.sass'],
})
export class VueloComponent implements OnInit {
  claseVuelo: any[] = [];

  constructor(private headerMenuService: HeaderMenuService) {
    let clase1 = { value: 'ECO', viewValue: 'Economica' };
    let clase2 = { value: 'ECO', viewValue: 'Economica' };
    let clase3 = { value: 'ECO', viewValue: 'Economica' };
    this.claseVuelo.push(clase1);
    this.claseVuelo.push(clase2);
    this.claseVuelo.push(clase3);

    this.headerMenuService.getMenuImage(3);
  }

  ngOnInit(): void {}
}
