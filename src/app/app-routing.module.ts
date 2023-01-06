import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteSortSingleProductsBeComponent } from './components/route-sort-single-products-be/route-sort-single-products-be.component';
import { SearchMultiJobsComponent } from './components/search-multi-jobs/search-multi-jobs.component';
import { FilterSingleProductsBeComponent } from './components/filter-single-products-be/filter-single-products-be.component';
import { RouteFilterMultiCarsComponent } from './components/route-filter-multi-cars/route-filter-multi-cars.component';
import { LimitSingleProductsComponent } from './components/limit-single-products/limit-single-products.component';
import { RoutePaginationBeersComponent } from './components/route-pagination-beers/route-pagination-beers.component';
import { RouteSortSingleProductsBeComponentModule } from './components/route-sort-single-products-be/route-sort-single-products-be.component-module';
import { SearchMultiJobsComponentModule } from './components/search-multi-jobs/search-multi-jobs.component-module';
import { FilterSingleProductsBeComponentModule } from './components/filter-single-products-be/filter-single-products-be.component-module';
import { RouteFilterMultiCarsComponentModule } from './components/route-filter-multi-cars/route-filter-multi-cars.component-module';
import { LimitSingleProductsComponentModule } from './components/limit-single-products/limit-single-products.component-module';
import { RoutePaginationBeersComponentModule } from './components/route-pagination-beers/route-pagination-beers.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'route-sort-single-products-be', component: RouteSortSingleProductsBeComponent },
      { path: 'search-multi-jobs', component: SearchMultiJobsComponent },
      { path: 'products/:category', component: FilterSingleProductsBeComponent },
      { path: 'route-filter-multi-cars', component: RouteFilterMultiCarsComponent },
      { path: 'limit-single-products', component: LimitSingleProductsComponent },
      { path: 'route-pagination-beers', component: RoutePaginationBeersComponent }
    ]),
    RouteSortSingleProductsBeComponentModule,
    SearchMultiJobsComponentModule,
    FilterSingleProductsBeComponentModule,
    RouteFilterMultiCarsComponentModule,
    LimitSingleProductsComponentModule,
    RoutePaginationBeersComponentModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
