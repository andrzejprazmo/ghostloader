import { Component, OnInit, ViewChild, ContentChild, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonData } from '../models/person-data';
import { GhostService } from '../services/ghost.service';
import { BusyIndicatorDirective } from '../directives/busy-indicator.directive';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  personDataForm: FormGroup;
  personData: PersonData;

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService
    , private formBuilder: FormBuilder
    , private ghostService: GhostService
  ) {
  }

  ngOnInit() {
    this.personDataForm = this.formBuilder.group({
      firstName: '',
      lastName: ''
    });
  }

  onFormSubmit(personData: PersonData) {
    this.personData = Object.assign(personData);
    this.loadingSubject.next(true);
    this.dataService.postData(personData).subscribe(result => {
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 5000);
      
    });
  }

}
