import { Component } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  template: `
  <div *ngIf="!isMobile; else mobile">
    <app-desktop></app-desktop>
  </div>

  <ng-template #mobile>
    <app-mobile></app-mobile>
  </ng-template>
  `
})
export class HomeComponent {
  public isMobile:boolean = detectMob();
  constructor(public _cs:CommonService) { }
}

/*
To detect Mobile device or Computer device
 */
function detectMob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}
