import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-route-sort-single-products-be',
  styleUrls: ['./route-sort-single-products-be.component.scss'],
  templateUrl: './route-sort-single-products-be.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteSortSingleProductsBeComponent {
  readonly directions$: Observable<string[]> = of(['asc', 'desc']);
  readonly productList$: Observable<ProductModel[]> = this._activatedRoute.queryParams.pipe(
    map((data) => data['sort']),
    switchMap((data) => this._productsService.getAllProductsSorted(data))
  );

  constructor(private _productsService: ProductsService, private _activatedRoute: ActivatedRoute) {}
}
