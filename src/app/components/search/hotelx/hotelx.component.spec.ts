import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelxComponent } from './hotelx.component';

describe('HotelxComponent', () => {
  let component: HotelxComponent;
  let fixture: ComponentFixture<HotelxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
