import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';

@Component({
  selector: 'app-vuelo-hotel',
  templateUrl: './vuelo-hotel.component.html',
  styleUrls: ['./vuelo-hotel.component.sass'],
})
export class VueloHotelComponent implements OnInit {
  constructor(private headerMenuService: HeaderMenuService) {
    this.headerMenuService.getMenuImage(2);
  }

  ngOnInit(): void {}
}
