import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, shareReplay, take, tap } from 'rxjs/operators';
import { BrandModel } from '../../models/brand.model';
import { ComfortFeatureModel } from '../../models/comfort-feature.model';
import { CarModel } from '../../models/car.model';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-route-filter-multi-cars',
  styleUrls: ['./route-filter-multi-cars.component.scss'],
  templateUrl: './route-filter-multi-cars.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteFilterMultiCarsComponent {
  readonly carBrandList$: Observable<BrandModel[]> = this._carsService.getAllBrands();
  readonly comfortFeatureList$: Observable<ComfortFeatureModel[]> = this._carsService.getAllComfortFeatures();

  readonly queryParamsFilter$: Observable<{
    brands: Set<string>;
    comfortFeatures: Set<string>;
  }> = this._activatedRoute.queryParams.pipe(
    map((queryParams) => {
      return {
        brands: new Set<string>(queryParams['brands'] === undefined ? [] : queryParams['brands'].split(',')),
        comfortFeatures: new Set<string>(
          queryParams['comfort-features'] === undefined ? [] : queryParams['comfort-features'].split(',')
        )
      };
    }),
    shareReplay(1)
  );
  readonly carList$: Observable<CarModel[]> = combineLatest([
    this._carsService.getAllCars(),
    this.queryParamsFilter$
  ]).pipe(
    map(([cars, features]) =>
      cars
        .filter((car) => features.brands.size === 0 || features.brands.has(car.brandId))
        .filter(
          (car) =>
            features.comfortFeatures.size === 0 ||
            car.comfortFeatureIds.find((cfIds) => features.comfortFeatures.has(cfIds))
        )
    )
  );
  constructor(private _carsService: CarsService, private _activatedRoute: ActivatedRoute, private _router: Router) {}

  onCarBrandChanged(event: boolean, carBrand: BrandModel): void {
    this.queryParamsFilter$
      .pipe(
        take(1),
        tap((data) => {
          const brParamsSet = data.brands;
          event === true ? brParamsSet.add(carBrand.id) : brParamsSet.delete(carBrand.id);
          this._router.navigate([], { queryParams: this.mergeQueryParams(brParamsSet, data.comfortFeatures) });
        })
      )
      .subscribe();
  }
  onFeaturesChanged(event: boolean, comfFeature: ComfortFeatureModel): void {
    this.queryParamsFilter$
      .pipe(
        take(1),
        tap((data) => {
          const cfParamsSet = data.comfortFeatures;
          event === true ? cfParamsSet.add(comfFeature.id) : cfParamsSet.delete(comfFeature.id);
          this._router.navigate([], { queryParams: this.mergeQueryParams(data.brands, cfParamsSet) });
        })
      )
      .subscribe();
  }

  private mergeQueryParams(brands: Set<string>, comfFeat: Set<string>): Record<string, string> {
    const params = {} as Record<string, string>;
    if (brands.size > 0) {
      params['brands'] = [...brands].sort().join();
    }
    if (comfFeat.size > 0) {
      params['comfort-features'] = [...comfFeat].sort().join();
    }
    return params;
  }
}
