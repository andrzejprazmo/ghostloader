import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DictionaryItem } from '../../models/dictionary-item';

@Component({
  selector: 'custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrls: ['./custom-drop-down.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomDropDownComponent), multi: true }
  ]
})
export class CustomDropDownComponent implements OnInit, ControlValueAccessor {
  @Input() items: DictionaryItem[];

  value: any;
  disabled: boolean;

  onChangeItem: (_: any) => void = () => { };
  onTouchedItem: () => void = () => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeItem = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedItem = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onItemClick(item: DictionaryItem) {
    if (item) {
      this.value = item.id;
      this.onChangeItem(item.id);
    }
  }
}
