import { Component } from '@angular/core';
import { SubscibalService } from '../../core/services/subscibal.service';
import { debounceTime,map} from 'rxjs/operators';
import { CommonService } from '../../../shared/services/common.service';
import jp from 'jsonpath/jsonpath.min';
import {LookupAndIndex } from '../../core/interfaces/inputvalue';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent {
  public operators:any;
  public lookup:any=[];
  public jsonPbject:any;
  public selectedIndex:number=0;
  public sText:string='';

  constructor(public _sc:SubscibalService, private _cs:CommonService) {
    this.operators = this._cs.getOperatorsList();
    this.jsonPbject = this._cs.getObject();

    /**
     * [getSubscription description]
     * @param  'SPACE_LOOKUP' [description]
     * @return                [description]
     */
    this._sc.getSubscription('SPACE_LOOKUP').subscribe((event) => {
      this.lookup = this.operators;
    });

    /**
     * [getSubscription description]
     * @param  'DOT_LOOKUP' [description]
     * @return              [description]
     */
    this._sc.getSubscription('DOT_LOOKUP').pipe(
      debounceTime(10),
      map(event => this.onDotPress(event))
    ).subscribe((e)=> {this.sText = ''});

    /**
     * [getSubscription help to set lookupand index value directly]
     * @param  'SPACE_LOOKUP' [description]
     * @return                [description]
     */
    this._sc.getSubscription('SET_LOOKUP_AND_INDEX').subscribe((event) => {
      this.lookup = event.lookup; this.selectedIndex = event.index;
    });

    this._sc.getSubscription('SET_INDEX').subscribe((index) => {
      this.selectedIndex = index;
    });

    this._sc.getSubscription('SEARCH_TEXT').subscribe((sT) => {
      this.sText = sT;
    });

  }

  /**
   * [onKey methed call on every key press]
   * @param  path [description]
   * @return      [description]
   */
  private onDotPress(inputvalueObj: string):any {
    if (inputvalueObj['inputParsedValue'] == '' || inputvalueObj == undefined) {
      this.lookup = []; this.selectedIndex=0;this._sc.setLookupAndIndex({lookup: [], index: 0})
      return;
    }

    this.getValueFromPath(inputvalueObj['inputParsedValue'], this.jsonPbject).then((r) =>{
        return this.setLookup(r);
    }, (err) => {
      return;
    })
  }

  /**
   * [getValueFromPath retrive the value from the path]
   * @param  path        [description]
   * @param  objectValue [description]
   * @return             [description]
   */
  private getValueFromPath(path:string, objectValue:any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(jp.query(objectValue, path));
      } catch (err) {
        reject('*');
      }
    })
  }

  /**
   * [setSuggestedArray set the value for suggestion array, and sets its value through service]
   * @param  jsonPathValue [description]
   * @return               [description]
   */
  private setLookup(jsonPathValue:any) {
    if (typeof jsonPathValue[0] == 'string' || typeof jsonPathValue[0] == 'number' || typeof jsonPathValue[0] == 'boolean' || typeof jsonPathValue[0] == null) {
      this.lookup = [];
      this.selectedIndex=0;
    } else if (typeof jsonPathValue[0] == 'object') {
      if (Array.isArray(jsonPathValue[0]) && jsonPathValue[0].length > 0) {
        let tempArr = <any[]>Object.keys(jsonPathValue[0]); tempArr.unshift('*');
        this.lookup = tempArr;
        this.selectedIndex=0;
      } else {
        this.selectedIndex=0;
        this.lookup = Object.keys(jsonPathValue[0]);
      }
    }

    this._sc.setLookupAndIndex(<LookupAndIndex>{lookup: this.lookup, index: 0})
  }



}
