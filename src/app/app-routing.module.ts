import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteSortSingleProductsBeComponent } from './components/route-sort-single-products-be/route-sort-single-products-be.component';
import { SearchMultiJobsComponent } from './components/search-multi-jobs/search-multi-jobs.component';
import { FilterSingleProductsBeComponent } from './components/filter-single-products-be/filter-single-products-be.component';
import { RouteFilterMultiCarsComponent } from './components/route-filter-multi-cars/route-filter-multi-cars.component';
import { RouteSortSingleProductsBeComponentModule } from './components/route-sort-single-products-be/route-sort-single-products-be.component-module';
import { SearchMultiJobsComponentModule } from './components/search-multi-jobs/search-multi-jobs.component-module';
import { FilterSingleProductsBeComponentModule } from './components/filter-single-products-be/filter-single-products-be.component-module';
import { RouteFilterMultiCarsComponentModule } from './components/route-filter-multi-cars/route-filter-multi-cars.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'route-sort-single-products-be', component: RouteSortSingleProductsBeComponent },
      { path: 'search-multi-jobs', component: SearchMultiJobsComponent },
      { path: 'products/:category', component: FilterSingleProductsBeComponent },
      { path: 'route-filter-multi-cars', component: RouteFilterMultiCarsComponent }
    ]),
    RouteSortSingleProductsBeComponentModule,
    SearchMultiJobsComponentModule,
    FilterSingleProductsBeComponentModule,
    RouteFilterMultiCarsComponentModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
