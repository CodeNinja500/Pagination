import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { RoutePaginationBeersComponent } from './route-pagination-beers.component';

@NgModule({
  imports: [MatCardModule, MatPaginatorModule, RouterModule, MatListModule, CommonModule],
  declarations: [RoutePaginationBeersComponent],
  providers: [],
  exports: [RoutePaginationBeersComponent]
})
export class RoutePaginationBeersComponentModule { }
