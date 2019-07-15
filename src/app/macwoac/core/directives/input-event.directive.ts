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
    this.jsonObject = {
      '$': this._cs.getObject()
    }
  }

  private handleKeyup(event: KeyboardEvent) {
alert(event)
    switch (event.code) {
      case 'Period': {
        const path = this._cs.findPath(event['target']['value'], this._el.nativeElement.selectionStart);
        if (path != '-1') this._sc.publishValue('DOT', path);
        break;
      }
      case 'Space': {
        this._sc.publishValue('SPACE', {});
        break;
      }
      case 'Semicolon': {
        this._sc.publishValue('DOT', '');
        break;
      }
      case 'Semicolon': {
        this.addKey(this._el.nativeElement, this._sc.getClickObject());
        break;
      }
      case 'Backspace': {
      if(!this._sc.dropdwonObject.isOperator) {
        const path = this._cs.findPath(event['target']['value'], this._el.nativeElement.selectionStart);
        if(path.charAt(path.length-1) == '.') {
          this._sc.publishValue('DOT', path);
          return;
        }
      }
      this.findSearchText(this._el.nativeElement);
      break;
      }
      default: {
        if(event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 39 && event.keyCode != 37) {
            this.findSearchText(this._el.nativeElement);
        }
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

    if(this._sc.dropdwonObject.isOperator) {
      const spacePos = firstHalf.lastIndexOf(' ');
      firstHalf = firstHalf.substring(0, spacePos+1);
      this._el.nativeElement.value = firstHalf + key + secondHalf;
    } else {
      let temp = firstHalf.split('.');
      let l = temp[temp.length-1].length;
      temp.pop();
      firstHalf  = firstHalf.substring(0,firstHalf.length-l);
      this._el.nativeElement.value = firstHalf + key + secondHalf;
    }

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

  private findSearchText(elem) {
    debugger
    let value = elem.value;
    let currentPos = elem.selectionStart;
    let firstHalf = value.slice(0, currentPos);

    if(this._sc.dropdwonObject.isOperator) {

      const spacePos = firstHalf.lastIndexOf(' ');
      firstHalf = firstHalf.substring(spacePos, currentPos);
      this._sc.publishValue('SEARCH', firstHalf.trim());
    } else {
      let temp = firstHalf.split('.');
      let l = temp[temp.length-1].length;

      this._sc.publishValue('SEARCH', temp.pop());
    }
  }

}
