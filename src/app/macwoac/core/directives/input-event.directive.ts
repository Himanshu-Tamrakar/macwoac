import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { InputValue } from "../interfaces/inputvalue";
import * as _ from "lodash";
import { SubscibalService } from '../services/subscibal.service';

@Directive({
  selector: '[appInputEvent]'
})
export class InputEventDirective {
  private inputvalue: InputValue;

  constructor(private _el: ElementRef, private _sc:SubscibalService) { }

  @HostListener('keydown.dot', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowup', ['$event'])
  onInputEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 32: {
        console.log('space clicked');
        this._sc.publishValue('DOT_LOOKUP', 'OPERATORS');
        break;
      }
      case 190: {
        console.log('dot clicked');
        this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
        this._sc.publishValue('DOT_LOOKUP', this.inputvalue);
        break;
      }
      case 13: {
        console.log('enter clicked');
        break;
      }
      case 38: {
        console.log('arrow up clicked');
        event.preventDefault();
        break;
      }
      case 40: {
        console.log('arrow down clicked');
        break;
      }
      default: {
        console.log(event.keyCode)
      }
    }
  }


  private getValue(value: string, pos: number): InputValue {
    let obj:InputValue =  {
      inputParsedValue: '#',
      currentPosition: -1
    }
    const sub = value.substring(0, pos);
    const lastIndex = sub.lastIndexOf('$');
    const actualS = sub.substring(lastIndex, pos);

    if(actualS.indexOf(';') == -1) {
      obj.inputParsedValue = actualS, obj.currentPosition = pos;
    }

    return  obj;

  }

}
