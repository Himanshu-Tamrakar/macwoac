import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { InputValue, SelectedIndex } from "../interfaces/inputvalue";
import * as _ from "lodash";
import { SubscibalService } from '../services/subscibal.service';
import { CommonService } from '../../../shared/services/common.service';


@Directive({
  selector: '[appInputEvent]'
})
export class InputEventDirective {
  private jsonObject:any;

  constructor(private _el: ElementRef, private _sc: SubscibalService, private _cs:CommonService) {
    this.jsonObject = {
      '$': this._cs.getObject()
    }
  }

}
