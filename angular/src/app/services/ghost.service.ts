import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GhostService {
  overlay: HTMLElement;
  renderer: Renderer2;

  constructor() {
    this.overlay = document.getElementById('__overlay');
  }

  lockScreen() {
    this.overlay.setAttribute('class', 'modal-backdrop fade show');
  }

  unlockScreen() {
    //this.overlay.setAttribute('class', '');
  }
}
