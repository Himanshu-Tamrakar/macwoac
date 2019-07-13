import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import jp from 'jsonpath/jsonpath.min';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private jsonObject: any;
  private operatorsList: any;
  constructor(private http: HttpClient) {
    this.setJsonObject();
  }

  public setJsonObject() {
    this.getAutoCompleteObject().subscribe((r) => {
      this.jsonObject = r['parsorObject'];
      this.operatorsList = r['operators']
    })
  }

  getObject(): any {
    return this.jsonObject;
  }

  getOperatorsList(): any[] {
    return this.operatorsList;
  }

  private getAutoCompleteObject(): Observable<HttpResponse<any>> {
    return this.http.get<any>("/assets/macwoac/data/data.json?" + new Date().getTime());
  }

  public getPathValue(path: string, jsonObject: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(jp.query(jsonObject, path));
      } catch (err) {
        reject('*');
      }
    })
  }


  public findPath(eventValue: string, positions: number): string {
    const sub = eventValue.substring(0, positions);
    const lastIndex = sub.lastIndexOf('$');
    if(lastIndex != -1) {
      const actualS = sub.substring(lastIndex, positions);
      return actualS;
    }
    return '-1';
  }


  
}
