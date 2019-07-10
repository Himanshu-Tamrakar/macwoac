import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { InputValue, SelectedIndex } from "../interfaces/inputvalue";
import * as _ from "lodash";
import { SubscibalService } from '../services/subscibal.service';

@Directive({
  selector: '[appInputEvent]'
})
export class InputEventDirective {
  private inputvalue: InputValue;
  private selectedIndex: SelectedIndex;

  constructor(private _el: ElementRef, private _sc: SubscibalService) { }

  @HostListener('keydown.dot', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.backspace', ['$event'])
  onInputEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 32: {
        console.log('space clicked');
        this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
        this._sc.publishValue('SPACE_LOOKUP', this.inputvalue);
        break;
      }
      case 190: {
        this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
        this._sc.publishValue('DOT_LOOKUP', this.inputvalue);
        break;
      }
      case 13: {
        console.log('enter clicked');
        this.appendToKey(event);
        break;
      }
      case 38: {
        event.preventDefault();
        this.selectedIndex = {
          operator: '-'
        };
        this._sc.publishValue('SELECTED_INDEX', this.selectedIndex);
        break;
      }
      case 40: {
        event.preventDefault();
        this.selectedIndex = {
          operator: '+'
        };
        this._sc.publishValue('SELECTED_INDEX', this.selectedIndex);
        break;
      }
      case 8: {
        this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
        this._sc.publishValue('DOT_LOOKUP', this.inputvalue);
        break;
      }
      default: {
        console.log(event.keyCode)
      }
    }
  }


  private getValue(value: string, pos: number): InputValue {
    let obj: InputValue = {
      inputParsedValue: '#',
      currentPosition: -1
    }
    const sub = value.substring(0, pos);
    const lastIndex = sub.lastIndexOf('$');
    const actualS = sub.substring(lastIndex, pos);

    if (actualS.indexOf(';') == -1) {
      obj.inputParsedValue = actualS, obj.currentPosition = pos;
    }

    return obj;
  }


  private appendToKey(event: KeyboardEvent) {
    let sharedData = this._sc.getSharedData();
    let value = this._el.nativeElement.value;
    let currentPos = this._el.nativeElement.selectionStart;
    let firstHalf = value.slice(0, currentPos);
    let secondHalf = value.slice(currentPos);
    this._el.nativeElement.value = firstHalf + sharedData['lookupList'][sharedData['selectedIndex']] + secondHalf;
    const that = this;
    setTimeout(() => {
      that.setCaretPosition(this._el.nativeElement, (firstHalf + sharedData['lookupList'][sharedData['selectedIndex']]).length);
    }, 10)
  }

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

}
