import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitiesModel } from '../models/cities.model';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  constructor(private _httpClient: HttpClient) {}

  getAllCities(): Observable<CitiesModel[]> {
    return this._httpClient.get<CitiesModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/cities');
  }
}
