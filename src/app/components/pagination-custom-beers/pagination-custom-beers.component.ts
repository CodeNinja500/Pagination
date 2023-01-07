import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BeerModel } from '../../models/beer.model';
import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-pagination-custom-beers',
  styleUrls: ['./pagination-custom-beers.component.scss'],
  templateUrl: './pagination-custom-beers.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationCustomBeersComponent implements AfterViewInit {
  readonly limitOpt$: Observable<number[]> = of([5, 10, 15]);
  readonly pageOpt$: Observable<number[]> = of([1, 2, 3, 4, 5]);
  readonly paginatorForm: FormGroup = new FormGroup({ limit: new FormControl(), page: new FormControl() });
  readonly beerQueryParams$: Observable<{ pageNumber: number; pageSize: number }> =
    this._activatedRoute.queryParams.pipe(
      map((params) => ({
        pageNumber: !params['page'] || params['page'] < 0 ? 1 : +params['page'],
        pageSize: !params['per_page'] || params['per_page'] < 0 ? 5 : +params['per_page']
      })),
      shareReplay(1),
      tap((data) => this.setFormValues(data.pageNumber, data.pageSize))
    );
  readonly beerList$: Observable<BeerModel[]> = this.beerQueryParams$.pipe(
    switchMap((data) => this._beersService.getBeersPaginated(data.pageNumber, data.pageSize))
  );

  constructor(private _beersService: BeersService, private _activatedRoute: ActivatedRoute, private _router: Router) {}

  ngAfterViewInit() {
    this.paginatorForm.valueChanges.subscribe((values) =>
      this._router.navigate([], {
        queryParams: {
          page: values.page,
          per_page: values.limit
        }
      })
    );
  }

  setFormValues(pageNumber: number, pageSize: number): void {
    this.paginatorForm.setValue({
      limit: pageSize,
      page: pageNumber
    });
  }
}
