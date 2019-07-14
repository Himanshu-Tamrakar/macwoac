import { Component } from '@angular/core';
import { SubscibalService } from '../../core/services/subscibal.service';
import { debounceTime, map } from 'rxjs/operators';
import { CommonService } from '../../core/services/common.service';
import jp from 'jsonpath/jsonpath.min';
import { LookupAndIndex, DropdwonObject } from '../../core/interfaces/inputvalue';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent {
  public operators: any;

  public jsonPbject: any;
  // public selectedIndex:number=0;
  // public sText:string='';

  public _dropdwonObject: DropdwonObject = {
    lookup: [],
    filteredLookup: [],
    sIndex: 0,
    searchText: '',
    isOperator: false
  };

  constructor(public _sc: SubscibalService, private _cs: CommonService) {
    this.operators = this._cs.getOperatorsList();
    this.jsonPbject = this._cs.getObject();

    this._sc.getSubscription('DOT').pipe(map(path => {
      if (path.charAt(path.length - 1) == '.') return path = path.substring(0, path.length - 1);
      else return path;
    })).subscribe((path) => {
      this.onDotPress(path)
    })


    this._sc.getSubscription('ARROW').subscribe((sI) => {
      this._dropdwonObject.sIndex = sI;
    })

    this._sc.getSubscription('SPACE').subscribe((e) => {
      this._dropdwonObject = <DropdwonObject>{
        lookup: this.operators,
        filteredLookup: this.operators,
        sIndex: 0,
        searchText: '',
        isOperator: true
      }
      this.setDropdownObject(this._dropdwonObject)
    })

  }


  private onDotPress(path) {
    this.getLookup(path, this.jsonPbject);
  }

  private getLookup(path: string, jsonObject: any) {
    if (path == '' || !path || !jsonObject) {
      this.setLookup([]);
    }

    this._cs.getPathValue(path, jsonObject).then(res => {
      this.setLookup(res);
    }, err => {
      this.setLookup([]);
    })

  }

  setLookup(jsonPathValue: any) {
    let tempLookup = [];
    if (typeof jsonPathValue[0] == 'object') {
      if (Array.isArray(jsonPathValue[0]) && jsonPathValue[0].length > 0) {
        let tempArr = <any[]>Object.keys(jsonPathValue[0]); tempArr.unshift('*');
        tempLookup = tempArr;
      } else {
        tempLookup = Object.keys(jsonPathValue[0]);
      }
    }

    this._dropdwonObject = <DropdwonObject>{
      lookup: tempLookup,
      filteredLookup: tempLookup,
      sIndex: 0,
      searchText: '',
      isOperator: false
    }

    this.setDropdownObject(this._dropdwonObject)
    // this._sc.dropdwonObject = this._dropdwonObject;

  }

  setDropdownObject(obj: DropdwonObject) {
    this._sc.dropdwonObject = obj;
  }

}
