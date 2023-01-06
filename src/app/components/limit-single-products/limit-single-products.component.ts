import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-limit-single-products',
  styleUrls: ['./limit-single-products.component.scss'],
  templateUrl: './limit-single-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitSingleProductsComponent {
  readonly limits$: Observable<number[]> = of([5, 10, 15]);
  readonly queryParams$: Observable<number> = this._activatedRoute.queryParams.pipe(
    map((params) => (params['limit'] ? params['limit'] : 5))
  );

  public limitForm: FormControl = new FormControl();

  readonly productList$: Observable<ProductModel[]> = this.queryParams$.pipe(
    switchMap((data) => this._productsService.getAllLimited(+data))
  );

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  onButtonClick(selection: number): void {
    this.limitForm.setValue(selection);
  }
  onLimitSelected(limit: number): void {
    this._router.navigate([], { queryParams: { limit } });
  }
}
