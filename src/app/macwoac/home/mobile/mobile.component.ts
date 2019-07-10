import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component'
import { CommonService } from '../../../shared/services/common.service';
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent extends HomeComponent implements OnInit {

  constructor(public _cs:CommonService) {
    super(_cs);
  }

  ngOnInit() {}

}
