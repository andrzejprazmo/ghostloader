import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonData } from '../models/person-data';
import { DictionaryItem } from '../models/dictionary-item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(): Observable<DictionaryItem[]> {
    return of([
      { id: 1, name: 'Jan Kowalski' },
      { id: 2, name: 'Piotr Nowak' },
      { id: 3, name: 'Adam Mickiewicz' },
      { id: 4, name: 'Juliusz Słowacki' },
    ]);
  }

  postData(personData: PersonData): Observable<boolean> {
    return of(true);
  }
}
