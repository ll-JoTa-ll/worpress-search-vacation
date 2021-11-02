import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dm-autocomplete-flight',
  templateUrl: './dm-autocomplete-flight.component.html',
  styleUrls: ['./dm-autocomplete-flight.component.sass']
})
export class DmAutocompleteFlightComponent implements OnInit {
  @Input() label: string;
  @Input() list: any[];
  @Input() autocompleteControl: FormControl;
  @Input() theme: string;
  @Input() myControlOrigens = new FormControl('');
  @Output() inputChange = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter();
  @Input() filteredOptionsOrigens: Observable<any[]>;
  constructor() { }

  ngOnInit(): void {
    if (!this.autocompleteControl) {
      this.autocompleteControl = new FormControl('');
    }
    this.subscribeInput();
  }

  subscribeInput() {
    this.autocompleteControl.valueChanges.subscribe(
      term => {
          this.inputChange.emit(term);
      }
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    // const item = event.option.value as Filter;
    this.itemSelected.emit();
  }

  display(item?: any): string | undefined {
    return item ? (item.name) : undefined;
  }

  clear() {
    this.autocompleteControl.setValue('');
    this.itemSelected.emit();
  }

  onOptionSelectedOrigen(event: MatAutocompleteSelectedEvent) {
    console.log('onOptionSelectedOrigen');
    const item = event.option.value;
    /* this.selectedOrigen = true;
    this.origen = item; */
    this.itemSelected.emit(item);
  }

}
