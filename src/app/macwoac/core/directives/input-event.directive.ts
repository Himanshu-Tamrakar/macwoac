import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';
import { InputValue, SelectedIndex } from "../interfaces/inputvalue";
import * as _ from "lodash";
import { SubscibalService } from '../services/subscibal.service';
import { CommonService } from '../services/common.service';


@Directive({
  selector: '[appInputEvent]'
})
export class InputEventDirective {
  private jsonObject: any;

  constructor(private _el: ElementRef, private _sc: SubscibalService, private _cs: CommonService) {
    console.log('sdsd', this._cs.getObject())
    this.jsonObject = {
      '$': this._cs.getObject()
    }
  }

  private handleKeyup(event: KeyboardEvent) {
    console.log(event.keyCode)
    switch (event.keyCode) {
      case 190: {
        const path = this._cs.findPath(event['target']['value'], this._el.nativeElement.selectionStart);
        if (path != '-1') this._sc.publishValue('DOT', path);
        break;
      }
      case 13: {
        // this.addKey(this._el.nativeElement, this._sc.getClickObject());
        let obj = this._sc.dropdwonObject;
        if(!obj.isOperator) this.addKey(this._el.nativeElement, this._sc.getClickObject());
        else this.addOperatorAsKey(this._el.nativeElement, this._sc.getClickObject());
        break;
      }
      case 32: {
        this._sc.publishValue('SPACE', {});
        break;
      }
      case 8: {console.log('backspace')
        break;
      }
      case 186: {
        this._sc.publishValue('DOT', '');
        break;
      }
      default: {
        let obj = this._sc.dropdwonObject;
        if(!obj.isOperator) console.log('search for key')
        else console.log('search for operator')
        break;
      }

    }
  }

  @HostListener('keyup', ['$event']) onkeyup(event: KeyboardEvent) {
    this.handleKeyup(event);
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.handleKeyDown(event);
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: {
        event.preventDefault();
        this._sc.updateIndex('-');

        var ul = this._el.nativeElement.nextSibling.firstChild.firstChild;
        var nodes = this._el.nativeElement.nextSibling.firstChild.firstChild.getElementsByTagName('li');

        this.scroll(nodes[this._sc.dropdwonObject['sIndex']], nodes, ul)
        break;
      }
      case 40: {
        event.preventDefault();
        this._sc.updateIndex('+');

        var ul = this._el.nativeElement.nextSibling.firstChild.firstChild;
        var nodes = this._el.nativeElement.nextSibling.firstChild.firstChild.getElementsByTagName('li');
        this.scroll(nodes[this._sc.dropdwonObject['sIndex']], nodes, ul)
        break;
      }
    }
  }


  private scroll(el, nodes, ul) {
    var s = [].indexOf.call(nodes, el);
    if (s === -1) return;

    const selected = s;

    var elHeight = el.offsetHeight;
     // $(el).height();
    var scrollTop = ul.scrollTop;
    var viewport = scrollTop + ul.offsetHeight;
    var elOffset = elHeight * selected;

    console.log('select', selected, ' viewport', viewport, ' elOffset', elOffset);
    if (elOffset < scrollTop || (elOffset + elHeight) > viewport) ul.scrollTop = elOffset
    // document.querySelector('li.selected').classList.remove('selected');
    // el.classList.add('selected');
}

  private addKey(elem, key: string) {

    if(!key)  return;
    let value = elem.value;
    let currentPos = elem.selectionStart;
    let firstHalf = value.slice(0, currentPos);
    let secondHalf = value.slice(currentPos);


    let temp = firstHalf.split('.');
    let l = temp[temp.length-1].length;
    temp.pop();
    firstHalf  = firstHalf.substring(0,firstHalf.length-l);
    this._el.nativeElement.value = firstHalf + key + secondHalf;

    setTimeout(() => {
      this.setCaretPosition(elem, (firstHalf + key).length);
      this._sc.publishValue('DOT', '');
    }, 10)
  }

  private addOperatorAsKey(elem, key:string) {
    debugger

    if(!key)  return;
    let value = elem.value;
    let currentPos = elem.selectionStart;
    let firstHalf = value.slice(0, currentPos);
    let secondHalf = value.slice(currentPos);
    const spacePos = firstHalf.lastIndexOf(' ');
    firstHalf = firstHalf.substring(0, spacePos+1);

    this._el.nativeElement.value = firstHalf + key + secondHalf;

    setTimeout(() => {
      this.setCaretPosition(elem, (firstHalf + key).length);
      this._sc.publishValue('DOT', '');
    }, 10)

  }

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
