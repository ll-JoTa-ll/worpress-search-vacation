import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelComponent } from './components/search/hotel/hotel.component';
import { PaquetesComponent } from './components/search/paquetes/paquetes.component';
import { VueloHotelComponent } from './components/search/vuelo-hotel/vuelo-hotel.component';
import { VueloComponent } from './components/search/vuelo/vuelo.component';

const routes: Routes = [
  { path: 'vuelo', component: VueloComponent, runGuardsAndResolvers: 'always' },
  {
    path: 'paquetes',
    component: PaquetesComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'vuelo-hotel',
    component: VueloHotelComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'hotel', component: HotelComponent, runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
