import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';
import { PachageService } from '../../../services/pachage.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
export class PaquetesComponent implements OnInit {
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

  constructor(
    private headerMenuService: HeaderMenuService,
    private pachageService: PachageService
  ) {
    this.headerMenuService.getMenuImage(1);
  }

  ngOnInit(): void {
    this.getDestination();
  }

  getDestination() {
    this.pachageService.getDestinies().subscribe(
      (result: any) => {
        if (result.confirmation) {
          this.destinies = result.data;
          console.log('this.destinies');
          console.log(this.destinies);
        }
      },
      (err) => {},
      () => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.destinies.slice()))
        );
      }
    );
  }

  private _filter(value: string): ResultSearch[] {
    console.log('value');
    console.log(value);

    const filterValue = value.toLowerCase();

    console.log('filterValue');
    console.log(filterValue);

    return this.destinies.filter(
      //(option) => option.name.toLowerCase().indexOf(filterValue) === 0
      function (option) {
        //console.log('option');
        //console.log(option);

        return option.name.toLowerCase().indexOf(filterValue) === 0;
      }
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log('onOptionSelected');
    console.log('event');
    console.log(event);
    const item = event.option.value as ResultSearch;
    console.log('item');
    console.log(item);

    this.pachageService.getMonths(item.id, item.type).subscribe(
      (result: any) => {},
      (err) => {},
      () => {}
    );
  }

  display(item?: ResultSearch): string | undefined {
    return item ? item.name : undefined;
  }

  onFocus() {
    this.resultSearch = this.destinies;
  }

  getAutocomplete() {
    this.pachageService.getDestinies().subscribe(
      (result: any) => {
        if (result.confirmation) {
          this.destinies = result.data;
        }
      },
      (err) => {},
      () => {}
    );
  }
}
