import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatChipsModule } from '@angular/material/chips';
import { RouteSortSingleProductsBeComponent } from './route-sort-single-products-be.component';

@NgModule({
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    FlexModule,
    RouterModule,
    MatChipsModule
  ],
  declarations: [RouteSortSingleProductsBeComponent],
  providers: [],
  exports: [RouteSortSingleProductsBeComponent]
})
export class RouteSortSingleProductsBeComponentModule { }
