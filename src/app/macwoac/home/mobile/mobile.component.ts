import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component'
import { CommonService } from '../../../shared/services/common.service';
import { SubscibalService } from '../../core/services/subscibal.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent extends HomeComponent implements OnInit {

  constructor(public _cs:CommonService, public _sc:SubscibalService) { super(_cs, _sc); }

  ngOnInit() {}

}
