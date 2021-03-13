import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../../services/shared/header-menu.service';
import { PachageService } from '../../../services/pachage.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { getLocaleFirstDayOfWeek } from '@angular/common';

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
    private localStorageService: LocalStorageService
  ) {
    this.headerMenuService.getMenuImage(1);
  }

  ngOnInit(): void {
    this.monthsData = [
      {
        code: '',
        name: 'Elijamos juntos',
      },
    ];
    //this.monthControl.value = '';
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
    const filterValue = value.toLowerCase();
    return this.destinies.filter(
      //(option) => option.name.toLowerCase().indexOf(filterValue) === 0
      function (option) {
        return option.name.toLowerCase().indexOf(filterValue) === 0;
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

  onSelectMonth(month) {}

  search() {
    console.log('this.destiny');
    console.log(this.destiny);

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

      this.sessionStorageService.store('wpc_package_s', filter);
      this.localStorageService.store('wpc_package_l_v1', filter);

      localStorage.setItem('ls_package', JSON.stringify(filter));
      localStorage.setItem('nombreXXX', 'JoTa');

      window.open(
        'http://localhost:4200/#/facade/' + JSON.stringify(filter),
        '_blank'
      );

      //this.router.navigate(['result']);
    } else {
      //this.openSnackBar('Seleccione un destino');
    }
  }
}
