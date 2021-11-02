import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';
import { PachageService } from '../../../services/pachage.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlightService } from 'src/app/services/flight.service';
import { ConstantService } from 'src/app/services/constant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var jquery: any;
declare var $: any;

interface ResultSearch {
  id: string;
  type: string;
  name: string;
}

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.sass'],
})
export class PaquetesComponent implements OnInit, AfterViewInit {
  selectedDestiny: boolean;
  destiny: ResultSearch;
  loadingmonths: boolean;
  arrayMonths: number[];
  monthsData;
  monthsTypes = [];
  monthControl = new FormControl('');
  resultSearch: ResultSearch[];
  myControl = new FormControl('');
  destinies: ResultSearch[];
  filteredOptions: Observable<any[]>;
  filteredOptionsOrigen: Observable<any[]>;
  filteredOptionsDestino: Observable<any[]>;
  origins: any[] = [];
  destinys: any[] = [];
  myControlOrigen = new FormControl('');
  myControlDestino = new FormControl('');
  monthTypes = [
    {
      code: 0,
      name: 'Incluir todos los meses',
    },
    {
      code: 1,
      name: 'Enero',
    },
    {
      code: 2,
      name: 'Febrero',
    },
    {
      code: 3,
      name: 'Marzo',
    },
    {
      code: 4,
      name: 'Abril',
    },
    {
      code: 5,
      name: 'Mayo',
    },
    {
      code: 6,
      name: 'Junio',
    },
    {
      code: 7,
      name: 'Julio',
    },
    {
      code: 8,
      name: 'Agosto',
    },
    {
      code: 9,
      name: 'Setiembre',
    },
    {
      code: 10,
      name: 'Octubre',
    },
    {
      code: 11,
      name: 'Noviembre',
    },
    {
      code: 12,
      name: 'Diciembre',
    },
  ];

  constructor(
    private headerMenuService: HeaderMenuService,
    private pachageService: PachageService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private flightService: FlightService,
    private sesion: ConstantService,
    private snackBar: MatSnackBar
  ) {
    this.headerMenuService.getMenuImage(1);
  }

  ngOnInit(): void {
    this.headerMenuService.getMenuImage(1);
    this.monthsData = [
      {
        code: '',
        name: 'Elijamos juntos',
      },
    ];
    //this.monthControl.value = '';
    let dest = this.sesion.getDestinos();
    if (dest != null) {
        this.destinies = dest;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.destinies.slice()))
        );
    } else {
      this.getDestination();
    }
    
    this.origins = this.sesion.getOrigins();
    if (!this.origins || this.origins.length === 0) {
      this.origins = [];
      this.getPriorityAirports();
    }
  }

  ngAfterViewInit() {
    //this.getMenuImage(1);
    this.headerMenuService.getMenuImage(1);
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
        this.sesion.setOrigins(this.origins);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }


  getDestination() {
    this.pachageService.getDestinies().subscribe(
      (result: any) => {
        if (result.confirmation) {
          this.sesion.setDestinos(result.data);
          this.destinies = result.data;
          console.log('this.destinies');
          console.log(this.destinies);
        }
      },
      (err) => {},
      () => {
        this.headerMenuService.getMenuImage(1);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.destinies.slice()))
        );
      }
    );
  }

  private _filter(value: string): ResultSearch[] {
    const filterValue = value.toLowerCase();
    return this.destinies.filter(
      //(option) => option.name.toLowerCase().indexOf(filterValue) === 0
      function (option) {
        return option.name.toLowerCase().indexOf(filterValue) >= 0;
      }
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const item = event.option.value as ResultSearch;
    this.selectedDestiny = true;
    this.destiny = item;
    this.pachageService.getMonths(item.id, item.type).subscribe(
      (result: any) => {
        if (result.confirmation) {
          this.arrayMonths = result.data;
        } else {
          this.arrayMonths = [];
        }
      },
      (err) => {},
      () => {
        if (this.arrayMonths && this.arrayMonths.length > 0) {
          this.arrayMonths.unshift(0);
          this.monthsData = this.monthTypes.filter((task) =>
            this.arrayMonths.includes(task.code)
          );
        }
        this.monthControl.setValue(0);
      }
    );
  }

  display(item?: ResultSearch): string | undefined {
    return item ? item.name : undefined;
  }

  onFocus() {
    this.resultSearch = this.destinies;
  }

  validCampos(){
    let valid = true;
   if(this.myControl.value === ''){
    this.openSnackBar('Campos incompletos');
    valid = false;
   }
   return valid;
  }

  onSelectMonth(month) {}

  search() {

    let datos = this.validCampos();
    if (datos === false) {
      return;
    } else {
      if (this.destiny && this.destiny.id) {
        const filter = {
          location: this.destiny,
          date: this.monthControl.value,
          months: this.arrayMonths,
        };
  
        console.log('JSON.stringify(filter)');
        console.log(JSON.stringify(filter));
  
        console.log('filter');
        console.log(filter);
  
        window.open(
          environment.urlVacaFacade + '1/' + JSON.stringify(filter),
          '_blank'
        );
  
        //this.router.navigate(['result']);
      } else {
        //this.openSnackBar('Seleccione un destino');
      }
    }
    

   
  }

  getMenuImage(index) {
    console.log('getMenuImage: ' + index);

    $('#menu_paqueteSel').hide();
    $('#menu_vueloHotelSel').hide();
    $('#menu_vueloSel').hide();
    //$('#menu_hotelSel').hide();
    $('#menu_paqueteDes').show();
    $('#menu_vueloHotelDes').show();
    $('#menu_vueloDes').show();
    //$('#menu_hotelSel').hide();
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
