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
  selector: 'app-hotelx',
  templateUrl: './hotelx.component.html',
  styleUrls: ['./hotelx.component.sass'],
})
export class HotelxComponent implements OnInit {
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
    this.headerMenuService.getMenuImage(4);
    this.personas = 2;
  }

  ngOnInit(): void {
    this.headerMenuService.getMenuImage(4);
    this.origins = [];
    this.minCalendar.setDate(this.minCalendar.getDate() + 1);
    this.getPriorityAirports();
  }

  ngAfterViewInit() {
    this.headerMenuService.getMenuImage(4);
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
          });
          this.origins.sort((a, b) => b.priority - a.priority);
        }
      },
      (err) => {
        /*   console.log('Error: ', err); */
      },
      () => {
        //console.log('resultado: ' + JSON.stringify(this.origins));
        this.headerMenuService.getMenuImage(4);

        this.filteredOptionsOrigen = this.myControlOrigen.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.origins.slice()))
        );

        //this.spinner.hide();

        this.getAirports();
      }
    );
  }

  getAirports() {
    //this.spinner.show();
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
        this.spinner.hide();
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
    const filter = {
      from: null,
      to: this.origen,
      departureDate: this.matDateOrigen.toISOString(),
      returnDate: this.matDateDestino.toISOString(),
      rooms: 1,
      roomMod: [
        { adults: this.personas, children: 0, ages: [], passengers: [] },
      ],
      passengers: this.personas,
      lBoard: [],
      lZone: [],
      lTripAdvisor: [],
      lSupplier: [],
      lRating: [],
      firstItem: '1',
    };

    console.log(JSON.stringify(filter));

    window.open(
      environment.urlVacaFacade + '4/' + JSON.stringify(filter),
      '_blank'
    );
  }
}
