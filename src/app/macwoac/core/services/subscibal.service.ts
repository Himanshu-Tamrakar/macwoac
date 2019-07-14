import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InputValue, LookupAndIndex, DropdwonObject } from '../interfaces/inputvalue';

@Injectable()
export class SubscibalService {
  private DOT = new Subject<any>();
  private CLICK = new Subject<any>();
  private BACK_SPACE = new Subject<any>();
  private SPACE = new Subject<any>();
  private SEARCH = new Subject<any>();
  private UPDATE = new Subject<any>();
  private ARROW = new Subject<any>();

  private _dropdwonObject: DropdwonObject = {
    lookup: [],
    filteredLookup: [],
    sIndex: 0,
    searchText: '',
    isOperator: false
  }

  get dropdwonObject(): DropdwonObject {
    return this._dropdwonObject;
  }

  set dropdwonObject(object: DropdwonObject) {
    this._dropdwonObject = object
  }

  setDropdownObjectProperty(property: string, value: any) {
    if (this._dropdwonObject.hasOwnProperty(property)) {
      this._dropdwonObject[property] = value;
    }
  }

  // setLookup(jsonPathValue: any) {
  //   let tempLookup=[];
  //   if (typeof jsonPathValue[0] == 'object') {
  //     if (Array.isArray(jsonPathValue[0]) && jsonPathValue[0].length > 0) {
  //       let tempArr = <any[]>Object.keys(jsonPathValue[0]); tempArr.unshift('*');
  //       tempLookup = tempArr;
  //       // this.selectedIndex = 0;?
  //     } else {
  //       // this.selectedIndex = 0;
  //       tempLookup= Object.keys(jsonPathValue[0]);
  //     }
  //   }
  //
  //   this._dropdwonObject = <DropdwonObject>{
  //     lookup: tempLookup,
  //     filteredLookup: tempLookup,
  //     sIndex: 0,
  //     searchText: '',
  //     isOperator: false
  //   }
  //
  //
  // }

  constructor() { }

  public getSubscription(type: string): Observable<any> {
    switch (type) {
      case 'DOT': {
        return this.DOT;
      }
      case 'CLICK': {
        return this.CLICK;
      }
      case 'BACK_SPACE': {
        return this.BACK_SPACE;
      }
      case 'SPACE': {
        return this.SPACE;
      }
      case 'SEARCH': {
        return this.SEARCH;
      }
      case 'UPDATE': {
        return this.UPDATE;
      }
      case 'ARROW' : {
          return this.ARROW;
      }

    }
  }

  public publishValue(type: string, value: any) {
    switch (type) {
      case 'DOT': {
        return this.DOT.next(value);
      }
      case 'CLICK': {
        return this.CLICK.next(value);
      }
      case 'BACK_SPACE': {
        return this.BACK_SPACE.next(value);
      }
      case 'SPACE': {
        return this.SPACE.next(value);
      }
      case 'SEARCH': {
        return this.SEARCH.next(value);
      }
      case 'UPDATE': {
        return this.UPDATE.next(value);
      }
      case 'ARROW' : {
          return this.ARROW.next(value);;
      }
    }
  }



  public updateIndex(op:string) {
    if(op == '+') {
      if(this._dropdwonObject.filteredLookup.length-1 > this._dropdwonObject.sIndex) ++this._dropdwonObject.sIndex;
    } else if(op == '-') {
      if(this._dropdwonObject.sIndex != 0) --this._dropdwonObject.sIndex;
    }
    this.publishValue("ARROW", this._dropdwonObject.sIndex);
  }

  public getClickObject() {
    return this._dropdwonObject.filteredLookup[this._dropdwonObject.sIndex];
  }

}
