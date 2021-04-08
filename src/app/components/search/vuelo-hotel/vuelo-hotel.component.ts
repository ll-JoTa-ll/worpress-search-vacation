import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-vuelo-hotel',
  templateUrl: './vuelo-hotel.component.html',
  styleUrls: ['./vuelo-hotel.component.sass'],
})
export class VueloHotelComponent implements OnInit {
  origins: any[] = [];
  destinys: any[] = [];
  myControlOrigen = new FormControl('');
  myControlDestino = new FormControl('');
  selectedOrigen: boolean;
  selectedDestino: boolean;
  origen;
  destino;
  filteredOptionsOrigen: Observable<any[]>;
  filteredOptionsDestino: Observable<any[]>;
  minCalendar = new Date();
  minEndDate = new Date();
  tipoVuelo;
  fromFilter: any[] = [];
  toFilter: any[] = [];
  dateFilter: any[] = [];

  @ViewChild('dpEndDeparture', { read: undefined, static: false })
  endDatePicker: MatDatepicker<Date>;

  inMaleta: boolean;

  matDateOrigen;
  matDateDestino;

  constructor(
    private headerMenuService: HeaderMenuService,
    private flightService: FlightService,
    private spinner: NgxSpinnerService
  ) {
    this.headerMenuService.getMenuImage(2);
  }

  ngOnInit(): void {
    this.origins = [];
    this.minCalendar.setDate(this.minCalendar.getDate() + 1);
    this.tipoVuelo = 'RT';
    this.getPriorityAirports();
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.origins.filter(
      //(option) => option.name.toLowerCase().indexOf(filterValue) === 0
      function (option) {
        return option.searchName.toLowerCase().indexOf(filterValue) >= 0;
      }
    );
  }

  //CityAirport/GetCityAirport?priority=false
  getPriorityAirports() {
    this.spinner.show();
    this.flightService.getPriorityAirports().subscribe(
      (result: any) => {
        /* console.log(result); */
        if (result) {
          const airports = result.lairports ? result.lairports : [];
          const cities = result.lcities ? result.lcities : [];
          airports.forEach((airport) => {
            this.origins.push({
              code: airport.iataCode,
              countryCode: airport.countryCode,
              name: airport.name,
              searchName: airport.searchName,
              priority: airport.priority,
              /* icon: 'local_airport' */
              icon: 'A',
            });
            this.destinys.push({
              code: airport.iataCode,
              countryCode: airport.countryCode,
              name: airport.name,
              searchName: airport.searchName,
              priority: airport.priority,
              /* icon: 'local_airport' */
              icon: 'A',
            });
          });
          cities.forEach((city) => {
            this.origins.push({
              code: city.iataCode,
              countryCode: city.countryCode,
              name: city.name,
              searchName: city.searchName,
              priority: city.priority,
              /* icon: 'location_city' */
              icon: 'C',
            });
            this.destinys.push({
              code: city.iataCode,
              countryCode: city.countryCode,
              name: city.name,
              searchName: city.searchName,
              priority: city.priority,
              /* icon: 'location_city' */
              icon: 'C',
            });
          });
          this.origins.sort((a, b) => b.priority - a.priority);
          this.destinys.sort((a, b) => b.priority - a.priority);
        }
      },
      (err) => {
        /*   console.log('Error: ', err); */
      },
      () => {
        //console.log('resultado: ' + JSON.stringify(this.origins));

        this.filteredOptionsOrigen = this.myControlOrigen.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.origins.slice()))
        );

        this.filteredOptionsDestino = this.myControlDestino.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.destinys.slice()))
        );

        this.spinner.hide();

        //this.getAirports();
      }
    );
  }

  getAirports() {
    this.spinner.show();
    const _origins = [];
    this.flightService.getAirports().subscribe(
      (result: any) => {
        if (result) {
          const airports = result.lairports ? result.lairports : [];
          const cities = result.lcities ? result.lcities : [];
          airports.forEach((airport) => {
            _origins.push({
              code: airport.iataCode,
              countryCode: airport.countryCode,
              name: airport.name,
              searchName: airport.searchName,
              priority: airport.priority,
              /* icon: 'local_airport' */
              icon: 'A',
            });
          });
          cities.forEach((city) => {
            _origins.push({
              code: city.iataCode,
              countryCode: city.countryCode,
              name: city.name,
              searchName: city.searchName,
              priority: city.priority,
              /* icon: 'location_city' */
              icon: 'C',
            });
          });
          _origins.sort((a, b) => b.priority - a.priority);
        }
      },
      (err) => {
        /*  console.log('Error: ', err); */
      },
      () => {
        this.origins = _origins;
        //this.sessionService.setOrigins(this.origins);
        this.filteredOptionsOrigen = this.myControlOrigen.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.origins.slice()))
        );
        this.spinner.hide();
      }
    );
  }

  display(item): string | undefined {
    return item ? item.name : undefined;
  }

  onOptionSelectedOrigen(event: MatAutocompleteSelectedEvent) {
    console.log('onOptionSelectedOrigen');
    const item = event.option.value;
    this.selectedOrigen = true;
    this.origen = item;
    console.log('item: ' + JSON.stringify(item));
  }

  onOptionSelectedDestino(event: MatAutocompleteSelectedEvent) {
    console.log('onOptionSelectedDestino');
    const item = event.option.value;
    this.selectedDestino = true;
    this.destino = item;
    console.log('item: ' + JSON.stringify(item));
  }

  onBeginDateChange1(event) {
    console.log('onBeginDateChange1');
    console.log('event: ' + event);
    console.log(this.matDateOrigen.toISOString());
  }

  onBeginDateChange2(event) {
    console.log('onBeginDateChange2');
    console.log('event: ' + event);
    console.log(this.matDateDestino.toISOString());
  }

  search() {
    const filter = {
      from: this.origen,
      to: this.destino,
      departureDate: this.matDateOrigen.toISOString(),
      returnDate: this.matDateDestino.toISOString(),
      rooms: [{ adults: 2, children: 0, ages: [], passengers: [] }],
      lBoard: [],
      lZone: [],
      lTripAdvisor: [],
      lSupplier: [],
      lRating: [],
      firstItem: '1',
    };

    console.log(JSON.stringify(filter));

    //return false;

    window.open(
      environment.urlVacaFacade + '2/' + JSON.stringify(filter),
      '_blank'
    );
  }
}
