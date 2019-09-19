import { Component, OnInit, ViewChild, ContentChild, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonData } from '../models/person-data';
import { GhostService } from '../services/ghost.service';
import { BusyIndicatorDirective } from '../directives/busy-indicator.directive';
import { BehaviorSubject } from 'rxjs';
import { DictionaryItem } from '../models/dictionary-item';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { TreeItem, TreeItemType } from '../models/tree-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  personDataForm: FormGroup;
  personData: PersonData;
  persons: DictionaryItem[];
  myModel: TreeItem[];
  myFlattenModel: TreeItem[] = [];

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService
    , private formBuilder: FormBuilder
    , private ghostService: GhostService
  ) {
    this.myModel = [
      {
        id: -1, name: 'Konsultacje', type: TreeItemType.Branch, children: [
          {
            id: -1, name: 'Popularne', type: TreeItemType.DummyBranch, children: [
              { id: -1, name: 'Internista', type: TreeItemType.Leaf, children: [] },
              { id: -1, name: 'Laryngolog', type: TreeItemType.Leaf, children: [] },
            ]
          },
          {
            id: -1, name: 'Pozostałe', type: TreeItemType.DummyBranch, children: [
              { id: -1, name: 'Dermatolog', type: TreeItemType.Leaf, children: [] },
              { id: -1, name: 'Ortopeda', type: TreeItemType.Leaf, children: [] },
            ]
          },
        ]
      },
      {
        id: -1, name: 'Stomatologia', type: TreeItemType.Branch, children: [
          { id: -1, name: 'Profilaktyka', type: TreeItemType.Leaf, children: [] },
          { id: -1, name: 'Chirurgia szczękowa', type: TreeItemType.Leaf, children: [] },
        ]
      },
      {
        id: -1, name: 'USG', type: TreeItemType.Branch, children: [
          { id: -1, name: 'USG jamy brzusznej', type: TreeItemType.Leaf, children: [] },
          { id: -1, name: 'USG serca', type: TreeItemType.Leaf, children: [] },
        ]
      },
      { id: -1, name: 'Medycyna Pracy', type: TreeItemType.Leaf, children: [] },
      { id: -1, name: 'Rehabilitacja', type: TreeItemType.Leaf, children: [] },
    ];
  }

  ngOnInit() {
    this.personDataForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      personId: ''
    });
    this.myFlattenModel = this.copyModel(this.myModel);

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

  copyModel(source: TreeItem[]): TreeItem[] {
    const destination: TreeItem[] = [];
    for (const s of source) {
      if (s.type == TreeItemType.DummyBranch) {
        for (const c of s.children) {
          const item = new TreeItem();
          item.id = c.id;
          item.name = c.name;
          item.type = c.type;
          item.children = this.copyModel(c.children);
          destination.push(item);
        }
      } else {
        const item = new TreeItem();
        item.id = s.id;
        item.name = s.name;
        item.type = s.type;
        item.children = this.copyModel(s.children);
        destination.push(item);
      }
    }
    return destination;
  }
}
