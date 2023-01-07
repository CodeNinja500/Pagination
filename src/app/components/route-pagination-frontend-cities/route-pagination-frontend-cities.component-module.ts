import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout/flex';
import { RoutePaginationFrontendCitiesComponent } from './route-pagination-frontend-cities.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule, FlexModule, RouterModule],
  declarations: [RoutePaginationFrontendCitiesComponent],
  providers: [],
  exports: [RoutePaginationFrontendCitiesComponent]
})
export class RoutePaginationFrontendCitiesComponentModule {}
