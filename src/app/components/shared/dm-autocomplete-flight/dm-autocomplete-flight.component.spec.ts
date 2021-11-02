import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmAutocompleteFlightComponent } from './dm-autocomplete-flight.component';

describe('DmAutocompleteFlightComponent', () => {
  let component: DmAutocompleteFlightComponent;
  let fixture: ComponentFixture<DmAutocompleteFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmAutocompleteFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmAutocompleteFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
