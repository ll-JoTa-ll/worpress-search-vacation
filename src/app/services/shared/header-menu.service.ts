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
    $('#menu_hotelSel').hide();
    switch (index) {
      case 1:
        $('#menu_paqueteSel').show();
        $('#menu_paqueteDes').hide();
        break;
      case 2:
        $('#menu_vueloHotelSel').show();
        $('#menu_vueloHotelDes').hide();
        break;
      case 3:
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
