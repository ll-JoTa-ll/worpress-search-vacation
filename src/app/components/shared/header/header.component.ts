import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  paqueteSel: boolean = false;
  paqueteDes: boolean = true;
  vueloHotelSel: boolean = false;
  vueloHotelDes: boolean = true;
  vueloSel: boolean = false;
  vueloDes: boolean = true;
  hotelSel: boolean = false;
  hotelDes: boolean = true;

  constructor(private headerMenuService: HeaderMenuService) {
    //this.vueloSel = true;
  }

  ngOnInit(): void {}

  cambiarMenu(index) {}
}
