import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

let httpOptions = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private urlFlight: string = environment.urlFlight;

  constructor(private http: HttpClient) {}

  getPriorityAirports() {
    httpOptions.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.subsKey,
    });
    return this.http.get(
      this.urlFlight + 'CityAirport/GetCityAirport?priority=true',
      httpOptions
    );
  }

  getAirports() {
    httpOptions.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.subsKey,
    });
    return this.http.get(
      this.urlFlight + 'CityAirport/GetCityAirport?priority=false',
      httpOptions
    );
  }
}
