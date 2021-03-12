import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueloHotelComponent } from './vuelo-hotel.component';

describe('VueloHotelComponent', () => {
  let component: VueloHotelComponent;
  let fixture: ComponentFixture<VueloHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueloHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueloHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
