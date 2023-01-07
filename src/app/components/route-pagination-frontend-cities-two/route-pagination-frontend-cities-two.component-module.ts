import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout/flex';
import { RoutePaginationFrontendCitiesTwoComponent } from './route-pagination-frontend-cities-two.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [MatCardModule, MatListModule, FlexModule, CommonModule, RouterModule],
  declarations: [RoutePaginationFrontendCitiesTwoComponent],
  providers: [],
  exports: [RoutePaginationFrontendCitiesTwoComponent]
})
export class RoutePaginationFrontendCitiesTwoComponentModule {}
