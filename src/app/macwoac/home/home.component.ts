import { Component } from '@angular/core';
import { SubscibalService } from '../core/services/subscibal.service';
import { debounceTime,map} from 'rxjs/operators';
import { CommonService } from '../core/services/common.service';
import jp from 'jsonpath/jsonpath.min';

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
  constructor(public _cs:CommonService, public _sc:SubscibalService) {}
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
