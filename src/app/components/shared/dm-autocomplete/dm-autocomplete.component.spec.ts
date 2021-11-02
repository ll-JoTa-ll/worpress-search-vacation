import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmAutocompleteComponent } from './dm-autocomplete.component';

describe('DmAutocompleteComponent', () => {
  let component: DmAutocompleteComponent;
  let fixture: ComponentFixture<DmAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
