import { Pipe, PipeTransform } from '@angular/core';
import { SubscibalService } from '../services/subscibal.service';
import { DropdwonObject } from '../interfaces/inputvalue';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  private dropdownObject:DropdwonObject;
  constructor(private _sc:SubscibalService){}

  transform(data: any, ...args: any[]): any {
    return data;
    // let searchText = args[0];
    // if (!data) {
    //   this._sc.dropdwonObject = this.setAnsGetDropdownObject([],[], 0, '');
    //   return [];
    // }
    // if (!searchText) {
    //   // this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: data, index: 0})
    //   return data;
    // }
    // if (searchText == '' || searchText == '$') {
    //   // this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: data, index: 0})
    //   return data;
    // }
    //
    // searchText = searchText.toLowerCase();
    //
    // let dataA = data.filter((it) => {
    //   return it.toLowerCase().includes(searchText);
    // }) || [];

    // this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: dataA, index: 0})
    // return dataA;
  }

  setAnsGetDropdownObject(l:any[], fL:any[], i:number, sT:string):DropdwonObject {
    this.dropdownObject['lookup']=l;
    this.dropdownObject['filteredLookup']=fL;
    this.dropdownObject['searchText']=sT;
    this.dropdownObject['sIndex']=i;
    return this.dropdownObject;
  }

}
