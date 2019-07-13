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

  private _dropdwonObject: DropdwonObject = {
    lookup: [],
    filteredLookup: [],
    sIndex: 0,
    searchText: ''
  }

  get dropdwonObject(): DropdwonObject {
    return this._dropdwonObject;
  }

  set dropdwonObject(object: DropdwonObject) {
    this._dropdwonObject = object
  }

  setDropdownObjectProperty(property:string, value:any) {
    if(this._dropdwonObject.hasOwnProperty(property)) {
      this._dropdwonObject[property]=value;
    }
  }

  constructor() { }

  public getSubscription(type:string):Observable<any> {
    switch(type) {
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
    }
  }

  public publishValue(type: string, value: any) {
    switch(type) {
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
    }
  }



  // public updateIndex(op:string) {
  //   if(op == '+') {
  //     if(this.lookupAndIndex.lookup.length-1 > this.lookupAndIndex.index) ++this.lookupAndIndex.index;
  //   } else if(op == '-') {
  //     if(this.lookupAndIndex.index != 0) --this.lookupAndIndex.index;
  //   }
  //   this.publishValue("SET_INDEX", this.lookupAndIndex.index);
  // }

}
