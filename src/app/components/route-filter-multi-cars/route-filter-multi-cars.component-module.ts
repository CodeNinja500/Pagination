import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouteFilterMultiCarsComponent } from './route-filter-multi-cars.component';

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule, MatTableModule],
  declarations: [RouteFilterMultiCarsComponent],
  providers: [],
  exports: [RouteFilterMultiCarsComponent]
})
export class RouteFilterMultiCarsComponentModule {
}
