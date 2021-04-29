import { Injectable } from '@angular/core';
import { Select } from '../models/select';
import { ChildrenAge } from '../models/children-age';
import { months } from '../models/months';
import { gender } from '../models/gender';

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
}
