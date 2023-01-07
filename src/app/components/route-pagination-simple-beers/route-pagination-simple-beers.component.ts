import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { BeerModel } from '../../models/beer.model';
import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-route-pagination-simple-beers',
  styleUrls: ['./route-pagination-simple-beers.component.scss'],
  templateUrl: './route-pagination-simple-beers.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePaginationSimpleBeersComponent {
  readonly beersQueryParams$: Observable<number> = this._activatedRoute.queryParams.pipe(
    map((params) => (!params['page'] || params['page'] < 1 ? 1 : +params['page'])),
    shareReplay(1)
  );
  readonly beerListPaginated$: Observable<BeerModel[]> = this.beersQueryParams$.pipe(
    switchMap((data) => this._beersService.getBeersPaginated(data, 10)),
    shareReplay(1)
  );
  readonly paginationState$: Observable<{ isFirst: boolean; isLast: boolean }> = combineLatest([
    this.beerListPaginated$,
    this.beersQueryParams$
  ]).pipe(
    map(([beers, queryParam]) => ({
      isFirst: queryParam === 1,
      isLast: beers.length < 10
    }))
  );

  onNextClick(): void {
    this.beersQueryParams$
      .pipe(
        take(1),
        tap((params) =>
          this._router.navigate([], {
            queryParams: {
              page: params + 1
            }
          })
        )
      )
      .subscribe();
  }
  onPrevClick(): void {
    this.beersQueryParams$
      .pipe(
        take(1),
        tap((params) =>
          this._router.navigate([], {
            queryParams: {
              page: params - 1
            }
          })
        )
      )
      .subscribe();
  }
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _beersService: BeersService) {}
}
