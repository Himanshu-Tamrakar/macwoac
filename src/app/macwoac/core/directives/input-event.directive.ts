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

  private handleKeyup(event:KeyboardEvent) {
    switch(event.keyCode) {
      case 190: {
        break;
      }
      case 13: {
        break;
      }
      case 32: {
        break;
      }
      case 8: {
        break;
      }
      default: {
        break;
      }

    }
  }

  @HostListener('keyup', ['$event']) onkeyup(event:KeyboardEvent) {
    this.handleKeyup(event);
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event']) onKeydown(event:KeyboardEvent) {
    this.handleKeyDown(event);
  }

  private handleKeyDown(event:KeyboardEvent) {
    switch(event.keyCode) {
      case 38: {
        event.preventDefault();
        break;
      }
      case 40: {
        event.preventDefault();
        break;
      }
    }
  }

}
