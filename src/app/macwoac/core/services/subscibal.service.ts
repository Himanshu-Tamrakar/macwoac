import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InputValue, LookupAndIndex } from '../interfaces/inputvalue';

@Injectable()
export class SubscibalService {
  private DOT_LOOKUP = new Subject<InputValue>();
  private SPACE_LOOKUP = new Subject<InputValue>();
  private SET_LOOKUP_AND_INDEX = new Subject<LookupAndIndex>();
  private SET_INDEX = new Subject<number>();
  private SET_LOOKUP = new Subject<any[]>();

  private lookupAndIndex:LookupAndIndex = {
    lookup: [],
    index: 0
  };

  constructor() { }

  public getSubscription(type:string):Observable<any> {
    switch(type) {
      case 'DOT_LOOKUP': {
        return this.DOT_LOOKUP;
      }
      case 'SPACE_LOOKUP': {
        return this.SPACE_LOOKUP;
      }
      case 'SET_LOOKUP_AND_INDEX': {
        return this.SET_LOOKUP_AND_INDEX;
      }
      case 'SET_INDEX': {
        return this.SET_INDEX;
      }
      case 'SET_LOOKUP': {
        return this.SET_LOOKUP;
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
      case 'SET_LOOKUP_AND_INDEX': {
        return this.SET_LOOKUP_AND_INDEX.next(<LookupAndIndex>value);
      }

      case 'SET_INDEX': {
        return this.SET_INDEX.next(<number>value);
      }

      case 'SET_LOOKUP': {
        return this.SET_LOOKUP.next(<any[]>value);
      }
    }
  }

  public setLookupAndIndex(obj:LookupAndIndex) {
    this.lookupAndIndex = obj;
    this.publishValue('SET_LOOKUP_AND_INDEX', this.lookupAndIndex);
  }

  public getLookupAndIndex():LookupAndIndex {
    return this.lookupAndIndex;
  }

  // public setIndex(i:number) {
  //   this.lookupAndIndex.index = i;
  // }

  public setLookup(l:any[]) {
    this.lookupAndIndex.lookup = l;
  }

  public getIndex() {
    return this.lookupAndIndex.index;
  }

  public getLookup() {
    return this.lookupAndIndex.lookup;
  }

  public updateIndex(op:string) {
    if(op == '+') {
      if(this.lookupAndIndex.lookup.length-1 > this.lookupAndIndex.index) ++this.lookupAndIndex.index;
    } else if(op == '-') {
      if(this.lookupAndIndex.index != 0) --this.lookupAndIndex.index;
    }

    this.publishValue("SET_INDEX", this.lookupAndIndex.index);
  }

}
