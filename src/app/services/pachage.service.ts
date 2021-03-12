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
export class PachageService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /*
  getMonthsxxx(id: string, type: string){
    const params = new HttpParams()
      .set('search', id)
      .set('typeSearch', type);
    return this.http.get<Response<number[]>>(config.getMonthsUrl(config.MONTHS_METHOD), {params});
  }
  */

  getMonths(id, type) {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': environment.subsKey,
    });

    return this.http.get(
      this.baseUrl +
        'VacationPackage/Month?search=' +
        id +
        '&typeSearch=' +
        type,
      httpOptions
    );
  }

  /*
  getDestinies() {
      return this.http.get<Response<ResultSearch[]>>(config.getDestiniesUrl(config.DESTINIES_METHOD));
    }
  */

  getDestinies() {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': environment.subsKey,
    });

    return this.http.get(this.baseUrl + 'Destination', httpOptions);
  }
}
