import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BeerModel } from '../../models/beer.model';
import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-route-pagination-beers',
  styleUrls: ['./route-pagination-beers.component.scss'],
  templateUrl: './route-pagination-beers.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePaginationBeersComponent {
  readonly paginatorParams$: Observable<{ pageIndex: number; perPage: number; length: number; pageOptions: number[] }> =
    this._activatedRoute.queryParams.pipe(
      map((params) => ({
        pageIndex: params['page'] ? params['page'] - 1 : 0,
        perPage: params['per_page'] ? params['per_page'] : 5,
        length: 100,
        pageOptions: [5, 10, 15]
      }))
    );
  readonly beerList$: Observable<BeerModel[]> = this.paginatorParams$.pipe(
    switchMap((data) => this._beersService.getBeersPaginated(data.pageIndex + 1, data.perPage))
  );

  constructor(private _activatedRoute: ActivatedRoute, private _beersService: BeersService, private _router: Router) {}

  onPageEvent(event: { pageIndex: number; pageSize: number }): void {
    this._router.navigate([], { queryParams: { page: event.pageIndex + 1, per_page: event.pageSize } });
  }
}
