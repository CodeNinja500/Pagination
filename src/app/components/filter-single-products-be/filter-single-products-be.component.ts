import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-filter-single-products-be',
  styleUrls: ['./filter-single-products-be.component.scss'],
  templateUrl: './filter-single-products-be.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSingleProductsBeComponent {
  readonly categories$: Observable<string[]> = this._productsService.getAllCategories();
  readonly productList$: Observable<ProductModel[]> = this._activatedRoute.params.pipe(
    map((params) => params['category']),
    switchMap((data) => this._productsService.getAllInCategory(data))
  );

  constructor(private _productsService: ProductsService, private _activatedRoute: ActivatedRoute) {}
}
