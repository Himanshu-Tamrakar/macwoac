import { Component } from '@angular/core';
import { SubscibalService } from '../../core/services/subscibal.service';
import { debounceTime,map} from 'rxjs/operators';
import { CommonService } from '../../../shared/services/common.service';
import jp from 'jsonpath/jsonpath.min';
import {LookupAndIndex } from '../../core/interfaces/inputvalue';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent {
  public operators:any;
  public lookup:any=[];
  public jsonPbject:any;
  public selectedIndex:number=0;
  public sText:string='';

  constructor(public _sc:SubscibalService, private _cs:CommonService) {
    this.operators = this._cs.getOperatorsList();
    this.jsonPbject = this._cs.getObject();
  }
}
