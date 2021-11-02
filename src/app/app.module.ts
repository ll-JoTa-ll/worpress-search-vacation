import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SearchComponent } from './components/search/search.component';
import { VueloComponent } from './components/search/vuelo/vuelo.component';
import { PaquetesComponent } from './components/search/paquetes/paquetes.component';
import { VueloHotelComponent } from './components/search/vuelo-hotel/vuelo-hotel.component';
import { HotelComponent } from './components/search/hotel/hotel.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { RoomsCounterComponent } from './components/shared/rooms-counter/rooms-counter.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { HotelxComponent } from './components/search/hotelx/hotelx.component';
import { DmAutocompleteComponent } from './components/shared/dm-autocomplete/dm-autocomplete.component';
import { DmAutocompleteFlightComponent } from './components/shared/dm-autocomplete-flight/dm-autocomplete-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VueloComponent,
    PaquetesComponent,
    VueloHotelComponent,
    HotelComponent,
    HeaderComponent,
    RoomsCounterComponent,
    HotelxComponent,
    DmAutocompleteComponent,
    DmAutocompleteFlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    NgxSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-PE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
