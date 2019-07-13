import { Pipe, PipeTransform } from '@angular/core';
import { SubscibalService } from '../services/subscibal.service';
import { LookupAndIndex } from '../interfaces/inputvalue';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private _sc:SubscibalService){}

  transform(data: any, ...args: any[]): any {
    let searchText = args[0];
    if (!data) {
      this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: [], index: 0})
      return [];
    }
    if (!searchText) {
      this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: data, index: 0})
      return data;
    }
    if (searchText == '' || searchText == '$') {
      this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: data, index: 0})
      return data;
    }

    searchText = searchText.toLowerCase();

    let dataA = data.filter((it) => {
      return it.toLowerCase().includes(searchText);
    }) || [];

    this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: dataA, index: 0})
    return dataA;
  }

}
