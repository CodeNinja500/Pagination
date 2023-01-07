import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject, combineLatest, of } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { CitiesModel } from '../../models/cities.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-route-pagination-frontend-cities-two',
  styleUrls: ['./route-pagination-frontend-cities-two.component.scss'],
  templateUrl: './route-pagination-frontend-cities-two.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePaginationFrontendCitiesTwoComponent {
  readonly limitOpts$: Observable<number[]> = of([5, 10, 15]);
  readonly cityList$: Observable<CitiesModel[]> = this._citiesService
    .getAllCities()
    .pipe(tap((data) => this.getNumberOfCities(data)));

  private _numberOfCitiesSubject: ReplaySubject<number> = new ReplaySubject<number>(1);
  public numberOfCities$: Observable<number> = this._numberOfCitiesSubject.asObservable();

  readonly queryParams$: Observable<{ pageSize: number; pageNumber: number }> = this._activatedRoute.queryParams.pipe(
    map((params) => ({
      pageSize: !params['pageSize'] || params['pageSize'] < 1 ? 5 : +params['pageSize'],
      pageNumber: !params['pageNumber'] || params['pageNumber'] < 1 ? 1 : +params['pageNumber']
    })),
    shareReplay(1)
  );

  readonly pagesAvailable$: Observable<number[]> = combineLatest([this.queryParams$, this.numberOfCities$]).pipe(
    map(([params, numberOfCities]) => {
      let pages: number[] = [];
      let numberOfPages: number = Math.ceil(numberOfCities / params.pageSize);
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
      return pages;
    })
  );

  readonly cityListPaginated$: Observable<CitiesModel[]> = combineLatest([this.cityList$, this.queryParams$]).pipe(
    map(([cities, params]) =>
      cities.slice((params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize)
    )
  );

  constructor(
    private _citiesService: CitiesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  getNumberOfCities(cities: CitiesModel[]): void {
    this._numberOfCitiesSubject.next(cities.length);
  }

  onPageSizeSelected(isSelected: boolean, size: number): void {
    if (isSelected) {
      this.numberOfCities$
        .pipe(
          tap((numberOfCities) => {
            this.queryParams$
              .pipe(
                take(1),
                tap((params) => {
                  this._router.navigate([], {
                    queryParams: {
                      pageNumber:
                        params.pageNumber > Math.ceil(numberOfCities / size)
                          ? Math.ceil(numberOfCities / size)
                          : params.pageNumber,
                      pageSize: size
                    }
                  });
                })
              )
              .subscribe();
          })
        )
        .subscribe();
    }
  }
}
