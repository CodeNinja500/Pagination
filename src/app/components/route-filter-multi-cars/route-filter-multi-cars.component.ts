import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  readonly carList$: Observable<CarModel[]> = this._carsService.getAllCars();

  readonly queryParamsFilter$: Observable<{
    brands: string[];
    comfortFeatures: string[];
  }> = this._activatedRoute.queryParams.pipe(
    map((queryParams) => {
      let brandParams: string[] = queryParams['brands'].split(',');
      let comfortFeatureParams: string[] = queryParams['comfort-features'].split(',');
      return {
        brands: brandParams,
        comfortFeatures: comfortFeatureParams
      };
    })
  );

  constructor(private _carsService: CarsService, private _activatedRoute: ActivatedRoute) {}

  onCarBrandSelected(event: boolean, brand: string): void {}
}
