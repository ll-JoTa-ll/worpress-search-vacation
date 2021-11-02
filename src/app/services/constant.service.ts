import { Injectable } from '@angular/core';
import { Select } from '../models/select';
import { ChildrenAge } from '../models/children-age';
import { months } from '../models/months';
import { gender } from '../models/gender';


const ORIGINS = 'origins';
const DESTINOS = 'destinos';
@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  constructor() {}

  getChildrenAge(): Select[] {
    return ChildrenAge;
  }

  getMonths() {
    return months;
  }

  getGenders() {
    return gender;
  }

  setOrigins(origins: any[]) {
    sessionStorage.setItem(ORIGINS, JSON.stringify(origins));
  }

  getOrigins(): any[] {
    return JSON.parse(sessionStorage.getItem(ORIGINS));
  }

  setDestinos(origins: any) {
    sessionStorage.setItem(DESTINOS, JSON.stringify(origins));
  }

  getDestinos(): any {
    return JSON.parse(sessionStorage.getItem(DESTINOS));
  }
}
