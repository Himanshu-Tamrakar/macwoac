import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InputValue, LookupAndIndex } from '../interfaces/inputvalue';

@Injectable()
export class SubscibalService {

  private lookupAndIndex:LookupAndIndex = {
    lookup: [],
    index: 0
  };

  constructor() { }

  // public getSubscription(type:string):Observable<any> {
  //
  // }

  public publishValue(type:string, value:any) {

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
