import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, ReplaySubject, combineLatest, of } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { CitiesModel } from '../../models/cities.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-route-pagination-frontend-cities',
  styleUrls: ['./route-pagination-frontend-cities.component.scss'],
  templateUrl: './route-pagination-frontend-cities.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePaginationFrontendCitiesComponent {
  readonly pageSizeOpts$: Observable<number[]> = of([5, 10, 15]);
  readonly citiesQueryParams$: Observable<{ pageSize: number; pageNumber: number }> =
    this._activatedRoute.queryParams.pipe(
      map((params) => ({
        pageSize: !params['pageSize'] || params['pageSize'] < 1 ? 5 : +params['pageSize'],
        pageNumber: !params['pageNumber'] || params['pageNumber'] < 1 ? 1 : +params['pageNumber']
      }))
    );
  private _numberOfCitiesSubject: ReplaySubject<number> = new ReplaySubject<number>();
  public numberOfCities$: Observable<number> = this._numberOfCitiesSubject.asObservable();

  readonly pagesAvailable$: Observable<number[]> = combineLatest([this.citiesQueryParams$, this.numberOfCities$]).pipe(
    map(([params, numberOfCities]) => {
      let pageNumbers: number[] = [];
      let numberOfPages: number = Math.ceil(numberOfCities / params.pageSize);
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    })
  );

  readonly cityList$: Observable<CitiesModel[]> = this._citiesService
    .getAllCities()
    .pipe(tap((data) => this.getNumberOfCities(data)));

  readonly cityListPaginated$: Observable<CitiesModel[]> = combineLatest([
    this.cityList$,
    this.citiesQueryParams$
  ]).pipe(
    map(([cities, params]) =>
      cities.slice((params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize)
    )
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _citiesService: CitiesService,
    private _router: Router
  ) {}

  getNumberOfCities(cities: CitiesModel[]): void {
    this._numberOfCitiesSubject.next(cities.length);
  }

  onPageSizeChanged(isSelected: boolean, params: { pageSize: number; pageNumber: number }, selectedSize: number): void {
    if (isSelected) {
      this.numberOfCities$
        .pipe(
          take(1),
          tap((number) => {
            this._router.navigate([], {
              queryParams: {
                pageSize: selectedSize,
                pageNumber:
                  params.pageNumber <= Math.ceil(number / selectedSize)
                    ? params.pageNumber
                    : Math.ceil(number / selectedSize)
              }
            });
            console.log(number);
          })
        )
        .subscribe();
    }
  }
}
