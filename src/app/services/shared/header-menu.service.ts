import { Injectable } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class HeaderMenuService {
  constructor() {}

  getMenuImage(index) {
    console.log('getMenuImage: ' + index);

    $('#menu_paqueteSel').hide();
    $('#menu_vueloHotelSel').hide();
    $('#menu_vueloSel').hide();
    $('#menu_paqueteDes').show();
    $('#menu_vueloHotelDes').show();
    $('#menu_vueloDes').show();
    switch (index) {
      case 1:
        console.log('menu 1: paquetes');
        $('#menu_paqueteSel').show();
        $('#menu_paqueteDes').hide();
        break;
      case 2:
        console.log('menu 2: vuelo+hotel');
        $('#menu_vueloHotelSel').show();
        $('#menu_vueloHotelDes').hide();
        break;
      case 3:
        console.log('menu 3: vuelos');
        $('#menu_vueloSel').show();
        $('#menu_vueloDes').hide();
        break;
      case 4:
        $('#menu_hotelSel').show();
        $('#menu_hotelDes').hide();
        break;
    }
  }
}
