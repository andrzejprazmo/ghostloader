import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonData } from '../models/person-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(): Observable<string> {
    return of('ALA MA KOTA');
  }

  postData(personData: PersonData): Observable<boolean> {
    return of(true);
  }
}
