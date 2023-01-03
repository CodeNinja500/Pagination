import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { JobModel } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-search-multi-jobs',
  styleUrls: ['./search-multi-jobs.component.scss'],
  templateUrl: './search-multi-jobs.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchMultiJobsComponent {
  readonly searchForm: FormGroup = new FormGroup({ keyWord: new FormControl('') });
  readonly searchKey: Observable<string | undefined> = this._activatedRoute.queryParams.pipe(
    map((params) => params['search'], startWith(''))
  );
  readonly jobsFiltered$: Observable<JobModel[]> = this.searchKey.pipe(
    switchMap((data) =>
      this._jobsService
        .getAllJobs()
        .pipe(
          map((jobs) =>
            jobs.filter(
              (job) =>
                job.description.toLowerCase().includes(data?.toLowerCase()!) ||
                job.title.toLowerCase().includes(data?.toLowerCase()!)
            )
          )
        )
    )
  );

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _jobsService: JobsService) {}

  onSearchFormSubmitted(searchForm: FormGroup): void {
    this._router.navigate([], {
      queryParams: {
        search: searchForm.value.keyWord
      }
    });
  }
}
