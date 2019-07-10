import { Component } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { SubscibalService } from '../core/services/subscibal.service';
import { debounceTime,map} from 'rxjs/operators';

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
  public jsonObject:any;
  public operatorsList:any;

  constructor(public _cs:CommonService, public _sc:SubscibalService) {
    this.jsonObject = this._cs.getObject();
    this.operatorsList = this._cs.getOperatorsList();

    // this._sc.getSubscription('DOT_LOOKUP').pipe(
    //   debounceTime(10),
    //   map(event => event)
    // ).subscribe((event) => {
    //   console.log(event);
    // });

  }
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
