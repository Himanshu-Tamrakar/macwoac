import { Component } from '@angular/core';
import { SubscibalService } from '../../core/services/subscibal.service';
import { debounceTime,map} from 'rxjs/operators';
import { CommonService } from '../../../shared/services/common.service';
import jp from 'jsonpath/jsonpath.min';

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
  constructor(public _sc:SubscibalService, private _cs:CommonService) {
    this.operators = this._cs.getOperatorsList();
    this.jsonPbject = this._cs.getObject();

    this._sc.getSubscription('SELECTED_INDEX').subscribe((event) => {
      if(event.operator == '+') {
        if(this.lookup.length-1 > this.selectedIndex) this.selectedIndex++;
      } else {
        if(this.selectedIndex > 0) this.selectedIndex--;
      }
      this.setSharedData(this.selectedIndex,this.lookup);
    });

    this._sc.getSubscription('SPACE_LOOKUP').subscribe((event) => {
      this.resetIndex();
      this.lookup = this.operators;

      this.setSharedData(0,this.lookup);

    });

    this._sc.getSubscription('DOT_LOOKUP').pipe(
      debounceTime(10),
      map(event => this.onDotPress(event))
    ).subscribe((event) => {
      this.resetIndex();
      this.setSharedData(this.selectedIndex,this.lookup);

    });


  }

  setSharedData(i:number, l:any[]) {
    const that = this;
    setTimeout(() => {
      that._sc.setSharedData({
        selectedIndex: i,
        lookupList: l
      });
    }, 10)
  }

  /**
   * [onKey methed call on every key press]
   * @param  path [description]
   * @return      [description]
   */
  private onDotPress(path: string) {
    if (path == '' || path == undefined) {
      this.lookup = []; //this.setSeachText(this.getSearchText('', false));
    }

    this.setLookup(this.getValueFromPath(path['inputParsedValue'], this.jsonPbject));
  }


  /**
   * [setSuggestedArray set the value for suggestion array, and sets its value through service]
   * @param  jsonPathValue [description]
   * @return               [description]
   */
  private setLookup(jsonPathValue) {
    if (typeof jsonPathValue[0] == 'string' || typeof jsonPathValue[0] == 'number' || typeof jsonPathValue[0] == 'boolean' || typeof jsonPathValue[0] == null) {
      this.lookup = [];
    } else if (typeof jsonPathValue[0] == 'object') {
      if (Array.isArray(jsonPathValue[0]) && jsonPathValue[0].length > 0) {
        let tempArr = <any[]>Object.keys(jsonPathValue[0]); tempArr.unshift('*');
        this.lookup = tempArr;
      } else this.lookup = Object.keys(jsonPathValue[0]);
    }
    // this.subscribalService.setSuggestedArray(<any[]>this.lookup);
  }

  /**
   * [getValueFromPath retrive the value from the path]
   * @param  path        [description]
   * @param  objectValue [description]
   * @return             [description]
   */
  private getValueFromPath(path, objectValue): any {
    try {
      return jp.query(objectValue, path);
    } catch (err) {
      return '*';
    }
  }

  private resetIndex() {
    this.selectedIndex = 0;
  }

}
