import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component'
import { CommonService } from '../../../shared/services/common.service';
import { SubscibalService } from '../../core/services/subscibal.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent extends HomeComponent implements OnInit {

  constructor(public _cs:CommonService, public _sc:SubscibalService) { super(_cs, _sc); }

  ngOnInit() {
  }

}
