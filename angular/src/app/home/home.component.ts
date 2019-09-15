import { Component, OnInit, ViewChild, ContentChild, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonData } from '../models/person-data';
import { GhostService } from '../services/ghost.service';
import { BusyIndicatorDirective } from '../directives/busy-indicator.directive';
import { BehaviorSubject } from 'rxjs';
import { DictionaryItem } from '../models/dictionary-item';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  personDataForm: FormGroup;
  personData: PersonData;
  persons: DictionaryItem[];

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService
    , private formBuilder: FormBuilder
    , private ghostService: GhostService
  ) {
  }

  ngOnInit() {
    this.personDataForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      personId: ''
    });

    this.dataService.getData().subscribe(result => {
      this.persons = result;
    });
  }

  onFormSubmit(personData: PersonData) {
    this.personData = Object.assign(personData);
    console.log(personData);
    this.loadingSubject.next(true);
    this.dataService.postData(personData).subscribe(result => {
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 5000);
      
    });
  }

}
