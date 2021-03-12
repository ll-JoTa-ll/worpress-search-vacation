import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.sass'],
})
export class HotelComponent implements OnInit {
  constructor(private headerMenuService: HeaderMenuService) {
    this.headerMenuService.getMenuImage(4);
  }

  ngOnInit(): void {}
}
