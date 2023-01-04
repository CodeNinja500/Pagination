import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComfortFeatureModel } from '../models/comfort-feature.model';
import { BrandModel } from '../models/brand.model';
import { CarModel } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarsService {
  constructor(private _httpClient: HttpClient) {}

  getAllComfortFeatures(): Observable<ComfortFeatureModel[]> {
    return this._httpClient.get<ComfortFeatureModel[]>(
      'https://636ce2d8ab4814f2b2712854.mockapi.io/car-comfort-features'
    );
  }

  getAllBrands(): Observable<BrandModel[]> {
    return this._httpClient.get<BrandModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/car-brands');
  }

  getAllCars(): Observable<CarModel[]> {
    return this._httpClient.get<CarModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/cars');
  }
}
