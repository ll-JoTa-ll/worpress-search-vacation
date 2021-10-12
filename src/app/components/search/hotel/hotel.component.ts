import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';
import { environment } from '../../../../environments/environment';
import { FlightService } from '../../../services/flight.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatDatepickerInputEvent,
  MatDatepicker,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.sass'],
})
export class HotelComponent implements OnInit, AfterViewInit {
  origins: any[] = [];
  myControlOrigen = new FormControl('');
  selectedOrigen: boolean;
  origen;
  filteredOptionsOrigen: Observable<any[]>;
  minCalendar = new Date();
  minEndDate = new Date();

  constructor(
    private headerMenuService: HeaderMenuService,
    private flightService: FlightService,
    private spinner: NgxSpinnerService
  ) {
    console.log('app-hotel constructor');
    this.headerMenuService.getMenuImage(4);
  }

  ngOnInit(): void {
    console.log('app-hotel ngOnInit');
    this.headerMenuService.getMenuImage(4);
  }

  ngAfterViewInit() {
    console.log('app-hotel ngAfterViewInit');
    this.headerMenuService.getMenuImage(4);
  }
}
