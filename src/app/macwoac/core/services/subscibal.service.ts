import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InputValue } from '../interfaces/inputvalue';

@Injectable()
export class SubscibalService {
  private DOT_LOOKUP = new Subject<InputValue>();
  private SPACE_LOOKUP = new Subject<InputValue>();
  private KEY_TO_APPEND = new Subject<InputValue>();
  private SELECTED_INDEX = new Subject<number>();

  private sharedObject:any = {
    selectedIndex: 0,
    lookupList: []
  }

  constructor() { }

  public getSubscription(type:string):Observable<any> {
    switch(type) {
      case 'DOT_LOOKUP': {
        return this.DOT_LOOKUP;
      }
      case 'SPACE_LOOKUP': {
        return this.SPACE_LOOKUP;
      }
      case 'KEY_TO_APPEND': {
        return this.KEY_TO_APPEND;
      }
      case 'SELECTED_INDEX': {
        return this.SELECTED_INDEX;
      }
    }
  }

  public publishValue(type:string, value:any) {
    switch(type) {
      case 'DOT_LOOKUP': {
        return this.DOT_LOOKUP.next(<InputValue>value);
      }
      case 'SPACE_LOOKUP': {
        return this.SPACE_LOOKUP.next(<InputValue>value);
      }
      case 'KEY_TO_APPEND': {
        return this.KEY_TO_APPEND.next(value);
      }
      case 'SELECTED_INDEX': {
        return this.SELECTED_INDEX.next(value);
      }
    }
  }


  public setSharedData(obj:any) {
    this.sharedObject = obj;
  }


  public getSharedData() {
    return this.sharedObject;
  }
}
