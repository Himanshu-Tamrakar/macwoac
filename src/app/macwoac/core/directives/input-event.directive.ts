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

  private handleEvent(event:KeyboardEvent) {
    const that = this;

    switch(event.keyCode) {
      case 190: {
        this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
        this._sc.publishValue('DOT_LOOKUP', this.inputvalue);
        break;
      }
      case 38: {
        //So caret does not move to home
        event.preventDefault();
        this._sc.updateIndex('-');
        break;
      }
      case 40: {
        //So caret does not move to ;ast
        event.preventDefault();
        this._sc.updateIndex('+');
        break;
      }
    }
  }

  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keyup.dot', ['$event'])
  onInputEvent(event: KeyboardEvent) {
    this.handleEvent(event);


    // switch (event.keyCode) {
    //   case 186: {
    //     console.log('semicolon');
    //     this._sc.publishValue('RESET_LOOKUP', {});
    //     break;
    //   }
    //   case 32: {
    //     this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
    //     this._sc.publishValue('SPACE_LOOKUP', this.inputvalue);
    //     break;
    //   }
    //   case 190: {
    //     this.inputvalue = this.getValue(event.target['value'], this._el.nativeElement.selectionStart);
    //     this._sc.publishValue('DOT_LOOKUP', this.inputvalue);
    //     break;
    //   }
    //   case 13: {
    //     this._sc.publishValue('RESET_LOOKUP', {});
    //     // this.appendToKey(event);
    //     break;
    //   }
    //   case 38: {
    //     event.preventDefault();
    //     this.selectedIndex = {
    //       operator: '-'
    //     };
    //     this._sc.publishValue('SELECTED_INDEX', this.selectedIndex);
    //     // const c = this._sc.getSharedData()['selectedIndex'];
    //     // this._el.nativeElement.nextSibling.firstChild.scrollTop = this._el.nativeElement.nextSibling.firstChild.scrollTop - 15;
    //     break;
    //   }
    //   case 40: {
    //     event.preventDefault();
    //     this.selectedIndex = {
    //       operator: '+'
    //     };
    //     this._sc.publishValue('SELECTED_INDEX', this.selectedIndex);
    //     // const c = this._sc.getSharedData()['selectedIndex'];
    //     // if(c%14 == 0 && c != 0)
    //     // this._el.nativeElement.nextSibling.firstChild.scrollTop = this._el.nativeElement.nextSibling.firstChild.scrollTop + 285
    //     break;
    //   }
    //   case 8: {
    //     let value =event.target['value'];
    //     value = value.substring(0, value.length-1);
    //     console.log(this.getValue(value, this._el.nativeElement.selectionStart-1))
    //     break;
    //   }
    //   default: {
    //     let value =event.target['value'];
    //     console.log(this.getValue(value, this._el.nativeElement.selectionStart))
    //   }
    // }
  }


  private getValue(value: string, pos: number): InputValue {
    let obj: InputValue = {
      inputParsedValue: '#',
      caretPosition: -1
    }
    const sub = value.substring(0, pos-1);
    const lastIndex = sub.lastIndexOf('$');
    const actualS = sub.substring(lastIndex, pos);

    if (actualS.indexOf(';') == -1) {
      obj.inputParsedValue = actualS, obj.caretPosition = pos;
    }

    return obj;
  }


  // private appendToKey(event: KeyboardEvent) {
  //   let sharedData = this._sc.getSharedData();
  //   let value = this._el.nativeElement.value;
  //   let currentPos = this._el.nativeElement.selectionStart;
  //   let firstHalf = value.slice(0, currentPos);
  //   let secondHalf = value.slice(currentPos);
  //   this._el.nativeElement.value = firstHalf + sharedData['lookupList'][sharedData['selectedIndex']] + secondHalf;
  //   const that = this;
  //   setTimeout(() => {
  //     that.setCaretPosition(this._el.nativeElement, (firstHalf + sharedData['lookupList'][sharedData['selectedIndex']]).length);
  //   }, 10)
  // }

  private setCaretPosition(ctrl, pos) {
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
