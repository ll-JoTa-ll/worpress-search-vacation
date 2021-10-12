import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  paqueteSel: boolean = false;
  paqueteDes: boolean = true;
  vueloHotelSel: boolean = false;
  vueloHotelDes: boolean = true;
  vueloSel: boolean = false;
  vueloDes: boolean = true;
  hotelSel: boolean = false;
  hotelDes: boolean = true;

  constructor(
    private headerMenuService: HeaderMenuService,
    private router: Router
  ) {
    //this.vueloSel = true;
    console.log('HeaderComponent constructor');
  }

  ngOnInit(): void {
    console.log('HeaderComponent ngOnInit');
  }

  ngAfterViewInit() {
    console.log('HeaderComponent ngAfterViewInit');
    //this.cambiarMenu(3);
  }

  cambiarMenu(index) {
    console.log('cambiarMenu: ' + index);

    $('#menu_paqueteSel').hide();
    $('#menu_vueloHotelSel').hide();
    $('#menu_vueloSel').hide();
    $('#menu_hotelSel').hide();
    $('#menu_paqueteDes').show();
    $('#menu_vueloHotelDes').show();
    $('#menu_vueloDes').show();
    $('#menu_hotelDes').show();
    switch (index) {
      case 1:
        console.log('menu 1: paquetes');
        $('#menu_paqueteSel').show();
        $('#menu_paqueteDes').hide();
        this.router.navigate(['/paquetes']);
        break;
      case 2:
        console.log('menu 2: vuelo+hotel');
        $('#menu_vueloHotelSel').show();
        $('#menu_vueloHotelDes').hide();
        this.router.navigate(['/vuelo-hotel']);
        break;
      case 3:
        console.log('menu 3: vuelos');
        $('#menu_vueloSel').show();
        $('#menu_vueloDes').hide();
        this.router.navigate(['/vuelo']);
        break;
      case 4:
        console.log('menu 4: hotel');
        $('#menu_hotelSel').show();
        $('#menu_hotelDes').hide();
        this.router.navigate(['/hotel']);
        break;
    }
  }
}
