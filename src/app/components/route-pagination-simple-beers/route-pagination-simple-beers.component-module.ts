import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoutePaginationSimpleBeersComponent } from './route-pagination-simple-beers.component';

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule, MatButtonModule, MatIconModule],
  declarations: [RoutePaginationSimpleBeersComponent],
  providers: [],
  exports: [RoutePaginationSimpleBeersComponent]
})
export class RoutePaginationSimpleBeersComponentModule {
}
