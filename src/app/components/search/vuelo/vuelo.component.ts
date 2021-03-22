import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';
import { environment } from '../../../../environments/environment';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styleUrls: ['./vuelo.component.sass'],
})
export class VueloComponent implements OnInit {
  claseVuelo: any[] = [];
  origins = [];

  constructor(
    private headerMenuService: HeaderMenuService,
    private flightService: FlightService
  ) {
    let clase1 = { value: 'ECO', viewValue: 'Economica' };
    let clase2 = { value: 'ECO', viewValue: 'Economica' };
    let clase3 = { value: 'ECO', viewValue: 'Economica' };
    this.claseVuelo.push(clase1);
    this.claseVuelo.push(clase2);
    this.claseVuelo.push(clase3);

    this.headerMenuService.getMenuImage(3);
  }

  ngOnInit(): void {
    this.origins = [];
    this.getPriorityAirports();
  }

  //CityAirport/GetCityAirport?priority=false
  getPriorityAirports() {
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
        this.getAirports();
      }
    );
  }

  getAirports() {
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
      }
    );
  }
}
