import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { LimitSingleProductsComponent } from './limit-single-products.component';

@NgModule({
  imports: [MatCardModule, MatButtonToggleModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatMenuModule, MatListModule],
  declarations: [LimitSingleProductsComponent],
  providers: [],
  exports: [LimitSingleProductsComponent]
})
export class LimitSingleProductsComponentModule {
}
