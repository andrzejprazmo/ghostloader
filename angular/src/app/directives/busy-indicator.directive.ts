import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[busyIndicator]'
})
export class BusyIndicatorDirective implements OnInit {
  @Input() busyIndicator: BehaviorSubject<boolean>;

  ngOnInit(): void {
    this.busyIndicator.subscribe(loading => {
      if (loading) {
        this.show()
      } else {
        this.hide();
      }
    })
  }

  overlay: HTMLElement;
  roller: string = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

  constructor(private container: ElementRef) {
    this.overlay = document.createElement('div');
    this.overlay.setAttribute('class', 'overlay');
    this.overlay.setAttribute('style', 'display:none;');
    this.overlay.innerHTML = this.roller;
    this.container.nativeElement.append(this.overlay);
  }

  show() {
    const native = this.container.nativeElement;
    this.overlay.setAttribute('style', `width:${native.offsetWidth}px;display:block;`);
  }

  hide() {
    this.overlay.setAttribute('style', 'display:none;');
  }
}
