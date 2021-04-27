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
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styleUrls: ['./vuelo.component.sass'],
})
export class VueloComponent implements OnInit, AfterViewInit {
  claseVuelo: any[] = [];
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

  personas;
  cabinType;

  constructor(
    private headerMenuService: HeaderMenuService,
    private flightService: FlightService,
    private spinner: NgxSpinnerService
  ) {
    let clase1 = { value: 'ECO', viewValue: 'Economica' };
    let clase2 = { value: 'ECO', viewValue: 'Economica' };
    let clase3 = { value: 'ECO', viewValue: 'Economica' };
    this.claseVuelo.push(clase1);
    this.claseVuelo.push(clase2);
    this.claseVuelo.push(clase3);
    this.personas = 2;
    this.cabinType = '';
    this.headerMenuService.getMenuImage(3);
  }

  ngOnInit(): void {
    this.headerMenuService.getMenuImage(3);
    this.origins = [];
    this.minCalendar.setDate(this.minCalendar.getDate() + 1);
    this.tipoVuelo = 'RT';
    this.getPriorityAirports();
  }

  ngAfterViewInit() {
    this.headerMenuService.getMenuImage(3);
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
        this.headerMenuService.getMenuImage(3);

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

  /*
  onBeginDateChange(event: MatDatepickerInputEvent<Date>) {
    if (this.tipoVuelo == 'RT') {
      if (this.form.controls.endDate.value) {
        if (
          new Date(this.form.controls.beginDate.value) >
          new Date(this.form.controls.endDate.value)
        ) {
          this.form.controls.endDate.setValue('');
        }
      }
      this.minEndDate = this.form.controls.beginDate.value;

      if (!this.form.controls.endDate.value) {
        this.endDatePicker.open();
      }
    }
  }
  */

  onBeginDateChange1(event) {
    console.log('onBeginDateChange1');
    console.log('event: ' + event);
    console.log(this.matDateOrigen.toISOString());
    this.minEndDate = this.matDateOrigen;
    this.endDatePicker.open();
  }

  onBeginDateChange2(event) {
    console.log('onBeginDateChange2');
    console.log('event: ' + event);
    console.log(this.matDateDestino.toISOString());
  }

  search() {
    let fromFilter = this.fromFilter;
    let toFilter = this.toFilter;
    let dateFilter = this.dateFilter;

    if (this.tipoVuelo == 'RT') {
      fromFilter.push(this.origen);
      fromFilter.push(this.destino);
      toFilter.push(this.destino);
      toFilter.push(this.origen);

      dateFilter.push(this.matDateOrigen.toISOString());
      dateFilter.push(this.matDateDestino.toISOString());
    }

    if (this.tipoVuelo == 'OW') {
      fromFilter.push(this.origen);
      toFilter.push(this.destino);

      dateFilter.push(this.matDateOrigen.toISOString());
    }

    if (this.tipoVuelo == 'MC') {
    }

    const cabinType = this.cabinType;
    let cabinTypeText = 'Todas';
    switch (cabinType) {
      case '':
        cabinTypeText = 'Todas';
        break;
      case 'E':
        cabinTypeText = 'Económica';
        break;
      case 'B':
        cabinTypeText = 'Business';
        break;
      case 'F':
        cabinTypeText = 'First';
        break;
    }

    const filter = {
      Ocompany: null,
      PartnerClub: false,
      type: this.tipoVuelo,
      lpassenger: [
        { numberPassenger: this.personas, typePassenger: 'ADT' },
        { numberPassenger: '0', typePassenger: 'CNN' },
        { numberPassenger: '0', typePassenger: 'INF' },
      ],
      cabinType: { id: cabinType, description: cabinTypeText },
      scales: { id: '', description: 'Todos' },
      includesBaggage: this.inMaleta,
      fromFilter: fromFilter,
      toFilter: toFilter,
      dateFilter: dateFilter,
    };

    console.log(JSON.stringify(filter));

    //return false;

    window.open(
      environment.urlVacaFacade + '3/' + JSON.stringify(filter),
      '_blank'
    );
  }

  searchV2() {
    const cb0 = {
      id: '',
      description: 'Todas',
    };

    const cb1 = {
      id: 'E',
      description: 'Económica',
    };

    const cb2 = {
      id: 'B',
      description: 'Business',
    };

    const cb3 = {
      id: 'F',
      description: 'First',
    };

    const data = {
      Ocompany: null,
      PartnerClub: false,
      type: 'OW',
      lpassenger: [
        { numberPassenger: '1', typePassenger: 'ADT' },
        { numberPassenger: '0', typePassenger: 'CNN' },
        { numberPassenger: '0', typePassenger: 'INF' },
      ],
      cabinType: { id: '', description: 'Todas' },
      scales: { id: '', description: 'Todos' },
      includesBaggage: true,
      fromFilter: [
        {
          code: 'LIM',
          countryCode: 'PE',
          name: '[LIM] - Jorge Chavez International - LIM - Lima - Peru',
          searchName:
            'LIM-Lima-Jorge Chavez International-J Chavez Intl-Peru-Perú-Peruu-Perù-Pê ru-Pérou',
          priority: 2,
          icon: 'A',
        },
      ],
      toFilter: [
        {
          code: 'AQP',
          countryCode: 'PE',
          name: '[AQP] - Rodriguez Ballon - AQP - Arequipa - Peru',
          searchName:
            'AQP-Arequipa-Rodriguez Ballon-Peru-Perú-Peruu-Perù-Pê ru-Pérou',
          priority: 1,
          icon: 'A',
        },
      ],
      dateFilter: ['2021-06-17T05:00:00.000Z'],
    };
  }
}
